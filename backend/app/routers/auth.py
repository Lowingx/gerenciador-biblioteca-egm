import os
from fastapi import APIRouter, Depends, HTTPException, Response, Request, BackgroundTasks
from slowapi.errors import RateLimitExceeded
from sqlalchemy.orm import Session
from app.core.security import create_access_token, create_refresh_token, blacklist_token, is_token_blacklisted, limiter, get_current_user, cleanup_expired_tokens
from app.core.database import get_db
from passlib.context import CryptContext
from jose import JWTError

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
@limiter.limit("5/minute")
def login(request: Request, matricula: str, senha: str, response: Response, db: Session = Depends(get_db)):
    access_token = create_access_token({"sub": matricula})
    refresh_token = create_refresh_token({"sub": matricula})
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=604800
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/refresh")
@limiter.limit("5/minute")
def refresh(request: Request, response: Response, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token or is_token_blacklisted(db, refresh_token):
        raise HTTPException(status_code=401, detail="Refresh token inválido")
    try:
        payload = jwt.decode(refresh_token, os.getenv("SECRET_KEY", "chave_secreta_fallback_dev"), algorithms=["HS256"])
        matricula = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Refresh token expirado ou inválido")
    
    blacklist_token(db, refresh_token)
    background_tasks.add_task(cleanup_expired_tokens, db)
    
    access_token = create_access_token({"sub": matricula})
    new_refresh = create_refresh_token({"sub": matricula})
    response.set_cookie(
        key="refresh_token",
        value=new_refresh,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=604800
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
def logout(response: Response, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    response.delete_cookie("refresh_token")
    return {"message": "Logout realizado"}
