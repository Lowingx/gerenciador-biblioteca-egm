from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import func
from datetime import datetime, timedelta, timezone

from app.core.database import get_db
from app.core.security import get_current_user, require_admin
from app.models.livro import Livro
from app.models.usuario import Usuario
from app.models.emprestimo import Emprestimo
from app.schemas.emprestimo import EmprestimoCreate, EmprestimoResponse, EmprestimoDevolucao

router = APIRouter(prefix="/emprestimos", tags=["emprestimos"])

DIAS_PADRAO = 14
LIMITE_EMPRESTIMOS = 3
VALOR_MULTA_DIA = 0.50


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

    # PB-06c: Check user doesn't have unpaid fines
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    emprestimos_usuario = db.query(Emprestimo).filter(
        Emprestimo.matricula == matricula,
        Emprestimo.status == "ativo",
    ).all()
    multa_total = sum(e.multa_corrente for e in emprestimos_usuario)
    if multa_total > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Usuário possui multa pendente de R${multa_total:.2f}.Quite as multas antes de realizar novo empréstimo.",
        )

    # Check loan limit
    emprestimos_ativos = len(emprestimos_usuario)
    if emprestimos_ativos >= LIMITE_EMPRESTIMOS:
        raise HTTPException(
            status_code=400,
            detail=f"Limite de {LIMITE_EMPRESTIMOS} empréstimos simultâneos atingido.",
        )

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


@router.get("/estatisticas")
def estatisticas(
    db: Session = Depends(get_db),
    matricula: str = Depends(get_current_user),
):
    """Retorna estatísticas gerais para o dashboard."""
    from app.models.livro import Livro
    total_livros = db.query(func.coalesce(func.sum(Livro.quantidade_total), 0)).scalar()
    total_disponivel = db.query(func.coalesce(func.sum(Livro.quantidade_disponivel), 0)).scalar()
    emprestados = int(total_livros) - int(total_disponivel)

    ativos = db.query(Emprestimo).filter(Emprestimo.status == "ativo").all()
    atrasados = [e for e in ativos if e.em_atraso]
    multa_total = sum(e.multa_corrente for e in ativos)

    return {
        "total_acervo": int(total_livros),
        "disponiveis": int(total_disponivel),
        "emprestados": emprestados,
        "ativos_count": len(ativos),
        "atrasados_count": len(atrasados),
        "multa_total": round(multa_total, 2),
    }
