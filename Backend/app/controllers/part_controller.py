from sqlalchemy.orm import Session

from app.services.part_service import(
    get_bicycle_parts_service,
    move_part_stage_service,
    update_part_quantity_service
)

def get_bicycle_parts_controller(
        bicycle_id:int,
        db:Session
):
    return get_bicycle_parts_service(
        db,
        bicycle_id
    )

def move_part_stage_controller(
        part_id:int,
        db:Session
):
    return move_part_stage_service(
        db,
        part_id
    )


def update_part_quantity_controller(
        part_id:int,
        quantity:int,
        db:Session
):
    return update_part_quantity_service(
        db,
        part_id,
        quantity
    )
