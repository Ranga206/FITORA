import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileUpdate


def get_profile(db: Session, user_id: uuid.UUID) -> Profile | None:
    statement = select(Profile).where(Profile.user_id == user_id)
    return db.scalar(statement)


def create_profile(
    db: Session,
    user_id: uuid.UUID,
    profile_data: ProfileCreate,
) -> Profile:
    profile = Profile(
        user_id=user_id,
        **profile_data.model_dump(),
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


def update_profile(
    db: Session,
    profile: Profile,
    profile_data: ProfileUpdate,
) -> Profile:
    changes = profile_data.model_dump(exclude_unset=True)

    for field, value in changes.items():
        setattr(profile, field, value)

    profile.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(profile)
    return profile
