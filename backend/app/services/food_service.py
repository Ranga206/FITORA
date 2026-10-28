from typing import Any
from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.food_item import FoodItem
from app.schemas.food import MASS_UNITS, VOLUME_UNITS


def classify_food_item(food: FoodItem) -> list[str]:
    """Deterministically classifies an existing food item into goal categories.

    Categories:
    - 'weight_gain': Energy-dense (>=250 kcal/100g) or nutrient-dense proteins/fats
    - 'weight_loss': High satiety, low-to-moderate calorie density (<=140 kcal/100g) or lean protein
    - 'diabetic_friendly': Low available carbs (<=10g) or high-fiber blunting glycemic impact
    """
    cal = float(food.calories)
    p = float(food.protein)
    c = float(food.carbohydrates)
    f = float(food.fat)
    cat = food.category
    name = food.name.lower()
    prep = food.preparation_state.lower()

    categories = []

    # 1. Weight Gain
    if cal >= 250:
        categories.append("weight_gain")
    elif cal >= 150 and (p >= 15 or f >= 10):
        categories.append("weight_gain")
    elif cat == "Nuts & Seeds":
        categories.append("weight_gain")
    elif "butter" in name or "whole milk" in name or "cottage cheese" in name:
        categories.append("weight_gain")

    # 2. Weight Loss
    if cal <= 140:
        categories.append("weight_loss")
    elif p >= 20 and cal <= 180:
        categories.append("weight_loss")
    elif (cat in ["Vegetables", "Fruits"]) and cal <= 100:
        categories.append("weight_loss")

    # 3. Diabetic-Friendly
    is_refined = "white rice" in name or "wheat flour" in name or "potatoes" in name
    if not is_refined:
        if c <= 10.0:
            categories.append("diabetic_friendly")
        elif cat == "Nuts & Seeds" and c <= 25.0:
            categories.append("diabetic_friendly")
        elif prep == "boiled" and cat == "Legumes & Pulses":
            categories.append("diabetic_friendly")
        elif cat == "Fruits" and c <= 15.0 and ("apple" in name or "guava" in name or "papaya" in name):
            categories.append("diabetic_friendly")
        elif "chia" in name:
            categories.append("diabetic_friendly")

    return categories


def get_nutrition_goal_summary(db: Session) -> list[dict[str, Any]]:
    """Returns summary counts and metadata for the three primary nutrition categories."""
    query = select(FoodItem).where(FoodItem.data_review_status == "verified")
    all_items = list(db.scalars(query).all())
    counts = {"weight_gain": 0, "weight_loss": 0, "diabetic_friendly": 0}
    for item in all_items:
        for cat in classify_food_item(item):
            counts[cat] += 1

    return [
        {
            "id": "weight_gain",
            "name": "Weight Gain",
            "description": "Discover nourishing foods to support healthy weight gain.",
            "count": counts["weight_gain"],
        },
        {
            "id": "weight_loss",
            "name": "Weight Loss",
            "description": "Explore balanced, nutrient-rich foods for your weight-management goals.",
            "count": counts["weight_loss"],
        },
        {
            "id": "diabetic_friendly",
            "name": "Diabetic-Friendly Foods",
            "description": "Explore balanced food options to support mindful blood-glucose management.",
            "count": counts["diabetic_friendly"],
        },
    ]


def get_published_foods(
    db: Session,
    *,
    q: str | None = None,
    category: str | None = None,
    goal: str | None = None,
    limit: int = 20,
    offset: int = 0,
) -> tuple[list[FoodItem], int]:
    """Retrieve verified published foods with deterministic ordering and bounded pagination."""
    query = select(FoodItem).where(FoodItem.data_review_status == "verified")

    if q and q.strip():
        query = query.where(FoodItem.name.ilike(f"%{q.strip()}%"))

    if category and category.strip():
        query = query.where(func.lower(FoodItem.category) == category.strip().lower())

    query = query.order_by(func.lower(FoodItem.name).asc(), FoodItem.id.asc())

    if goal and goal.strip():
        target_goal = goal.strip().lower().replace("-", "_")
        all_items = list(db.scalars(query).all())
        filtered = [item for item in all_items if target_goal in classify_food_item(item)]
        total = len(filtered)
        items = filtered[offset : offset + limit]
        return items, total

    count_query = select(func.count()).select_from(query.subquery())
    total = db.scalar(count_query) or 0

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
