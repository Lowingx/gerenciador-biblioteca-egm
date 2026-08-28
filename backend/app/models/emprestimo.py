from sqlalchemy import String, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timedelta, timezone
from typing import Optional, TYPE_CHECKING
from .base import Base

if TYPE_CHECKING:
    from .livro import Livro
    from .usuario import Usuario


def _agora():
    """Datetime naive em UTC (sqlite não preserva timezone)."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


class Emprestimo(Base):
    __tablename__ = "emprestimos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    livro_id: Mapped[int] = mapped_column(ForeignKey("livros.id"), nullable=False)
    usuario_id: Mapped[Optional[int]] = mapped_column(ForeignKey("usuarios.id"), nullable=True)
    matricula: Mapped[str] = mapped_column(String, nullable=False)

    data_emprestimo: Mapped[datetime] = mapped_column(nullable=False, default=_agora)
    data_devolucao_prevista: Mapped[datetime] = mapped_column(nullable=False)
    data_devolucao_real: Mapped[Optional[datetime]] = mapped_column(nullable=True)

    status: Mapped[str] = mapped_column(String, default="ativo", nullable=False)  # ativo | devolvido | atrasado

    livro: Mapped["Livro"] = relationship("Livro", back_populates="emprestimos")
    usuario: Mapped["Usuario"] = relationship("Usuario")

    @property
    def em_atraso(self) -> bool:
        if self.status == "devolvido":
            return False
        return _agora() > self.data_devolucao_prevista

    @property
    def multa_corrente(self) -> float:
        """R$ 0,50 por dia de atraso em relação à data prevista ou real."""
        if self.status == "devolvido":
            ref = self.data_devolucao_real or _agora()
        else:
            ref = _agora()
        if ref <= self.data_devolucao_prevista:
            return 0.0
        dias = (ref - self.data_devolucao_prevista).days
        return max(0.0, dias * 0.50)
