import uuid

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import URL, create_engine, text
from sqlalchemy.orm import sessionmaker

from app.core.config import get_settings
from app.db.base import Base
from app.db.dependencies import get_db
from app.main import app
from app.models import DemoUser


DEMO_USER_ID = uuid.UUID("11111111-1111-4111-8111-111111111111")


@pytest.fixture(scope="session")
def test_engine():
    settings = get_settings()

    test_database_url = URL.create(
        drivername="postgresql+psycopg",
        username=settings.db_user,
        password=settings.db_password,
        host=settings.db_host,
        port=settings.db_port,
        database="fitora_test_db",
    )

    engine = create_engine(test_database_url, pool_pre_ping=True)

    try:
        with engine.connect() as connection:
            database_name = connection.execute(
                text("SELECT current_database()")
            ).scalar_one()

        if database_name != "fitora_test_db":
            pytest.fail("Safety check failed: not connected to fitora_test_db.")

        yield engine
    finally:
        engine.dispose()


@pytest.fixture()
def client(test_engine):
    # Reset only the dedicated test database before each test.
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)

    TestSessionLocal = sessionmaker(
        bind=test_engine,
        autoflush=False,
        expire_on_commit=False,
    )

    def override_get_db():
        with TestSessionLocal() as db:
            yield db

    app.dependency_overrides[get_db] = override_get_db

    try:
        with TestSessionLocal() as db:
            db.add(DemoUser(id=DEMO_USER_ID))
            db.commit()

        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.clear()
