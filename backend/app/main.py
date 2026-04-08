# ────────────────────────────────────────────────────────────
# - Responsável por inicializar a API, definir rotas
# ────────────────────────────────────────────────────────────

from fastapi import FastAPI
from app.routers.livros import router as livros_router

app = FastAPI(title="GBE - Gerenciador de Biblioteca Escolar")

