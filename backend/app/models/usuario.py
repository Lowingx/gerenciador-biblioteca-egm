from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    ra: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    nome: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    senha_hash: Mapped[str] = mapped_column(String, nullable=False)
    is_admin: Mapped[bool] = mapped_column(default=False, nullable=False)
