from pydantic import BaseModel
from datetime import datetime



class BicycleCreate(BaseModel):
    name: str

class BicycleUpdate(BaseModel):
    name: str


class BicycleResponse(BaseModel):
    id: int
    name: str
    created_at: datetime

    class Config:
        from_attributes = True