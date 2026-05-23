from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.bicycle import Bicycle


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
            name=bicycle_name
        )

        db.add(new_bicycle)

        db.commit()

        db.refresh(new_bicycle)

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

        bicycles = db.query(Bicycle).all()

        return bicycles

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
    return bicycle


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