from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
from typing import List
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .livro import Livro

class Categoria(Base):
    __tablename__ = "categorias"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(nullable=False, unique=True)

    livros: Mapped[List["Livro"]] = relationship("Livro", back_populates="categoria")