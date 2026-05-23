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
    status:str

    class Config:
        from_attributes = True