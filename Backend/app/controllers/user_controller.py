from sqlalchemy.orm import Session

from app.services.user_service import(
    register_user_service,
    login_user_service
)

def register_user_controller(
        email:str,
        password:str,
        db:Session
):
    return register_user_service(
        db,
        email,
        password
    )

def login_user_controller(
        email:str,
        password:str,
        db:Session
):
    return login_user_service(
        db,
        email,
        password
    )

