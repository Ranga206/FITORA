import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    DateTime,
    Numeric,
    String,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class FoodItem(Base):
    __tablename__ = "food_items"

    __table_args__ = (
        CheckConstraint(
            "nutrition_reference_basis IN ('per_100g', 'per_100ml', 'per_serving')",
            name="ck_food_items_nutrition_reference_basis",
        ),
        CheckConstraint(
            "data_review_status IN ('draft', 'verified', 'archived')",
            name="ck_food_items_data_review_status",
        ),
        CheckConstraint(
            "serving_size > 0",
            name="ck_food_items_serving_size_positive",
        ),
        CheckConstraint(
            "serving_weight_g IS NULL OR serving_weight_g > 0",
            name="ck_food_items_serving_weight_g_positive",
        ),
        CheckConstraint(
            "serving_volume_ml IS NULL OR serving_volume_ml > 0",
            name="ck_food_items_serving_volume_ml_positive",
        ),
        CheckConstraint(
            "calories >= 0",
            name="ck_food_items_calories_non_negative",
        ),
        CheckConstraint(
            "protein >= 0",
            name="ck_food_items_protein_non_negative",
        ),
        CheckConstraint(
            "carbohydrates >= 0",
            name="ck_food_items_carbohydrates_non_negative",
        ),
        CheckConstraint(
            "fat >= 0",
            name="ck_food_items_fat_non_negative",
        ),
        CheckConstraint(
            "nutrition_reference_basis != 'per_100g' OR (serving_volume_ml IS NULL AND (serving_unit IN ('g', 'gram', 'grams', 'kg', 'oz') OR (serving_weight_g IS NOT NULL AND serving_weight_g > 0)))",
            name="ck_food_items_per_100g_conditional_serving",
        ),
        CheckConstraint(
            "nutrition_reference_basis != 'per_100ml' OR (serving_weight_g IS NULL AND (serving_unit IN ('ml', 'millilitre', 'millilitres', 'l', 'fl oz') OR (serving_volume_ml IS NOT NULL AND serving_volume_ml > 0)))",
            name="ck_food_items_per_100ml_conditional_serving",
        ),
        CheckConstraint(
            "nutrition_reference_basis != 'per_serving' OR (serving_unit IS NOT NULL AND length(trim(serving_unit)) > 0)",
            name="ck_food_items_per_serving_conditional_unit",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
        index=True,
    )

    category: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    preparation_state: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    food_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    nutrition_reference_basis: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    serving_size: Mapped[Decimal] = mapped_column(
        Numeric(6, 1),
        nullable=False,
    )

    serving_unit: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    serving_weight_g: Mapped[Decimal | None] = mapped_column(
        Numeric(6, 1),
        nullable=True,
    )

    serving_volume_ml: Mapped[Decimal | None] = mapped_column(
        Numeric(6, 1),
        nullable=True,
    )

    calories: Mapped[Decimal] = mapped_column(
        Numeric(6, 1),
        nullable=False,
    )

    protein: Mapped[Decimal] = mapped_column(
        Numeric(5, 1),
        nullable=False,
    )

    carbohydrates: Mapped[Decimal] = mapped_column(
        Numeric(5, 1),
        nullable=False,
    )

    fat: Mapped[Decimal] = mapped_column(
        Numeric(5, 1),
        nullable=False,
    )

    source_name: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
    )

    source_code: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    source_data_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    source_release_version: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    data_review_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="draft",
    )

    is_system: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
