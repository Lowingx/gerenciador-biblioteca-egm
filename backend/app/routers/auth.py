import os
from fastapi import APIRouter, Depends, HTTPException, Response, Request, BackgroundTasks
from slowapi.errors import RateLimitExceeded
from sqlalchemy.orm import Session
from app.core.security import create_access_token, create_refresh_token, blacklist_token, is_token_blacklisted, limiter, get_current_user, cleanup_expired_tokens
from app.core.database import get_db
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioLogin, UsuarioResponse
import bcrypt
from jose import jwt, JWTError

router = APIRouter(tags=["auth"])


def hash_senha(senha: str) -> str:
    return bcrypt.hashpw(senha.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verifica_senha(senha: str, senha_hash: str) -> bool:
    try:
        return bcrypt.checkpw(senha.encode("utf-8"), senha_hash.encode("utf-8"))
    except ValueError:
        return False


@router.get("/me", response_model=UsuarioResponse)
def me(current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    """Retorna o usuário logado pelo RA (matrícula) do token."""
    user = db.query(Usuario).filter(Usuario.ra == current_user).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


@router.post("/registrar", response_model=UsuarioResponse, status_code=201)
def registrar(dados: UsuarioCreate, db: Session = Depends(get_db)):
    """Cria um usuário com RA único. Acesso livre (bibliotecário cria contas)."""
    if db.query(Usuario).filter(Usuario.ra == dados.ra).first():
        raise HTTPException(status_code=400, detail="RA já cadastrado")
    if db.query(Usuario).filter(Usuario.email == dados.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    novo = Usuario(
        ra=dados.ra,
        nome=dados.nome,
        email=dados.email,
        senha_hash=hash_senha(dados.senha),
        is_admin=dados.is_admin,
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
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  # dev (https em produção)
        samesite="lax",
        max_age=604800
    )
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
def refresh(request: Request, response: Response, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token or is_token_blacklisted(db, refresh_token):
        raise HTTPException(status_code=401, detail="Refresh token inválido")
    SECRET_KEY = os.getenv("SECRET_KEY", "chave_secreta_fallback_dev")
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=["HS256"])
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
        secure=False,
        samesite="lax",
        max_age=604800
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
def logout(response: Response, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    response.delete_cookie("refresh_token")
    return {"message": "Logout realizado"}
