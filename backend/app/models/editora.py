from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
from typing import List
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .livro import Livro
  

class Editora(Base):
    __tablename__ = "editoras"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(nullable=False, unique=True)

    livros: Mapped[List["Livro"]] = relationship("Livro", back_populates="editora")