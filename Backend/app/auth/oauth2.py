from fastapi import(
    Depends,
    HTTPException,
    status
)

from fastapi.security import OAuth2PasswordBearer

from jose import(
    JWTError,
    jwt
)

from app.config import(
    SECRET_KEY,
    ALGORITHM
)

oauth2_schema = OAuth2PasswordBearer(
    tokenUrl="login"
)

def get_current_user(
        token:str = Depends(oauth2_schema)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        
        email = payload.get("sub")

        if email is None:
            raise credentials_exception
        return email
    except JWTError:
        raise credentials_exception