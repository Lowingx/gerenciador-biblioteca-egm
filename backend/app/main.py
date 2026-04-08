# ────────────────────────────────────────────────────────────
# - Responsável por inicializar a API, definir rotas
# ────────────────────────────────────────────────────────────

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.livros import router as livros_router

app = FastAPI(
    title="GBE - Gerenciador de Biblioteca Escolar",
    description="API REST para gestão de acervo, usuários, empréstimos e devoluções",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "GBE API is running"}

app.include_router(livros_router)