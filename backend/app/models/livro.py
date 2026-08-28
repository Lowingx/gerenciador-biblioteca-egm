from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
from typing import List, Optional
from typing import List, Optional, TYPE_CHECKING
from .base import livro_autor

if TYPE_CHECKING:
    from .autor import Autor
    from .categoria import Categoria
    from .editora import Editora
    from .emprestimo import Emprestimo



class Livro(Base):
    __tablename__ = "livros"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    isbn: Mapped[Optional[str]] = mapped_column(unique=True)
    titulo: Mapped[str] = mapped_column(nullable=False)
    ano_publicacao: Mapped[Optional[int]] = mapped_column()
    quantidade_total: Mapped[int] = mapped_column(default=1, nullable=False)
    quantidade_disponivel: Mapped[int] = mapped_column(default=1, nullable=False)

    categoria_id: Mapped[Optional[int]] = mapped_column(ForeignKey("categorias.id"), nullable=True)
    editora_id: Mapped[Optional[int]] = mapped_column(ForeignKey("editoras.id"), nullable=True)

    categoria: Mapped[Optional["Categoria"]] = relationship("Categoria", back_populates="livros")
    editora: Mapped[Optional["Editora"]] = relationship("Editora", back_populates="livros")
    
    autores: Mapped[List["Autor"]] = relationship(
        "Autor", 
        secondary=livro_autor, 
        back_populates="livros"  
    )

    emprestimos: Mapped[List["Emprestimo"]] = relationship(
        "Emprestimo", back_populates="livro", cascade="all, delete-orphan"
    )