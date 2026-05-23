from fastapi import FastAPI

from app.database import engine, Base

from app.models.bicycle import Bicycle


from app.routes.bicycle_routes import (
    router as bicycle_router
)

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(bicycle_router)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

