import uuid
from decimal import Decimal

import pytest
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from pydantic import ValidationError

from app.models.food_item import FoodItem
from app.schemas.food import FoodItemResponse, validate_food_conditional_rules
from app.services.food_service import calculate_food_nutrients
from scripts.seed_food_catalog import seed_food_catalog

FOODS_URL = "/api/v1/nutrition/foods"


@pytest.fixture()
def seeded_db(test_engine, client):
    """Seed test database with verified food items for integration tests."""
    seed_food_catalog(test_engine)
    return client


# ---------------------------------------------------------------------------
# 1. Seed Repeatability & Deterministic Data
# ---------------------------------------------------------------------------


def test_seed_food_catalog_is_idempotent(test_engine):
    count_first = seed_food_catalog(test_engine)
    assert count_first == 50

    # Running a second time must succeed and maintain exact count with zero duplicate key errors
    count_second = seed_food_catalog(test_engine)
    assert count_second == 50

    with test_engine.connect() as conn:
        total = conn.execute(text("SELECT count(*) FROM food_items")).scalar_one()
        assert total == 50


# ---------------------------------------------------------------------------
# 2. List Endpoint Integration Tests
# ---------------------------------------------------------------------------


def test_list_foods_default_pagination(seeded_db):
    response = seeded_db.get(FOODS_URL)
    assert response.status_code == 200
    data = response.json()

    assert data["total"] == 50
    assert data["limit"] == 20
    assert data["offset"] == 0
    assert len(data["items"]) == 20

    # Ensure all published items are verified
    for item in data["items"]:
        assert item["data_review_status"] == "verified"
        assert item["is_system"] is True
        assert Decimal(item["calories"]) >= 0
        assert Decimal(item["protein"]) >= 0
        assert Decimal(item["carbohydrates"]) >= 0
        assert Decimal(item["fat"]) >= 0


def test_list_foods_limit_and_offset(seeded_db):
    response_p1 = seeded_db.get(f"{FOODS_URL}?limit=10&offset=0")
    assert response_p1.status_code == 200
    p1_items = response_p1.json()["items"]
    assert len(p1_items) == 10

    response_p2 = seeded_db.get(f"{FOODS_URL}?limit=10&offset=10")
    assert response_p2.status_code == 200
    p2_items = response_p2.json()["items"]
    assert len(p2_items) == 10

    # Ensure no overlap between page 1 and page 2
    p1_ids = {item["id"] for item in p1_items}
    p2_ids = {item["id"] for item in p2_items}
    assert p1_ids.isdisjoint(p2_ids)


@pytest.mark.parametrize(
    "param,value",
    [
        ("limit", 101),
        ("limit", 0),
        ("limit", -1),
        ("offset", -1),
    ],
)
def test_list_foods_invalid_pagination_returns_422(seeded_db, param, value):
    response = seeded_db.get(f"{FOODS_URL}?{param}={value}")
    assert response.status_code == 422


def test_list_foods_case_insensitive_name_search(seeded_db):
    response_lower = seeded_db.get(f"{FOODS_URL}?q=rice")
    assert response_lower.status_code == 200
    data_lower = response_lower.json()

    response_upper = seeded_db.get(f"{FOODS_URL}?q=RICE")
    assert response_upper.status_code == 200
    data_upper = response_upper.json()

    assert data_lower["total"] == data_upper["total"]
    assert len(data_lower["items"]) == len(data_upper["items"])
    assert data_lower["total"] >= 4

    for item in data_lower["items"]:
        assert "rice" in item["name"].lower()


def test_list_foods_nonexistent_search_returns_empty(seeded_db):
    response = seeded_db.get(f"{FOODS_URL}?q=nonexistentfoodquery987")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert data["items"] == []


def test_list_foods_category_filtering(seeded_db):
    response = seeded_db.get(f"{FOODS_URL}?category=Vegetables")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 10
    for item in data["items"]:
        assert item["category"] == "Vegetables"

    # Category matching is case-insensitive
    response_lower = seeded_db.get(f"{FOODS_URL}?category=vegetables")
    assert response_lower.status_code == 200
    assert response_lower.json()["total"] == data["total"]


def test_list_foods_combined_search_and_category(seeded_db):
    response = seeded_db.get(f"{FOODS_URL}?q=beans&category=Legumes%20%26%20Pulses")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] > 0
    for item in data["items"]:
        assert item["category"] == "Legumes & Pulses"
        assert "beans" in item["name"].lower()


def test_list_foods_deterministic_order(seeded_db):
    response = seeded_db.get(f"{FOODS_URL}?limit=50")
    assert response.status_code == 200
    items = response.json()["items"]
    names = [item["name"].lower() for item in items]
    assert names == sorted(names)


def test_draft_and_unverified_foods_excluded_from_catalog(test_engine, client):
    """Ensure non-verified foods (draft or archived) NEVER leak into public list endpoint."""
    with test_engine.begin() as conn:
        conn.execute(
            text(
                """
                INSERT INTO food_items (
                    id, name, category, preparation_state, food_type,
                    nutrition_reference_basis, serving_size, serving_unit,
                    calories, protein, carbohydrates, fat,
                    source_name, data_review_status, is_system
                ) VALUES
                (
                    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
                    'Draft Food Item',
                    'Snacks',
                    'raw',
                    'single_ingredient',
                    'per_100g',
                    100,
                    'g',
                    200,
                    10,
                    20,
                    5,
                    'Test Source',
                    'draft',
                    false
                ),
                (
                    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
                    'Archived Food Item',
                    'Snacks',
                    'raw',
                    'single_ingredient',
                    'per_100g',
                    100,
                    'g',
                    200,
                    10,
                    20,
                    5,
                    'Test Source',
                    'archived',
                    false
                ),
                (
                    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
                    'Verified Production Food',
                    'Snacks',
                    'raw',
                    'single_ingredient',
                    'per_100g',
                    100,
                    'g',
                    200,
                    10,
                    20,
                    5,
                    'Test Source',
                    'verified',
                    true
                )
                """
            )
        )

    response = client.get(FOODS_URL)
    assert response.status_code == 200
    data = response.json()

    assert data["total"] == 1
    assert len(data["items"]) == 1
    assert data["items"][0]["name"] == "Verified Production Food"
    assert data["items"][0]["data_review_status"] == "verified"


# ---------------------------------------------------------------------------
# 3. Detail Endpoint Integration Tests
# ---------------------------------------------------------------------------


def test_read_food_detail_success(seeded_db):
    list_res = seeded_db.get(f"{FOODS_URL}?limit=1")
    assert list_res.status_code == 200
    food_id = list_res.json()["items"][0]["id"]

    response = seeded_db.get(f"{FOODS_URL}/{food_id}")
    assert response.status_code == 200
    item = response.json()

    assert item["id"] == food_id
    assert item["data_review_status"] == "verified"
    assert "name" in item
    assert "source_name" in item
    assert "source_code" in item
    assert Decimal(item["calories"]) >= 0


def test_read_missing_food_returns_404(seeded_db):
    missing_id = str(uuid.uuid4())
    response = seeded_db.get(f"{FOODS_URL}/{missing_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "Food item not found."


def test_read_draft_food_returns_404(test_engine, client):
    draft_id = "dddddddd-dddd-4ddd-8ddd-dddddddddddd"
    with test_engine.begin() as conn:
        conn.execute(
            text(
                f"""
                INSERT INTO food_items (
                    id, name, category, preparation_state, food_type,
                    nutrition_reference_basis, serving_size, serving_unit,
                    calories, protein, carbohydrates, fat,
                    source_name, data_review_status, is_system
                ) VALUES (
                    '{draft_id}',
                    'Secret Draft Item',
                    'Snacks',
                    'raw',
                    'single_ingredient',
                    'per_100g',
                    100,
                    'g',
                    150,
                    5,
                    15,
                    2,
                    'Test',
                    'draft',
                    false
                )
                """
            )
        )

    response = client.get(f"{FOODS_URL}/{draft_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "Food item not found."


def test_read_food_invalid_uuid_returns_422(seeded_db):
    response = seeded_db.get(f"{FOODS_URL}/not-a-valid-uuid")
    assert response.status_code == 422


# ---------------------------------------------------------------------------
# 4. Strict Validation & Reference Basis Unit Tests
# ---------------------------------------------------------------------------


def test_validation_per_100g_valid():
    # Valid mass unit
    validate_food_conditional_rules(
        nutrition_reference_basis="per_100g",
        serving_size=Decimal("100"),
        serving_unit="g",
        serving_weight_g=Decimal("100"),
        serving_volume_ml=None,
        calories=Decimal("150"),
        protein=Decimal("5"),
        carbohydrates=Decimal("20"),
        fat=Decimal("2"),
        data_review_status="verified",
        source_name="USDA FoodData Central",
    )


def test_validation_per_100g_rejects_volume_ml():
    with pytest.raises(
        ValueError, match="must not specify serving_volume_ml; volume cannot be inferred"
    ):
        validate_food_conditional_rules(
            nutrition_reference_basis="per_100g",
            serving_size=Decimal("100"),
            serving_unit="g",
            serving_weight_g=Decimal("100"),
            serving_volume_ml=Decimal("100"),
            calories=Decimal("150"),
            protein=Decimal("5"),
            carbohydrates=Decimal("20"),
            fat=Decimal("2"),
            data_review_status="verified",
            source_name="USDA FoodData Central",
        )


def test_validation_per_100g_requires_documented_weight_for_household_unit():
    with pytest.raises(
        ValueError, match="requires a documented positive serving_weight_g"
    ):
        validate_food_conditional_rules(
            nutrition_reference_basis="per_100g",
            serving_size=Decimal("1"),
            serving_unit="cup",
            serving_weight_g=None,
            serving_volume_ml=None,
            calories=Decimal("150"),
            protein=Decimal("5"),
            carbohydrates=Decimal("20"),
            fat=Decimal("2"),
            data_review_status="verified",
            source_name="USDA FoodData Central",
        )


def test_validation_per_100ml_valid():
    validate_food_conditional_rules(
        nutrition_reference_basis="per_100ml",
        serving_size=Decimal("100"),
        serving_unit="ml",
        serving_weight_g=None,
        serving_volume_ml=Decimal("100"),
        calories=Decimal("60"),
        protein=Decimal("3"),
        carbohydrates=Decimal("5"),
        fat=Decimal("3"),
        data_review_status="verified",
        source_name="USDA FoodData Central",
    )


def test_validation_per_100ml_rejects_weight_g():
    with pytest.raises(
        ValueError, match="must not specify serving_weight_g; mass cannot be inferred"
    ):
        validate_food_conditional_rules(
            nutrition_reference_basis="per_100ml",
            serving_size=Decimal("100"),
            serving_unit="ml",
            serving_weight_g=Decimal("103"),
            serving_volume_ml=Decimal("100"),
            calories=Decimal("60"),
            protein=Decimal("3"),
            carbohydrates=Decimal("5"),
            fat=Decimal("3"),
            data_review_status="verified",
            source_name="USDA FoodData Central",
        )


def test_validation_per_serving_valid():
    validate_food_conditional_rules(
        nutrition_reference_basis="per_serving",
        serving_size=Decimal("1"),
        serving_unit="egg",
        serving_weight_g=Decimal("50"),
        serving_volume_ml=None,
        calories=Decimal("72"),
        protein=Decimal("6.3"),
        carbohydrates=Decimal("0.4"),
        fat=Decimal("4.8"),
        data_review_status="verified",
        source_name="USDA FoodData Central",
    )


def test_validation_rejects_negative_nutrients():
    with pytest.raises(ValueError, match="Calories must be a non-negative"):
        validate_food_conditional_rules(
            nutrition_reference_basis="per_100g",
            serving_size=Decimal("100"),
            serving_unit="g",
            serving_weight_g=Decimal("100"),
            serving_volume_ml=None,
            calories=Decimal("-10"),
            protein=Decimal("5"),
            carbohydrates=Decimal("20"),
            fat=Decimal("2"),
            data_review_status="verified",
            source_name="USDA FoodData Central",
        )


# ---------------------------------------------------------------------------
# 5. Nutrient Calculation Rules (Section 10)
# ---------------------------------------------------------------------------


def test_nutrient_calculation_per_100g():
    food = FoodItem(
        id=uuid.uuid4(),
        name="Test Rice",
        category="Grains",
        preparation_state="cooked",
        food_type="single_ingredient",
        nutrition_reference_basis="per_100g",
        serving_size=Decimal("100.0"),
        serving_unit="g",
        serving_weight_g=Decimal("100.0"),
        calories=Decimal("130.0"),
        protein=Decimal("2.7"),
        carbohydrates=Decimal("28.2"),
        fat=Decimal("0.3"),
        source_name="USDA",
        data_review_status="verified",
    )

    # Logged 150 grams -> multiplier = 1.5
    calc = calculate_food_nutrients(food, Decimal("150"), "g")
    assert calc["calories"] == Decimal("195.0")
    assert calc["protein"] == Decimal("4.1")
    assert calc["carbohydrates"] == Decimal("42.3")
    assert calc["fat"] == Decimal("0.5")


def test_nutrient_calculation_per_100g_rejects_volume_unit():
    food = FoodItem(
        id=uuid.uuid4(),
        name="Test Oats",
        category="Grains",
        preparation_state="raw",
        food_type="single_ingredient",
        nutrition_reference_basis="per_100g",
        serving_size=Decimal("100.0"),
        serving_unit="g",
        calories=Decimal("380.0"),
        protein=Decimal("13.0"),
        carbohydrates=Decimal("68.0"),
        fat=Decimal("6.5"),
        source_name="USDA",
        data_review_status="verified",
    )

    with pytest.raises(
        ValueError, match="Cannot calculate per_100g food with volume unit"
    ):
        calculate_food_nutrients(food, Decimal("200"), "ml")


def test_nutrient_calculation_per_100ml():
    food = FoodItem(
        id=uuid.uuid4(),
        name="Test Milk",
        category="Dairy",
        preparation_state="whole",
        food_type="single_ingredient",
        nutrition_reference_basis="per_100ml",
        serving_size=Decimal("100.0"),
        serving_unit="ml",
        serving_volume_ml=Decimal("100.0"),
        calories=Decimal("60.0"),
        protein=Decimal("3.2"),
        carbohydrates=Decimal("4.8"),
        fat=Decimal("3.3"),
        source_name="USDA",
        data_review_status="verified",
    )

    # Logged 250 ml -> multiplier = 2.5
    calc = calculate_food_nutrients(food, Decimal("250"), "ml")
    assert calc["calories"] == Decimal("150.0")
    assert calc["protein"] == Decimal("8.0")
    assert calc["carbohydrates"] == Decimal("12.0")
    assert calc["fat"] == Decimal("8.3")


def test_nutrient_calculation_per_100ml_rejects_mass_unit():
    food = FoodItem(
        id=uuid.uuid4(),
        name="Test Milk",
        category="Dairy",
        preparation_state="whole",
        food_type="single_ingredient",
        nutrition_reference_basis="per_100ml",
        serving_size=Decimal("100.0"),
        serving_unit="ml",
        calories=Decimal("60.0"),
        protein=Decimal("3.2"),
        carbohydrates=Decimal("4.8"),
        fat=Decimal("3.3"),
        source_name="USDA",
        data_review_status="verified",
    )

    with pytest.raises(
        ValueError, match="Cannot calculate per_100ml food with mass unit"
    ):
        calculate_food_nutrients(food, Decimal("250"), "g")


def test_nutrient_calculation_per_serving():
    food = FoodItem(
        id=uuid.uuid4(),
        name="Large Egg",
        category="Dairy & Eggs",
        preparation_state="raw",
        food_type="single_ingredient",
        nutrition_reference_basis="per_serving",
        serving_size=Decimal("1.0"),
        serving_unit="egg",
        calories=Decimal("72.0"),
        protein=Decimal("6.3"),
        carbohydrates=Decimal("0.4"),
        fat=Decimal("4.8"),
        source_name="USDA",
        data_review_status="verified",
    )

    calc = calculate_food_nutrients(food, Decimal("2.0"), "egg")
    assert calc["calories"] == Decimal("144.0")
    assert calc["protein"] == Decimal("12.6")
    assert calc["carbohydrates"] == Decimal("0.8")
    assert calc["fat"] == Decimal("9.6")


def test_nutrient_calculation_per_serving_rejects_raw_mass():
    food = FoodItem(
        id=uuid.uuid4(),
        name="Large Egg",
        category="Dairy & Eggs",
        preparation_state="raw",
        food_type="single_ingredient",
        nutrition_reference_basis="per_serving",
        serving_size=Decimal("1.0"),
        serving_unit="egg",
        calories=Decimal("72.0"),
        protein=Decimal("6.3"),
        carbohydrates=Decimal("0.4"),
        fat=Decimal("4.8"),
        source_name="USDA",
        data_review_status="verified",
    )

    with pytest.raises(ValueError, match="no documented conversion to serving"):
        calculate_food_nutrients(food, Decimal("100"), "g")


# ---------------------------------------------------------------------------
# 6. Database Check Constraint Enforcement
# ---------------------------------------------------------------------------


def test_database_enforces_non_negative_nutrients(test_engine):
    with pytest.raises(IntegrityError):
        with test_engine.begin() as conn:
            conn.execute(
                text(
                    """
                    INSERT INTO food_items (
                        id, name, category, preparation_state, food_type,
                        nutrition_reference_basis, serving_size, serving_unit,
                        calories, protein, carbohydrates, fat,
                        source_name, data_review_status, is_system
                    ) VALUES (
                        gen_random_uuid(), 'Bad Food', 'Test', 'raw', 'single',
                        'per_100g', 100, 'g', -50, 5, 5, 5, 'USDA', 'verified', true
                    )
                    """
                )
            )


def test_database_enforces_allowed_reference_basis(test_engine):
    with pytest.raises(IntegrityError):
        with test_engine.begin() as conn:
            conn.execute(
                text(
                    """
                    INSERT INTO food_items (
                        id, name, category, preparation_state, food_type,
                        nutrition_reference_basis, serving_size, serving_unit,
                        calories, protein, carbohydrates, fat,
                        source_name, data_review_status, is_system
                    ) VALUES (
                        gen_random_uuid(), 'Bad Basis Food', 'Test', 'raw', 'single',
                        'per_pound', 100, 'g', 100, 5, 5, 5, 'USDA', 'verified', true
                    )
                    """
                )
            )


# ---------------------------------------------------------------------------
# 7. Remediation Tests: White Rice, Provenance, Conditional Constraints, Validation
# ---------------------------------------------------------------------------


def test_white_rice_food_to_source_mapping(seeded_db):
    """Verify authoritative mapping for white rice records (Decisions 4 & 5)."""
    response = seeded_db.get(f"{FOODS_URL}?q=white%20rice")
    assert response.status_code == 200
    items = response.json()["items"]
    by_name = {item["name"]: item for item in items}

    # Raw white rice must point to FDC 168877 with raw nutrient values
    assert "White Rice, long-grain, raw" in by_name
    raw_rice = by_name["White Rice, long-grain, raw"]
    assert raw_rice["source_code"] == "168877"
    assert raw_rice["preparation_state"] == "raw"
    assert Decimal(raw_rice["calories"]) == Decimal("365.0")
    assert Decimal(raw_rice["protein"]) == Decimal("7.1")
    assert Decimal(raw_rice["carbohydrates"]) == Decimal("80.0")
    assert Decimal(raw_rice["fat"]) == Decimal("0.7")
    assert raw_rice["source_release_version"] == "SR Legacy (April 2018)"

    # Cooked white rice must point to FDC 168878 with cooked nutrient values
    assert "White Rice, long-grain, cooked" in by_name
    cooked_rice = by_name["White Rice, long-grain, cooked"]
    assert cooked_rice["source_code"] == "168878"
    assert cooked_rice["preparation_state"] == "cooked"
    assert Decimal(cooked_rice["calories"]) == Decimal("130.0")
    assert Decimal(cooked_rice["protein"]) == Decimal("2.7")
    assert Decimal(cooked_rice["carbohydrates"]) == Decimal("28.2")
    assert Decimal(cooked_rice["fat"]) == Decimal("0.3")
    assert cooked_rice["source_release_version"] == "SR Legacy (April 2018)"


def test_accurate_source_release_provenance(seeded_db):
    """Verify dataset release versions are accurately categorized without blanket attribution."""
    res_milk = seeded_db.get(f"{FOODS_URL}?q=whole%20milk")
    assert res_milk.status_code == 200
    milk_items = [i for i in res_milk.json()["items"] if i["name"] == "Whole Milk, 3.25% milkfat"]
    assert len(milk_items) == 1
    assert milk_items[0]["source_data_type"] == "Foundation Foods"
    assert milk_items[0]["source_release_version"] == "Foundation Foods (December 2019)"

    res_lentils = seeded_db.get(f"{FOODS_URL}?q=lentils,%20raw")
    assert res_lentils.status_code == 200
    lentil = res_lentils.json()["items"][0]
    assert lentil["source_data_type"] == "SR Legacy"
    assert lentil["source_release_version"] == "SR Legacy (April 2018)"


def test_database_enforces_conditional_serving_constraints(test_engine):
    """Verify database-level check constraints enforce conditional serving integrity."""
    # 1. per_100g rejects non-null serving_volume_ml
    with pytest.raises(IntegrityError):
        with test_engine.begin() as conn:
            conn.execute(
                text(
                    """
                    INSERT INTO food_items (
                        id, name, category, preparation_state, food_type,
                        nutrition_reference_basis, serving_size, serving_unit,
                        serving_volume_ml, calories, protein, carbohydrates, fat,
                        source_name, data_review_status, is_system
                    ) VALUES (
                        gen_random_uuid(), 'Illegal Vol 100g', 'Grains', 'raw', 'single',
                        'per_100g', 100, 'g', 100, 200, 5, 20, 2, 'USDA', 'verified', true
                    )
                    """
                )
            )

    # 2. per_100ml rejects non-null serving_weight_g
    with pytest.raises(IntegrityError):
        with test_engine.begin() as conn:
            conn.execute(
                text(
                    """
                    INSERT INTO food_items (
                        id, name, category, preparation_state, food_type,
                        nutrition_reference_basis, serving_size, serving_unit,
                        serving_weight_g, calories, protein, carbohydrates, fat,
                        source_name, data_review_status, is_system
                    ) VALUES (
                        gen_random_uuid(), 'Illegal Weight 100ml', 'Dairy', 'whole', 'single',
                        'per_100ml', 100, 'ml', 103, 60, 3, 5, 3, 'USDA', 'verified', true
                    )
                    """
                )
            )

    # 3. per_100g with non-mass unit requires documented serving_weight_g > 0
    with pytest.raises(IntegrityError):
        with test_engine.begin() as conn:
            conn.execute(
                text(
                    """
                    INSERT INTO food_items (
                        id, name, category, preparation_state, food_type,
                        nutrition_reference_basis, serving_size, serving_unit,
                        serving_weight_g, calories, protein, carbohydrates, fat,
                        source_name, data_review_status, is_system
                    ) VALUES (
                        gen_random_uuid(), 'Cup without weight', 'Grains', 'raw', 'single',
                        'per_100g', 1, 'cup', NULL, 200, 5, 20, 2, 'USDA', 'verified', true
                    )
                    """
                )
            )

    # 4. per_serving rejects empty or whitespace serving_unit
    with pytest.raises(IntegrityError):
        with test_engine.begin() as conn:
            conn.execute(
                text(
                    """
                    INSERT INTO food_items (
                        id, name, category, preparation_state, food_type,
                        nutrition_reference_basis, serving_size, serving_unit,
                        calories, protein, carbohydrates, fat,
                        source_name, data_review_status, is_system
                    ) VALUES (
                        gen_random_uuid(), 'Empty unit', 'Dairy', 'raw', 'single',
                        'per_serving', 1, '   ', 70, 6, 1, 5, 'USDA', 'verified', true
                    )
                    """
                )
            )


def test_response_model_validation_rejects_corrupt_database_record():
    """Verify FoodItemResponse model validator rejects invalid records before serializing."""
    invalid_record = {
        "id": uuid.uuid4(),
        "name": "Corrupt Item",
        "category": "Test",
        "preparation_state": "raw",
        "food_type": "single_ingredient",
        "nutrition_reference_basis": "per_100g",
        "serving_size": Decimal("100.0"),
        "serving_unit": "g",
        "serving_weight_g": Decimal("100.0"),
        "serving_volume_ml": Decimal("100.0"),  # Contradictory volume on per_100g
        "calories": Decimal("200.0"),
        "protein": Decimal("10.0"),
        "carbohydrates": Decimal("20.0"),
        "fat": Decimal("5.0"),
        "source_name": "USDA",
        "data_review_status": "verified",
        "is_system": True,
        "created_at": "2026-10-25T12:00:00Z",
        "updated_at": "2026-10-25T12:00:00Z",
    }

    with pytest.raises(ValidationError, match="per_100g foods must not specify serving_volume_ml"):
        FoodItemResponse.model_validate(invalid_record)


def test_seed_overwrite_protection_for_manually_edited_records(test_engine):
    """Verify seed script does not overwrite records marked as manually edited (is_system=False)."""
    seed_food_catalog(test_engine)

    # Simulate manual edit on raw white rice by setting is_system = False and custom name
    custom_name = "User Custom Heirloom Rice"
    with test_engine.begin() as conn:
        conn.execute(
            text(
                f"""
                UPDATE food_items
                SET name = '{custom_name}', is_system = false
                WHERE source_code = '168877'
                """
            )
        )

    # Re-run seed process
    count = seed_food_catalog(test_engine)
    assert count == 50

    # Ensure custom name was preserved and NOT overwritten
    with test_engine.connect() as conn:
        persisted_name = conn.execute(
            text("SELECT name FROM food_items WHERE source_code = '168877'")
        ).scalar_one()
        assert persisted_name == custom_name

        is_sys = conn.execute(
            text("SELECT is_system FROM food_items WHERE source_code = '168877'")
        ).scalar_one()
        assert is_sys is False
