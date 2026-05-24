from pydantic import BaseModel
from datetime import datetime

from app.schemas.part_schema import (
    PartResponse
)

class BicycleCreate(BaseModel):
    name: str

class BicycleUpdate(BaseModel):
    name: str


class BicycleResponse(BaseModel):
    id: int
    name: str
    created_at: datetime
    status:str
    parts: list[PartResponse] = []

    class Config:
        from_attributes = True