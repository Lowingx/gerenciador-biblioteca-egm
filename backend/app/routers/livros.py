from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.livro import Livro
from app.models.autor import Autor
from app.models.categoria import Categoria
from app.models.editora import Editora
from app.schemas.livro import LivroCreate, LivroUpdate, LivroResponse

router = APIRouter(prefix="/livros", tags=["livros"])


def _get_or_create(db: Session, model, nome: str):
    """Busca por nome (case-insensitive) ou cria entidade."""
    inst = db.query(model).filter(model.nome.ilike(nome.strip())).first()
    if inst is None:
        inst = model(nome=nome.strip())
        db.add(inst)
        db.flush()
    return inst


@router.get("/", response_model=List[LivroResponse])
def lista_livros(
    q: str = Query(None, description="Busca por título"),
    db: Session = Depends(get_db),
    _: str = Depends(get_current_user),
):
    stmt = select(Livro).options(
        selectinload(Livro.categoria),
        selectinload(Livro.editora),
        selectinload(Livro.autores),
    ).order_by(Livro.titulo)
    if q:
        stmt = stmt.where(Livro.titulo.ilike(f"%{q.strip()}%"))
    livros = db.execute(stmt).scalars().all()
    return livros


@router.get("/{livro_id}", response_model=LivroResponse)
def get_livro(
    livro_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_user),
):
    stmt = select(Livro).options(
        selectinload(Livro.categoria),
        selectinload(Livro.editora),
        selectinload(Livro.autores),
    ).where(Livro.id == livro_id)
    livro = db.execute(stmt).scalar_one_or_none()
    if livro is None:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return livro


@router.post("/", response_model=LivroResponse, status_code=201)
def criar_livro(
    livro: LivroCreate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_user),
):
    categoria = None
    if livro.categoria_id:
        categoria = db.query(Categoria).filter(Categoria.id == livro.categoria_id).first()
    editora = None
    if livro.editora_id:
        editora = db.query(Editora).filter(Editora.id == livro.editora_id).first()

    nova = Livro(
        titulo=livro.titulo.strip(),
        isbn=livro.isbn,
        ano_publicacao=livro.ano_publicacao,
        quantidade_total=livro.quantidade_total,
        quantidade_disponivel=livro.quantidade_total,
        categoria_id=categoria.id if categoria else None,
        editora_id=editora.id if editora else None,
    )
    db.add(nova)
    db.flush()

    lista_autores = []
    if livro.autores_id:
        lista_autores = db.query(Autor).filter(Autor.id.in_(livro.autores_id)).all()
    nova.autores = lista_autores

    db.commit()
    db.refresh(nova)
    return nova


@router.put("/{livro_id}", response_model=LivroResponse)
def atualizar_livro(
    livro_id: int,
    dados: LivroUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_user),
):
    livro = db.query(Livro).filter(Livro.id == livro_id).first()
    if livro is None:
        raise HTTPException(status_code=404, detail="Livro não encontrado")

    if dados.titulo is not None:
        livro.titulo = dados.titulo.strip()
    if dados.isbn is not None:
        livro.isbn = dados.isbn
    if dados.ano_publicacao is not None:
        livro.ano_publicacao = dados.ano_publicacao
    if dados.quantidade_total is not None:
        livro.quantidade_total = dados.quantidade_total
    if dados.categoria_id is not None:
        livro.categoria_id = dados.categoria_id
    if dados.editora_id is not None:
        livro.editora_id = dados.editora_id
    if dados.autores_id is not None:
        livro.autores = [a for a in db.query(Autor).filter(Autor.id.in_(dados.autores_id)).all()]

    db.commit()
    db.refresh(livro)
    return livro


@router.delete("/{livro_id}", status_code=204)
def deletar_livro(
    livro_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_user),
):
    livro = db.query(Livro).filter(Livro.id == livro_id).first()
    if livro is None:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    db.delete(livro)
    db.commit()
    return None
