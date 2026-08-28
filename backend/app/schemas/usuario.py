from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional


class UsuarioCreate(BaseModel):
    ra: str
    nome: str
    email: EmailStr
    senha: str
    is_admin: Optional[bool] = False


class UsuarioLogin(BaseModel):
    ra: str
    senha: str


class UsuarioResponse(BaseModel):
    id: int
    ra: str
    nome: str
    email: EmailStr
    is_admin: bool

    model_config = ConfigDict(from_attributes=True)
