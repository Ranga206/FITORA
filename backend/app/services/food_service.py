from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.food_item import FoodItem
from app.schemas.food import MASS_UNITS, VOLUME_UNITS


def get_published_foods(
    db: Session,
    *,
    q: str | None = None,
    category: str | None = None,
    limit: int = 20,
    offset: int = 0,
) -> tuple[list[FoodItem], int]:
    """Retrieve verified published foods with deterministic ordering and bounded pagination."""
    query = select(FoodItem).where(FoodItem.data_review_status == "verified")

    if q and q.strip():
        query = query.where(FoodItem.name.ilike(f"%{q.strip()}%"))

    if category and category.strip():
        query = query.where(func.lower(FoodItem.category) == category.strip().lower())

    count_query = select(func.count()).select_from(query.subquery())
    total = db.scalar(count_query) or 0

    query = query.order_by(func.lower(FoodItem.name).asc(), FoodItem.id.asc())
    query = query.offset(offset).limit(limit)

    items = list(db.scalars(query).all())
    return items, total


def get_published_food_by_id(db: Session, food_id: UUID) -> FoodItem | None:
    """Retrieve an explicitly verified published food item by ID. Returns None if draft or missing."""
    query = select(FoodItem).where(
        FoodItem.id == food_id,
        FoodItem.data_review_status == "verified",
    )
    return db.scalar(query)


def calculate_food_nutrients(
    food: FoodItem,
    quantity: Decimal,
    unit: str,
) -> dict[str, Decimal]:
    """Calculate nutrients deterministically according to Section 10 rules.

    Rejects incompatible mass-volume conversions or ambiguous serving units.
    """
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero.")

    unit_normalized = unit.strip().lower()
    serving_unit_normalized = food.serving_unit.strip().lower()

    if food.nutrition_reference_basis == "per_100g":
        if unit_normalized in VOLUME_UNITS:
            raise ValueError(
                "Cannot calculate per_100g food with volume unit; volume cannot be inferred from mass."
            )
        if unit_normalized in {"g", "gram", "grams"}:
            multiplier = quantity / Decimal("100")
        elif unit_normalized in {"kg", "kilogram", "kilograms"}:
            multiplier = (quantity * Decimal("1000")) / Decimal("100")
        elif unit_normalized == serving_unit_normalized:
            if food.serving_weight_g is not None and food.serving_weight_g > 0:
                logged_grams = (quantity / food.serving_size) * food.serving_weight_g
                multiplier = logged_grams / Decimal("100")
            elif food.serving_unit.lower() in MASS_UNITS:
                multiplier = quantity / Decimal("100")
            else:
                raise ValueError(
                    f"Ambiguous serving unit '{unit}': no documented mass conversion for per_100g food."
                )
        else:
            raise ValueError(
                f"Incompatible unit '{unit}' for per_100g food '{food.name}'."
            )

    elif food.nutrition_reference_basis == "per_100ml":
        if unit_normalized in MASS_UNITS:
            raise ValueError(
                "Cannot calculate per_100ml food with mass unit; mass cannot be inferred from volume."
            )
        if unit_normalized in {"ml", "millilitre", "millilitres"}:
            multiplier = quantity / Decimal("100")
        elif unit_normalized in {"l", "litre", "litres", "liter", "liters"}:
            multiplier = (quantity * Decimal("1000")) / Decimal("100")
        elif unit_normalized == serving_unit_normalized:
            if food.serving_volume_ml is not None and food.serving_volume_ml > 0:
                logged_ml = (quantity / food.serving_size) * food.serving_volume_ml
                multiplier = logged_ml / Decimal("100")
            elif food.serving_unit.lower() in VOLUME_UNITS:
                multiplier = quantity / Decimal("100")
            else:
                raise ValueError(
                    f"Ambiguous serving unit '{unit}': no documented volume conversion for per_100ml food."
                )
        else:
            raise ValueError(
                f"Incompatible unit '{unit}' for per_100ml food '{food.name}'."
            )

    elif food.nutrition_reference_basis == "per_serving":
        if unit_normalized in MASS_UNITS or unit_normalized in VOLUME_UNITS:
            raise ValueError(
                f"Cannot calculate per_serving food with '{unit}': no documented conversion to serving."
            )
        if (
            unit_normalized == serving_unit_normalized
            or unit_normalized in {"serving", "servings"}
        ):
            multiplier = quantity / food.serving_size
        else:
            raise ValueError(
                f"Incompatible serving unit '{unit}' for food '{food.name}' (expected '{food.serving_unit}')."
            )
    else:
        raise ValueError(
            f"Unsupported reference basis: {food.nutrition_reference_basis}"
        )

    # Deterministic round to 1 decimal place matching storage precision (ROUND_HALF_UP)
    def _round(val: Decimal) -> Decimal:
        return val.quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)

    return {
        "calories": _round(Decimal(str(food.calories)) * multiplier),
        "protein": _round(Decimal(str(food.protein)) * multiplier),
        "carbohydrates": _round(Decimal(str(food.carbohydrates)) * multiplier),
        "fat": _round(Decimal(str(food.fat)) * multiplier),
    }
