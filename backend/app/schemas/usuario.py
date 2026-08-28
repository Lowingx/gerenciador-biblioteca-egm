from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing import Optional


class UsuarioCreate(BaseModel):
    ra: str = Field(min_length=1)
    nome: str = Field(min_length=1)
    email: EmailStr
    senha: str = Field(min_length=6)


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
