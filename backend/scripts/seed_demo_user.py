import uuid

from sqlalchemy.dialects.postgresql import insert

from app.core.config import get_settings
from app.db.session import engine
from app.models.demo_user import DemoUser


DEMO_USER_ID = uuid.UUID("11111111-1111-4111-8111-111111111111")


def main() -> None:
    settings = get_settings()

    if settings.environment != "development":
        raise RuntimeError("Demo-user seeding is allowed only in development.")

    statement = (
        insert(DemoUser)
        .values(id=DEMO_USER_ID)
        .on_conflict_do_nothing(index_elements=["id"])
    )

    with engine.begin() as connection:
        connection.execute(statement)

    print("Development demo user is ready:", DEMO_USER_ID)


if __name__ == "__main__":
    main()
