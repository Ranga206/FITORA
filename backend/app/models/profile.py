import uuid
from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, Numeric, SmallInteger, String, Uuid, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Profile(Base):
    __tablename__ = "profiles"

    __table_args__ = (
        CheckConstraint("age >= 13 AND age <= 100", name="ck_profiles_age_range"),
        CheckConstraint("height >= 100 AND height <= 250", name="ck_profiles_height_range"),
        CheckConstraint("weight >= 30 AND weight <= 300", name="ck_profiles_weight_range"),
        CheckConstraint(
            "sex IN ('male', 'female', 'prefer_not_to_say')",
            name="ck_profiles_sex_allowed",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("demo_users.id"),
        nullable=False,
        unique=True,
    )

    age: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    height: Mapped[float] = mapped_column(Numeric(4, 1), nullable=False)
    weight: Mapped[float] = mapped_column(Numeric(4, 1), nullable=False)
    sex: Mapped[str] = mapped_column(String(20), nullable=False)

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
