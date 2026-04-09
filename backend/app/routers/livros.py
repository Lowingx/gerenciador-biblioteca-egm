from fastapi import APIRouter
from typing import List
from app.schemas.livro import LivroCreate, LivroResponse

router = APIRouter(prefix="/livros", tags=["livros"])

livros_db: List[dict] = []

@router.get("/", response_model=List[LivroResponse])
def lista_livros():
    return livros_db

@router.post("/", response_model=LivroResponse)
def criar_livro(livro = LivroCreate):
    novo_livro = livro.model_dump()
    novo_livro["id"] = len(livros_db) + 1
    novo_livro["quantidade_disponivel"] = novo_livro["quantidade_total"]
    livros_db.append(novo_livro)
    return novo_livro
