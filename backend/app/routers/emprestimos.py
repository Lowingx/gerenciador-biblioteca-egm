from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload
from datetime import datetime, timedelta, timezone

from app.core.database import get_db
from app.core.security import get_current_user, require_admin
from app.models.livro import Livro
from app.models.usuario import Usuario
from app.models.emprestimo import Emprestimo
from app.schemas.emprestimo import EmprestimoCreate, EmprestimoResponse, EmprestimoDevolucao

router = APIRouter(prefix="/emprestimos", tags=["emprestimos"])

DIAS_PADRAO = 14


def _to_response(e: Emprestimo) -> EmprestimoResponse:
    return EmprestimoResponse(
        id=e.id,
        livro_id=e.livro_id,
        usuario_id=e.usuario_id,
        matricula=e.matricula,
        data_emprestimo=e.data_emprestimo,
        data_devolucao_prevista=e.data_devolucao_prevista,
        data_devolucao_real=e.data_devolucao_real,
        status=e.status,
        multa=round(e.multa_corrente, 2),
        titulo_livro=e.livro.titulo if e.livro else None,
    )


@router.get("/", response_model=list[EmprestimoResponse])
def lista_emprestimos(
    status: str = None,
    db: Session = Depends(get_db),
    matricula: str = Depends(get_current_user),
):
    user = db.query(Usuario).filter(Usuario.ra == matricula).first()
    q = db.query(Emprestimo).options(selectinload(Emprestimo.livro)).order_by(Emprestimo.data_emprestimo.desc())
    if user and not user.is_admin:
        q = q.filter(Emprestimo.matricula == matricula)
    if status:
        q = q.filter(Emprestimo.status == status)
    return [_to_response(e) for e in q.all()]


@router.post("/", response_model=EmprestimoResponse, status_code=201)
def criar_emprestimo(
    dados: EmprestimoCreate,
    db: Session = Depends(get_db),
    matricula: str = Depends(get_current_user),
):
    livro = db.query(Livro).filter(Livro.id == dados.livro_id).first()
    if livro is None:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    if livro.quantidade_disponivel <= 0:
        raise HTTPException(status_code=400, detail="Nenhuma cópia disponível para empréstimo")

    usuario = None
    if dados.usuario_id:
        usuario = db.query(Usuario).filter(Usuario.id == dados.usuario_id).first()
        if usuario is None:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

    now = datetime.now(timezone.utc).replace(tzinfo=None)
    novo = Emprestimo(
        livro_id=livro.id,
        usuario_id=usuario.id if usuario else None,
        matricula=matricula,
        data_emprestimo=now,
        data_devolucao_prevista=now + timedelta(days=DIAS_PADRAO),
        status="ativo",
    )
    livro.quantidade_disponivel -= 1
    db.add(novo)
    db.commit()
    db.refresh(novo)
    db.refresh(livro)
    return _to_response(novo)


@router.post("/{emprestimo_id}/devolver", response_model=EmprestimoResponse)
def devolver_emprestimo(
    emprestimo_id: int,
    db: Session = Depends(get_db),
    matricula: str = Depends(get_current_user),
):
    e = db.query(Emprestimo).options(selectinload(Emprestimo.livro)).filter(Emprestimo.id == emprestimo_id).first()
    if e is None:
        raise HTTPException(status_code=404, detail="Empréstimo não encontrado")
    if e.matricula != matricula:
        raise HTTPException(status_code=403, detail="Sem permissão para devolver este empréstimo")
    if e.status == "devolvido":
        raise HTTPException(status_code=400, detail="Empréstimo já devolvido")

    e.data_devolucao_real = datetime.now(timezone.utc).replace(tzinfo=None)
    e.status = "devolvido"

    livro = db.query(Livro).filter(Livro.id == e.livro_id).first()
    if livro and livro.quantidade_disponivel < livro.quantidade_total:
        livro.quantidade_disponivel += 1

    db.commit()
    db.refresh(e)
    return _to_response(e)


@router.delete("/{emprestimo_id}", status_code=204)
def deletar_emprestimo(
    emprestimo_id: int,
    db: Session = Depends(get_db),
    matricula: str = Depends(get_current_user),
):
    user = db.query(Usuario).filter(Usuario.ra == matricula).first()
    e = db.query(Emprestimo).filter(Emprestimo.id == emprestimo_id).first()
    if e is None:
        raise HTTPException(status_code=404, detail="Empréstimo não encontrado")
    if not user.is_admin and e.matricula != matricula:
        raise HTTPException(status_code=403, detail="Sem permissão para deletar este empréstimo")
    if e.status != "devolvido":
        livro = db.query(Livro).filter(Livro.id == e.livro_id).first()
        if livro and livro.quantidade_disponivel < livro.quantidade_total:
            livro.quantidade_disponivel += 1
    db.delete(e)
    db.commit()
    return None
