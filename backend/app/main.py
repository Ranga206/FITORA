from fastapi import FastAPI

from app.api.routes.profile import router as profile_router


app = FastAPI(
    title="Fitora API",
    description="Backend API for Fitora",
    version="0.1.0",
)

app.include_router(profile_router)


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}
