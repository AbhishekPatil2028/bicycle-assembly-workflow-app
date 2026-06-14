from fastapi import (
    APIRouter,
    Depends,
    status
)

from app.models.part import Part
from sqlalchemy import func

from app.models.bicycle import Bicycle
from sqlalchemy.orm import Session

from app.database import get_db

from app.auth.oauth2 import(
    get_current_user
)

from app.schemas.bicycle_schema import (
    BicycleCreate,
    BicycleUpdate,
    BicycleResponse
)

from app.controllers.bicycle_controller import (
    create_bicycle_controller,
    get_all_bicycles_controller,
    get_single_bicycle_controller,
    update_bicycle_controller,
    delete_bicycle_controller,
    get_ready_bicycles_controller
)

router = APIRouter(
    tags=["Bicycles"]
)


@router.post(
    "/bicycles",
    response_model=BicycleResponse,
    status_code=status.HTTP_201_CREATED
)
def create_bicycle(
    bicycle: BicycleCreate,
    db: Session = Depends(get_db)
):

    return create_bicycle_controller(
        bicycle,
        db
    )


@router.get(
    "/bicycles",
    response_model=list[BicycleResponse],
)
def get_bicycles(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return get_all_bicycles_controller(db)


@router.get(
    "/bicycles/{bicycle_id}",
    response_model=BicycleResponse
    )
def get_single_bicycle(
    bicycle_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return get_single_bicycle_controller(
        bicycle_id,
        db
    )

@router.put(
    "/bicycles/{bicycle_id}",
    response_model=BicycleResponse
)
def update_bicycle(
    bicycle_id: int,
    bicycle:BicycleUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

  return update_bicycle_controller(
    bicycle_id,
    bicycle,
    db
   )

@router.delete(
    "/bicycles/{bicycle_id}"
)
def delete_bicycle(
    bicycle_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return delete_bicycle_controller(
        bicycle_id,
        db
    )


@router.get(
    "/dashboard"
)
def get_dashboard_data(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    procurement_count = db.query(Part).filter(
        Part.stage == "Procurement"
    ).count()


    assembly_count = db.query(Part).filter(
        Part.stage == "Assembly"
    ).count()


    testing_count = db.query(Part).filter(
        Part.stage == "Testing"
    ).count()


    bicycles = db.query(Bicycle).all()

    ready_to_dispatch_count = 0


    for bicycle in bicycles:

        all_ready = all(

            part.stage ==
            "Ready To Dispatch"

            for part in bicycle.parts
        )

        if all_ready:

            ready_to_dispatch_count += 1


    return {

        "procurement":
            procurement_count,

        "assembly":
            assembly_count,

        "testing":
            testing_count,

        "ready_to_dispatch":
            ready_to_dispatch_count
    }
    
@router.get(
    "/ready-bicycles",
    response_model=list[BicycleResponse]
)
def get_ready_bicycles(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return get_ready_bicycles_controller(db)
