from pydantic import BaseModel, ConfigDict
from typing import Optional

# ────────────────────────────────────────────────────────────
# - Schema usado para validar os dados enviados na criação de um livro
# ────────────────────────────────────────────────────────────

class LivroCreate(BaseModel):
    titulo: str 
    autor: str 
    isbn: Optional[str] = None
    ano_publicacao: Optional[int] 
    editora: Optional[str] = None
    categoria: Optional[str] = None
    quantidade_total: int = 1
    
# ────────────────────────────────────────────────────────────        
# - Schema de entrada: define e valida os dados enviados pelo cliente
# ────────────────────────────────────────────────────────────

class LivroResponse(BaseModel):
    id: int
    titulo: str
    autor: str
    ano_publicacao: Optional[int] 
    editora: Optional[str]
    categoria: Optional[str]
    quantidade_total: int
    quantidade_disponivel: int 

    model_config = ConfigDict(from_attributes=True)