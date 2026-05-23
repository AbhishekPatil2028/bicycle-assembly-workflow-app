from sqlalchemy.orm import Session

from fastapi import(
    HTTPException,
    status
)

from app.models.user import User

from app.auth.hash import(
    hash_password,
    verify_password
)

from app.auth.jwt_handler import(
    create_access_token
)

def register_user_service(
        db:Session,
        email:str,
        password:str
):
    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    hashed_password = hash_password(password)

    new_user  = User(
        email=email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return{
        "message":"User registered Successfully"
    }


def login_user_service(
        db:Session,
        email:str,
        password:str
):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    if not verify_password(
        password,
        user.password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Password"
        )
    access_token = create_access_token({
        "sub":user.email
    })

    return{
        "access_token":access_token,
        "token_type":"bearer"
    }