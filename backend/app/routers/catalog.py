from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user, require_admin
from app.models.autor import Autor
from app.models.categoria import Categoria
from app.models.editora import Editora
from app.schemas.livro import (
    AutorCreate, AutorResponse,
    CategoriaCreate, CategoriaResponse,
    EditoraCreate, EditoraResponse,
)

router_autores = APIRouter(prefix="/autores", tags=["autores"])
router_categorias = APIRouter(prefix="/categorias", tags=["categorias"])
router_editoras = APIRouter(prefix="/editoras", tags=["editoras"])


# ── AUTORES ────────────────────────────────────────────────

@router_autores.get("/", response_model=list[AutorResponse])
def lista_autores(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return db.query(Autor).order_by(Autor.nome).all()


@router_autores.post("/", response_model=AutorResponse, status_code=201)
def criar_autor(autor: AutorCreate, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    nova = Autor(nome=autor.nome.strip(), biografia=autor.biografia)
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova


@router_autores.put("/{autor_id}", response_model=AutorResponse)
def atualizar_autor(autor_id: int, dados: AutorCreate, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    autor = db.query(Autor).filter(Autor.id == autor_id).first()
    if autor is None:
        raise HTTPException(status_code=404, detail="Autor não encontrado")
    autor.nome = dados.nome.strip()
    autor.biografia = dados.biografia
    db.commit()
    db.refresh(autor)
    return autor


@router_autores.delete("/{autor_id}", status_code=204)
def deletar_autor(autor_id: int, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    autor = db.query(Autor).filter(Autor.id == autor_id).first()
    if autor is None:
        raise HTTPException(status_code=404, detail="Autor não encontrado")
    db.delete(autor)
    db.commit()
    return None


# ── CATEGORIAS ────────────────────────────────────────────

@router_categorias.get("/", response_model=list[CategoriaResponse])
def lista_categorias(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return db.query(Categoria).order_by(Categoria.nome).all()


@router_categorias.post("/", response_model=CategoriaResponse, status_code=201)
def criar_categoria(cat: CategoriaCreate, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    nova = Categoria(nome=cat.nome.strip())
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova


@router_categorias.put("/{cat_id}", response_model=CategoriaResponse)
def atualizar_categoria(cat_id: int, dados: CategoriaCreate, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    cat = db.query(Categoria).filter(Categoria.id == cat_id).first()
    if cat is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    cat.nome = dados.nome.strip()
    db.commit()
    db.refresh(cat)
    return cat


@router_categorias.delete("/{cat_id}", status_code=204)
def deletar_categoria(cat_id: int, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    cat = db.query(Categoria).filter(Categoria.id == cat_id).first()
    if cat is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    db.delete(cat)
    db.commit()
    return None


# ── EDITORAS ──────────────────────────────────────────────

@router_editoras.get("/", response_model=list[EditoraResponse])
def lista_editoras(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return db.query(Editora).order_by(Editora.nome).all()


@router_editoras.post("/", response_model=EditoraResponse, status_code=201)
def criar_editora(ed: EditoraCreate, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    nova = Editora(nome=ed.nome.strip())
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova


@router_editoras.put("/{ed_id}", response_model=EditoraResponse)
def atualizar_editora(ed_id: int, dados: EditoraCreate, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    ed = db.query(Editora).filter(Editora.id == ed_id).first()
    if ed is None:
        raise HTTPException(status_code=404, detail="Editora não encontrada")
    ed.nome = dados.nome.strip()
    db.commit()
    db.refresh(ed)
    return ed


@router_editoras.delete("/{ed_id}", status_code=204)
def deletar_editora(ed_id: int, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    ed = db.query(Editora).filter(Editora.id == ed_id).first()
    if ed is None:
        raise HTTPException(status_code=404, detail="Editora não encontrada")
    db.delete(ed)
    db.commit()
    return None
