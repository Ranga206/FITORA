from datetime import datetime
from decimal import Decimal
from typing import Annotated, Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, model_validator

ReferenceBasis = Literal["per_100g", "per_100ml", "per_serving"]
ReviewStatus = Literal["draft", "verified", "archived"]

MASS_UNITS = {"g", "gram", "grams", "kg", "oz"}
VOLUME_UNITS = {"ml", "millilitre", "millilitres", "l", "fl oz"}


class FoodItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, extra="forbid")

    id: UUID
    name: str
    category: str
    preparation_state: str
    food_type: str
    nutrition_reference_basis: ReferenceBasis
    serving_size: Decimal
    serving_unit: str
    serving_weight_g: Decimal | None = None
    serving_volume_ml: Decimal | None = None
    calories: Decimal
    protein: Decimal
    carbohydrates: Decimal
    fat: Decimal
    source_name: str
    source_code: str | None = None
    source_data_type: str | None = None
    source_release_version: str | None = None
    data_review_status: ReviewStatus
    is_system: bool
    created_at: datetime
    updated_at: datetime

    @model_validator(mode="after")
    def validate_conditional_integrity(self) -> "FoodItemResponse":
        validate_food_conditional_rules(
            nutrition_reference_basis=self.nutrition_reference_basis,
            serving_size=self.serving_size,
            serving_unit=self.serving_unit,
            serving_weight_g=self.serving_weight_g,
            serving_volume_ml=self.serving_volume_ml,
            calories=self.calories,
            protein=self.protein,
            carbohydrates=self.carbohydrates,
            fat=self.fat,
            data_review_status=self.data_review_status,
            source_name=self.source_name,
        )
        return self


class FoodCatalogListResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    items: list[FoodItemResponse]
    total: Annotated[int, Field(ge=0)]
    limit: Annotated[int, Field(ge=1, le=100)]
    offset: Annotated[int, Field(ge=0)]


def validate_food_conditional_rules(
    *,
    nutrition_reference_basis: str,
    serving_size: Decimal,
    serving_unit: str,
    serving_weight_g: Decimal | None,
    serving_volume_ml: Decimal | None,
    calories: Decimal | None,
    protein: Decimal | None,
    carbohydrates: Decimal | None,
    fat: Decimal | None,
    data_review_status: str,
    source_name: str | None,
) -> None:
    """Strict conditional validation according to approved Decisions 6 & 7."""
    # Core nutrients must be present and non-negative
    if calories is None or calories < 0:
        raise ValueError("Calories must be a non-negative numeric value.")
    if protein is None or protein < 0:
        raise ValueError("Protein must be a non-negative numeric value.")
    if carbohydrates is None or carbohydrates < 0:
        raise ValueError("Carbohydrates must be a non-negative numeric value.")
    if fat is None or fat < 0:
        raise ValueError("Fat must be a non-negative numeric value.")

    if serving_size <= 0:
        raise ValueError("Serving size must be greater than zero.")

    unit_normalized = serving_unit.strip().lower()

    if nutrition_reference_basis == "per_100g":
        # Disallow volume inference
        if serving_volume_ml is not None:
            raise ValueError(
                "per_100g foods must not specify serving_volume_ml; volume cannot be inferred from mass."
            )
        # Serving unit must be mass-based or have documented mass in grams
        if unit_normalized not in MASS_UNITS and (
            serving_weight_g is None or serving_weight_g <= 0
        ):
            raise ValueError(
                f"For per_100g reference basis, serving unit '{serving_unit}' requires a documented positive serving_weight_g."
            )

    elif nutrition_reference_basis == "per_100ml":
        # Disallow mass inference
        if serving_weight_g is not None:
            raise ValueError(
                "per_100ml foods must not specify serving_weight_g; mass cannot be inferred from volume."
            )
        # Serving unit must be volume-based or have documented volume in ml
        if unit_normalized not in VOLUME_UNITS and (
            serving_volume_ml is None or serving_volume_ml <= 0
        ):
            raise ValueError(
                f"For per_100ml reference basis, serving unit '{serving_unit}' requires a documented positive serving_volume_ml."
            )

    elif nutrition_reference_basis == "per_serving":
        if not unit_normalized:
            raise ValueError("per_serving foods must specify a non-empty serving_unit.")
    else:
        raise ValueError(
            f"Unsupported nutrition_reference_basis: '{nutrition_reference_basis}'."
        )

    if not source_name or not source_name.strip():
        raise ValueError("source_name must not be empty.")
