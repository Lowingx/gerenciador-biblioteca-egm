from pydantic import BaseModel, ConfigDict
from typing import Optional


class AutorCreate(BaseModel):
    nome: str
    biografia: Optional[str] = None


class AutorResponse(BaseModel):
    id: int
    nome: str
    biografia: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class CategoriaCreate(BaseModel):
    nome: str


class CategoriaResponse(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class EditoraCreate(BaseModel):
    nome: str


class EditoraResponse(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class LivroCreate(BaseModel):
    titulo: str
    isbn: Optional[str] = None
    ano_publicacao: Optional[int] = None
    quantidade_total: int = 1
    categoria_id: Optional[int] = None
    editora_id: Optional[int] = None
    autores_id: Optional[list[int]] = None


class LivroUpdate(BaseModel):
    titulo: Optional[str] = None
    isbn: Optional[str] = None
    ano_publicacao: Optional[int] = None
    quantidade_total: Optional[int] = None
    categoria_id: Optional[int] = None
    editora_id: Optional[int] = None
    autores_id: Optional[list[int]] = None


class LivroResponse(BaseModel):
    id: int
    titulo: str
    isbn: Optional[str] = None
    ano_publicacao: Optional[int] = None
    quantidade_total: int
    quantidade_disponivel: int
    categoria: Optional[CategoriaResponse] = None
    editora: Optional[EditoraResponse] = None
    autores: Optional[list[AutorResponse]] = None

    model_config = ConfigDict(from_attributes=True)
