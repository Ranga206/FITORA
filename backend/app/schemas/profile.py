from datetime import datetime
from datetime import datetime, timezone
from decimal import Decimal
from typing import Annotated, Literal
from uuid import UUID

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    StrictInt,
    StrictStr,
    field_validator,
    model_validator,
    field_serializer,
)


Sex = Literal["male", "female", "prefer_not_to_say"]


class ProfileFields(BaseModel):
    model_config = ConfigDict(extra="forbid")

    age: Annotated[StrictInt, Field(ge=13, le=100)]
    height: Annotated[Decimal, Field(ge=100, le=250, max_digits=4, decimal_places=1)]
    weight: Annotated[Decimal, Field(ge=30, le=300, max_digits=4, decimal_places=1)]
    sex: Sex

    @field_validator("height", "weight", mode="before")
    @classmethod
    def require_numeric_values(cls, value: object) -> object:
        if isinstance(value, bool) or isinstance(value, (str, bytes)):
            raise ValueError("A numeric value is required.")
        return value


class ProfileCreate(ProfileFields):
    pass


class ProfileUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    age: Annotated[StrictInt, Field(ge=13, le=100)] | None = None
    height: Annotated[Decimal, Field(ge=100, le=250, max_digits=4, decimal_places=1)] | None = None
    weight: Annotated[Decimal, Field(ge=30, le=300, max_digits=4, decimal_places=1)] | None = None
    sex: Sex | None = None

    @field_validator("height", "weight", mode="before")
    @classmethod
    def require_numeric_values(cls, value: object) -> object:
        if isinstance(value, bool) or isinstance(value, (str, bytes)):
            raise ValueError("A numeric value is required.")
        return value

    @model_validator(mode="before")
    @classmethod
    def reject_empty_or_null_updates(cls, value: object) -> object:
        if isinstance(value, dict):
            if not value:
                raise ValueError("At least one field must be provided.")
            if any(item is None for item in value.values()):
                raise ValueError("Profile fields cannot be null.")
        return value


class ProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    age: int
    height: Decimal
    weight: Decimal
    sex: Sex
    created_at: datetime
    updated_at: datetime

    @field_serializer("created_at", "updated_at", return_type=str)
    def serialize_utc_timestamps(self, value: datetime) -> str:
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)

        return (
            value.astimezone(timezone.utc)
            .isoformat(timespec="microseconds")
            .replace("+00:00", "Z")
        )