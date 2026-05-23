from fastapi import(
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.user_schema import(
    UserRegister,
)

from app.controllers.user_controller import(
    register_user_controller,
    login_user_controller
)

from fastapi.security import(
    OAuth2PasswordRequestForm
)

router = APIRouter(
    tags=["Authentication"]
)

@router.post("/register")
def register_user(
    request:UserRegister,
    db: Session = Depends(get_db)
):
    return register_user_controller(
        request.email,
        request.password,
        db
    )

@router.post("/login")
def login_user(
    request: OAuth2PasswordRequestForm = Depends(),
    db:Session = Depends(get_db)
):
    return login_user_controller(
        request.username,
        request.password,
        db
    )