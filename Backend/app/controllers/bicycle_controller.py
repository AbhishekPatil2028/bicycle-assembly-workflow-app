from sqlalchemy.orm import Session

from app.services.bicycle_service import (
    create_bicycle_service,
    get_all_bicycles_service,
    get_single_bicycle_service,
    update_bicycle_service,
    delete_bicycle_service
)


def create_bicycle_controller(
    bicycle,
    db: Session
):

    return create_bicycle_service(
        db,
        bicycle.name
    )


def get_all_bicycles_controller(
    db: Session
):

    return get_all_bicycles_service(db)


def get_single_bicycle_controller(
        bicycle_id: int,
        db: Session
):
    return get_single_bicycle_service(
        db,
        bicycle_id
    )

def update_bicycle_controller(
        bicycle_id: int,
        bicycle,
        db: Session
):
    return update_bicycle_service(
        db,
        bicycle_id,
        bicycle.name
    )

def delete_bicycle_controller(
        bicycle_id: int,
        db: Session
):
    return delete_bicycle_service(
        db,
        bicycle_id
    )

