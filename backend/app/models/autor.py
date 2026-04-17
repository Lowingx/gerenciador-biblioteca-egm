from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
from typing import List, Optional
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .livro import Livro

class Autor(Base):
    __tablename__ = "autores"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(nullable=False, index=True)
    biografia: Mapped[Optional[str]] = mapped_column(nullable=True)

    # Relacionamento Many-to-Many
    livros: Mapped[List["Livro"]] = relationship(
        "Livro", 
        secondary="livro_autor", # Referência por string evita erro de importação
        back_populates="autores"
    )