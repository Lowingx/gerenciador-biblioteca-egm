from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GBE - Gerenciador de Biblioteca Escolar",
    description="API REST para gestão de acervo, usuários, empréstimos e devoluções",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    openapi_tags=[
        {"name": "livros", "description": "Operações com livros"},
        {"name": "usuarios", "description": "Operações com usuários"},
        {"name": "emprestimos", "description": "Empréstimos e devoluções"}
    ]
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
