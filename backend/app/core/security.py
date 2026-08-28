import os
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.token_blacklist import TokenBlacklist

limiter = Limiter(key_func=get_remote_address)
_SECRET_KEY = os.getenv("SECRET_KEY")
if not _SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY environment variable must be set. "
        "Generate one with: python -c \"import secrets; print(secrets.token_urlsafe(64))\""
    )
SECRET_KEY = _SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def blacklist_token(db: Session, token: str):
    expires_at = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    db_token = TokenBlacklist(token=token, expires_at=expires_at)
    db.add(db_token)
    db.commit()


def is_token_blacklisted(db: Session, token: str):
    return db.query(TokenBlacklist).filter(TokenBlacklist.token == token).first() is not None


def cleanup_expired_tokens(db: Session):
    db.query(TokenBlacklist).filter(TokenBlacklist.expires_at < datetime.now(timezone.utc)).delete()
    db.commit()


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        matricula: str = payload.get("sub")
        if matricula is None or is_token_blacklisted(db, token):
            raise HTTPException(status_code=401, detail="Token inválido ou revogado")
        return matricula
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")


def _get_user_obj(db: Session, matricula: str):
    from app.models.usuario import Usuario
    user = db.query(Usuario).filter(Usuario.ra == matricula).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user


def require_admin(matricula: str = Depends(get_current_user), db: Session = Depends(get_db)):
    user = _get_user_obj(db, matricula)
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Acesso restrito a administradores")
    return matricula
