from pydantic import BaseModel, ConfigDict
from typing import Optional

class LivroCreate(BaseModel):
    titulo: str 
    autor: str 
    isbn: Optional[str] = None
    ano_publicacao: Optional[int] = None
    editora: Optional[str] = None
    categoria: Optional[str] = None
    quantidade_total: int = 1

class LivroResponse(BaseModel):
    id: int
    titulo: str
    autor: str
    ano_publicacao: Optional[int] = None
    editora: Optional[str] = None
    categoria: Optional[str] = None
    quantidade_total: int
    quantidade_disponivel: int 

    model_config = ConfigDict(from_attributes=True)