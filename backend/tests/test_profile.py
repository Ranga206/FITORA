from decimal import Decimal

from app.models import Profile


PROFILE_URL = "/api/v1/profile"

VALID_PROFILE = {
    "age": 21,
    "height": 165.5,
    "weight": 53.0,
    "sex": "male",
}


def test_create_profile(client):
    response = client.post(PROFILE_URL, json=VALID_PROFILE)

    assert response.status_code == 201
    body = response.json()

    assert body["age"] == 21
    assert Decimal(body["height"]) == Decimal("165.5")
    assert Decimal(body["weight"]) == Decimal("53.0")
    assert body["sex"] == "male"
    assert body["id"]
    assert body["created_at"]
    assert body["updated_at"]
    assert response.headers["location"] == PROFILE_URL


def test_read_missing_profile_returns_404(client):
    response = client.get(PROFILE_URL)

    assert response.status_code == 404
    assert response.json()["detail"] == "Profile not found."


def test_patch_updates_only_supplied_field(client):
    create_response = client.post(PROFILE_URL, json=VALID_PROFILE)
    assert create_response.status_code == 201

    original = create_response.json()

    response = client.patch(PROFILE_URL, json={"weight": 54.0})

    assert response.status_code == 200
    updated = response.json()

    assert updated["id"] == original["id"]
    assert updated["age"] == original["age"]
    assert updated["height"] == original["height"]
    assert updated["sex"] == original["sex"]
    assert Decimal(updated["weight"]) == Decimal("54.0")
    assert updated["created_at"] == original["created_at"]
    assert updated["updated_at"] != original["updated_at"]


def test_duplicate_profile_returns_409(client):
    assert client.post(PROFILE_URL, json=VALID_PROFILE).status_code == 201

    response = client.post(PROFILE_URL, json=VALID_PROFILE)

    assert response.status_code == 409
    assert response.json()["detail"] == "A profile already exists."


def test_age_below_minimum_returns_422(client):
    invalid_profile = {**VALID_PROFILE, "age": 12}

    response = client.post(PROFILE_URL, json=invalid_profile)

    assert response.status_code == 422


def test_unknown_field_returns_422(client):
    invalid_profile = {**VALID_PROFILE, "unknown_field": "test"}

    response = client.post(PROFILE_URL, json=invalid_profile)

    assert response.status_code == 422


def test_empty_patch_returns_422(client):
    assert client.post(PROFILE_URL, json=VALID_PROFILE).status_code == 201

    response = client.patch(PROFILE_URL, json={})

    assert response.status_code == 422
    assert "At least one field must be provided." in response.text


def test_null_patch_value_returns_422(client):
    assert client.post(PROFILE_URL, json=VALID_PROFILE).status_code == 201

    response = client.patch(PROFILE_URL, json={"weight": None})

    assert response.status_code == 422
    assert "Profile fields cannot be null." in response.text


import pytest


@pytest.mark.parametrize(
    "field,value",
    [
        ("age", 13),
        ("age", 100),
        ("height", 100),
        ("height", 250),
        ("weight", 30),
        ("weight", 300),
    ],
)
def test_profile_accepts_boundary_values(client, field, value):
    profile_data = {**VALID_PROFILE, field: value}

    response = client.post(PROFILE_URL, json=profile_data)

    assert response.status_code == 201, response.text
    assert float(response.json()[field]) == float(value)

@pytest.mark.parametrize(
    "field,value",
    [
        ("age", "21"),
        ("age", True),
        ("height", "165.5"),
        ("weight", "53.0"),
        ("sex", "other"),
    ],
)
def test_profile_rejects_invalid_field_types_or_values(client, field, value):
    invalid_profile = {**VALID_PROFILE, field: value}

    response = client.post(PROFILE_URL, json=invalid_profile)

    assert response.status_code == 422, response.text




@pytest.mark.parametrize(
    "field",
    ["age", "height", "weight", "sex"],
)
def test_create_profile_rejects_missing_required_field(client, field):
    profile_data = {**VALID_PROFILE}
    del profile_data[field]

    response = client.post(PROFILE_URL, json=profile_data)

    assert response.status_code == 422, response.text


@pytest.mark.parametrize(
    "field,value",
    [
        ("height", 99.9),
        ("height", 250.1),
        ("weight", 29.9),
        ("weight", 300.1),
    ],
)
def test_create_profile_rejects_out_of_range_measurements(client, field, value):
    profile_data = {**VALID_PROFILE, field: value}

    response = client.post(PROFILE_URL, json=profile_data)

    assert response.status_code == 422, response.text


def test_patch_missing_profile_returns_404(client):
    response = client.patch(PROFILE_URL, json={"weight": 54.0})

    assert response.status_code == 404
    assert response.json()["detail"] == "Profile not found."


def test_read_existing_profile_returns_created_values(client):
    create_response = client.post(PROFILE_URL, json=VALID_PROFILE)
    assert create_response.status_code == 201

    response = client.get(PROFILE_URL)

    assert response.status_code == 200
    assert response.json()["id"] == create_response.json()["id"]
    assert response.json()["age"] == VALID_PROFILE["age"]
    assert response.json()["sex"] == VALID_PROFILE["sex"]
