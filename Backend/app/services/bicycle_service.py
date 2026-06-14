from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.bicycle import Bicycle
from app.models.part import Part


def create_bicycle_service(
    db: Session,
    bicycle_name: str
):

    try:

        existing_bicycle = db.query(Bicycle).filter(
            Bicycle.name == bicycle_name
        ).first()

        if existing_bicycle:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Bicycle already exists"
            )

        new_bicycle = Bicycle(
            name=bicycle_name,
            status ="Pending"
        )

        db.add(new_bicycle)

        db.commit()

        db.refresh(new_bicycle)

        default_parts = [
            "Body","Wheel",'Handle'
        ]
        for part_name in default_parts:

            new_part = Part(
                part_name=part_name,
                quantity=1,
                stage="Procurement",
                bicycle_id=new_bicycle.id
            )
            db.add(new_part)
            db.commit() 

        return new_bicycle

    except HTTPException:
        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


def get_all_bicycles_service(
    db: Session
):

    try:

        bicycles = db.query(Bicycle).order_by(
         Bicycle.updated_at.desc()
      ).all()
        response = []

        for bicycle in bicycles:
            status_value = get_bicycle_status(
                bicycle.parts
            )

            response.append({
                "id":bicycle.id,
                "name":bicycle.name,
                "created_at":bicycle.created_at,
                "status":status_value
            })
        

        return response

    except Exception as e:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    

def get_single_bicycle_service(
    db: Session,
    bicycle_id: int
):
    

    bicycle = db.query(Bicycle).filter(
        Bicycle.id == bicycle_id
    ).first()

    if not bicycle:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bicycle not found"
        )
    

    status_value = get_bicycle_status(
        bicycle.parts
    )

    return{
        "id":bicycle.id,
        "name":bicycle.name,
        "created_at":bicycle.created_at,
        "status":status_value,
        "parts": [
            {
                "id": part.id,
                "part_name": part.part_name,
                "quantity": part.quantity,
                "stage": part.stage,
                "bicycle_id": part.bicycle_id
            }

            for part in bicycle.parts
        ]
    }


def update_bicycle_service(
        db: Session,
        bicycle_id: int,
        bicycle_name: str
):
    bicycle = db.query(Bicycle).filter(
        Bicycle.id == bicycle_id
    ).first()

    if not bicycle:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bicycle not found"
        )
    
    bicycle.name = bicycle_name

    db.commit()

    db.refresh(bicycle)

    return bicycle

def delete_bicycle_service(
        db: Session,
        bicycle_id: int
):
    bicycle = db.query(Bicycle).filter(
        Bicycle.id == bicycle_id
    ).first()

    if not bicycle:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bicycle not found"
        )
    
    db.delete(bicycle)

    db.commit()

    return{
        "message":"Bicycle deleted successfully"
    }

def get_bicycle_status(parts):

    for part in parts:

        if part.stage != "Ready To Dispatch":

            return "In Progress"

    return "Ready To Dispatch"


def get_ready_bicycles_service(
    db: Session
):

    bicycles = db.query(Bicycle).all()

    ready_bicycles = []

    for bicycle in bicycles:

        all_ready = all(

            part.stage ==
            "Ready To Dispatch"

            for part in bicycle.parts
        )

        if all_ready:

            ready_bicycles.append({

                "id":
                    bicycle.id,

                "name":
                    bicycle.name,

                "created_at":
                    bicycle.created_at,

                "status":
                    "Ready To Dispatch"
            })

    return ready_bicycles