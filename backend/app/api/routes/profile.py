import uuid

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileResponse, ProfileUpdate
from app.services.profile_service import (
    create_profile,
    get_profile,
    update_profile,
)


router = APIRouter(prefix="/api/v1/profile", tags=["Profile"])

DEMO_USER_ID = uuid.UUID("11111111-1111-4111-8111-111111111111")


@router.post(
    "",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def post_profile(
    profile_data: ProfileCreate,
    response: Response,
    db: Session = Depends(get_db),
) -> Profile:
    existing_profile = get_profile(db, DEMO_USER_ID)
    if existing_profile is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A profile already exists.",
        )

    try:
        profile = create_profile(db, DEMO_USER_ID, profile_data)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A profile already exists.",
        ) from None

    response.headers["Location"] = "/api/v1/profile"
    return profile


@router.get("", response_model=ProfileResponse)
def read_profile(
    db: Session = Depends(get_db),
) -> Profile:
    profile = get_profile(db, DEMO_USER_ID)
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found.",
        )
    return profile


@router.patch("", response_model=ProfileResponse)
def patch_profile(
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db),
) -> Profile:
    profile = get_profile(db, DEMO_USER_ID)
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found.",
        )
    return update_profile(db, profile, profile_data)
