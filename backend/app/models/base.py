from sqlalchemy import Column, Integer, ForeignKey, Table
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

# Mova para cá! Assim ela fica disponível para todo o projeto
livro_autor = Table(
    "livro_autor",
    Base.metadata,
    Column("livro_id", Integer, ForeignKey("livros.id"), primary_key=True),
    Column("autor_id", Integer, ForeignKey("autores.id"), primary_key=True)
)