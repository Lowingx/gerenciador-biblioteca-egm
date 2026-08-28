# ────────────────────────────────────────────────────────────
# - Banco de dados configurável (sqlite dev / postgres prod)
# - A URL vem de DATABASE_URL no .env; fallback para sqlite local
# ────────────────────────────────────────────────────────────

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.models.base import Base

# URL configurável: postgres em produção, sqlite em desenvolvimento
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./biblioteca.db"
)

# sqlite precisa de connect_args adicionais
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """Cria as tabelas (útil em dev; em prod usar alembic)."""
    from app import models  # noqa: F401  importa todos os models
    Base.metadata.create_all(bind=engine)


def get_db():
    """Dependency do FastAPI para injeção de sessão."""
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
