import os
from fastapi import APIRouter, Depends, HTTPException, Response, Request, BackgroundTasks
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.core.security import (
    SECRET_KEY, ALGORITHM,
    create_access_token, create_refresh_token,
    blacklist_token, is_token_blacklisted,
    limiter, get_current_user,
    cleanup_expired_tokens,
)
from app.core.database import get_db, SessionLocal
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioLogin, UsuarioResponse
import bcrypt

router = APIRouter(tags=["auth"])

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
IS_PRODUCTION = ENVIRONMENT == "production"


def hash_senha(senha: str) -> str:
    return bcrypt.hashpw(senha.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verifica_senha(senha: str, senha_hash: str) -> bool:
    try:
        return bcrypt.checkpw(senha.encode("utf-8"), senha_hash.encode("utf-8"))
    except ValueError:
        return False


def _set_refresh_cookie(response: Response, token: str):
    response.set_cookie(
        key="refresh_token",
        value=token,
        httponly=True,
        secure=IS_PRODUCTION,
        samesite="lax",
        max_age=604800,
    )


def _delete_refresh_cookie(response: Response):
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=IS_PRODUCTION,
        samesite="lax",
    )


@router.get("/me", response_model=UsuarioResponse)
def me(current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    """Retorna o usuário logado pelo RA (matrícula) do token."""
    user = db.query(Usuario).filter(Usuario.ra == current_user).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


@router.post("/registrar", response_model=UsuarioResponse, status_code=201)
@limiter.limit("3/minute")
def registrar(
    request: Request,
    dados: UsuarioCreate,
    db: Session = Depends(get_db),
):
    """Cria um usuário com RA único. Acesso livre para cadastro inicial."""
    if db.query(Usuario).filter(Usuario.ra == dados.ra).first():
        raise HTTPException(status_code=400, detail="RA já cadastrado")
    if db.query(Usuario).filter(Usuario.email == dados.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    novo = Usuario(
        ra=dados.ra,
        nome=dados.nome,
        email=dados.email,
        senha_hash=hash_senha(dados.senha),
        is_admin=False,
    )
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


@router.post("/login")
@limiter.limit("5/minute")
def login(
    request: Request,
    dados: UsuarioLogin,
    response: Response,
    db: Session = Depends(get_db),
):
    user = db.query(Usuario).filter(Usuario.ra == dados.ra).first()
    if user is None or not verifica_senha(dados.senha, user.senha_hash):
        raise HTTPException(status_code=401, detail="RA ou senha incorretos")

    access_token = create_access_token({"sub": user.ra})
    refresh_token = create_refresh_token({"sub": user.ra})
    _set_refresh_cookie(response, refresh_token)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "usuario": {
            "id": user.id,
            "ra": user.ra,
            "nome": user.nome,
            "email": user.email,
            "is_admin": user.is_admin,
        },
    }


@router.post("/refresh")
@limiter.limit("5/minute")
def refresh(
    request: Request,
    response: Response,
    background_tasks: BackgroundTasks,
):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token não encontrado")
    db = SessionLocal()
    try:
        if is_token_blacklisted(db, refresh_token):
            raise HTTPException(status_code=401, detail="Refresh token inválido")
        try:
            payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
            matricula = payload.get("sub")
        except JWTError:
            raise HTTPException(status_code=401, detail="Refresh token expirado ou inválido")

        blacklist_token(db, refresh_token)
        background_tasks.add_task(cleanup_expired_tokens, db)

        access_token = create_access_token({"sub": matricula})
        new_refresh = create_refresh_token({"sub": matricula})
        _set_refresh_cookie(response, new_refresh)
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        db.close()
        raise
    except Exception:
        db.close()
        raise


@router.post("/logout")
def logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    refresh_token = request.cookies.get("refresh_token")
    if refresh_token:
        blacklist_token(db, refresh_token)
    _delete_refresh_cookie(response)
    return {"message": "Logout realizado"}
