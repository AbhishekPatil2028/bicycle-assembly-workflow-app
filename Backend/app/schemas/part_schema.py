from pydantic import BaseModel

class PartResponse(BaseModel):
    id: int
    part_name: str
    quantity: int
    stage:str
    bicycle_id:int

    class Config:

        from_attributes =True


class UpdateQuantityRequest(BaseModel):
    quantity:int        


    