from fastapi import(
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.part_schema import(
    PartResponse,
    UpdateQuantityRequest
)

from app.controllers.part_controller import(
    get_bicycle_parts_controller,
    move_part_stage_controller,
    update_part_quantity_controller
)

router = APIRouter(
    tags=["Bicycle Parts"]
)

@router.get(
    "/bicycles/{bicycle_id}/parts",
    response_model=list[PartResponse]
)
def get_bicycle_parts(
    bicycle_id:int,
    db:Session = Depends(get_db)
):
    return get_bicycle_parts_controller(
        bicycle_id,
        db
    )


@router.put(
    "/parts/{part_id}/move-stage",
    response_model=PartResponse
)
def move_part_stage(
    part_id:int,
    db:Session = Depends(get_db)
):
    return move_part_stage_controller(
        part_id,
        db
    )

@router.put(
    "/parts/{part_id}/quantity",
    response_model=PartResponse
)
def update_part_quantity(
    part_id:int,
    request:UpdateQuantityRequest,
    db:Session = Depends(get_db)

):
    return update_part_quantity_controller(
        part_id,
        request.quantity,
        db
    )