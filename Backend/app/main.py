from fastapi import FastAPI

from app.database import engine, Base

from app.models.bicycle import Bicycle
from app.models.part import Part
from app.models.user import User

from fastapi.middleware.cors import CORSMiddleware


from app.routes.bicycle_routes import (
    router as bicycle_router
)

from app.routes.part_routes import(
    router as part_router
)
from app.routes.user_routes import(
    router as user_router
)

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "https://bicycle-assembly-workflow-app-beta.vercel.app/"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

app.include_router(bicycle_router)
app.include_router(part_router)
app.include_router(user_router)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

