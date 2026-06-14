from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.part import Part
from datetime import datetime

def get_bicycle_parts_service(
        db:Session,
        bicycle_id:int
):
    parts = db.query(Part).filter(
        Part.bicycle_id == bicycle_id
    ).all()

    if not parts:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No parts found for this bicycle"
        )
    
    return parts


def move_part_stage_service(
        db: Session,
        part_id: int
):

    part = db.query(Part).filter(
        Part.id == part_id
    ).first()


    if not part:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Part not found"
        )


    if part.stage == "Procurement":

        part.stage = "Assembly"


    elif part.stage == "Assembly":

        part.stage = "Testing"


    elif part.stage == "Testing":

        part.stage = "Ready To Dispatch"


    elif part.stage == "Ready To Dispatch":

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Part already completed"
        )

    part.bicycle.updated_at = datetime.utcnow()
   
    db.commit()

    db.refresh(part)

    return part

def update_part_quantity_service(
        db:Session,
        part_id:int,
        quantity:int
):
    part = db.query(Part).filter(
        Part.id == part_id
    ).first()

    if not part:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Part not found"
        )
    if quantity < 1:
      raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Quantity must be greater than 0"
    )

    part.quantity = quantity
    part.bicycle.updated_at =datetime.utcnow()
    
    db.commit()
    db.refresh(part)

    return part