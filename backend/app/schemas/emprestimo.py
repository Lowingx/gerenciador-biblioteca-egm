from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class EmprestimoCreate(BaseModel):
    livro_id: int
    matricula: str
    usuario_id: Optional[int] = None


class EmprestimoResponse(BaseModel):
    id: int
    livro_id: int
    usuario_id: Optional[int] = None
    matricula: str
    data_emprestimo: datetime
    data_devolucao_prevista: datetime
    data_devolucao_real: Optional[datetime] = None
    status: str
    multa: Optional[float] = None
    titulo_livro: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class EmprestimoDevolucao(BaseModel):
    data_devolucao_real: Optional[datetime] = None
