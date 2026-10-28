from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.schemas.food import FoodCatalogListResponse, FoodItemResponse
from app.services.food_service import get_published_food_by_id, get_published_foods, get_nutrition_goal_summary

router = APIRouter(prefix="/api/v1/nutrition", tags=["Nutrition"])


@router.get(
    "/foods",
    response_model=FoodCatalogListResponse,
    status_code=status.HTTP_200_OK,
)
def list_foods(
    q: Annotated[str | None, Query(max_length=100)] = None,
    category: Annotated[str | None, Query(max_length=50)] = None,
    goal: Annotated[str | None, Query(max_length=50, description="Nutrition goal: weight_gain, weight_loss, diabetic_friendly")] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
    offset: Annotated[int, Query(ge=0)] = 0,
    db: Session = Depends(get_db),
) -> FoodCatalogListResponse:
    """List production-eligible, verified food catalog items with pagination and filters."""
    items, total = get_published_foods(
        db,
        q=q,
        category=category,
        goal=goal,
        limit=limit,
        offset=offset,
    )
    return FoodCatalogListResponse(
        items=[FoodItemResponse.model_validate(item) for item in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/foods/{id}",
    response_model=FoodItemResponse,
    status_code=status.HTTP_200_OK,
)
def read_food(
    id: UUID,
    db: Session = Depends(get_db),
) -> FoodItemResponse:
    """Retrieve an explicitly verified published food item by UUID."""
    food = get_published_food_by_id(db, id)
    if food is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Food item not found.",
        )
    return FoodItemResponse.model_validate(food)



@router.get(
    "/categories",
    status_code=status.HTTP_200_OK,
)
def list_nutrition_categories(
    db: Session = Depends(get_db),
) -> list[dict]:
    """Retrieve summary and counts for the three nutrition goal categories."""
    return get_nutrition_goal_summary(db)
