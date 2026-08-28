from pydantic import BaseModel, ConfigDict, Field
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
    titulo: str = Field(min_length=1)
    isbn: Optional[str] = None
    ano_publicacao: Optional[int] = None
    quantidade_total: int = Field(default=1, ge=1)
    categoria_id: Optional[int] = None
    editora_id: Optional[int] = None
    autores_id: Optional[list[int]] = None

    model_config = {"json_schema_extra": {"examples": [{"quantidade_total": 1}]}}


class LivroUpdate(BaseModel):
    titulo: Optional[str] = Field(default=None, min_length=1)
    isbn: Optional[str] = None
    ano_publicacao: Optional[int] = None
    quantidade_total: Optional[int] = Field(default=None, ge=1)
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
