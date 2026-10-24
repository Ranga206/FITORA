from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Import models so their tables register with Base.metadata.
import app.models  # noqa: E402, F401
