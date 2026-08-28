import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.database import init_db
from app.routers.livros import router as livros_router
from app.routers.catalog import router_autores, router_categorias, router_editoras
from app.routers.emprestimos import router as emprestimos_router
from app.routers.auth import router as auth_router

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="GBE - Gerenciador de Biblioteca Escolar",
    description="API REST para gestão de acervo, usuários, empréstimos e devoluções",
    version="1.0.0",
    docs_url="/docs" if ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if ENVIRONMENT != "production" else None,
    openapi_url="/openapi.json" if ENVIRONMENT != "production" else None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/")
def read_root():
    return {"message": "GBE API is running"}


app.include_router(auth_router)
app.include_router(livros_router)
app.include_router(router_autores)
app.include_router(router_categorias)
app.include_router(router_editoras)
app.include_router(emprestimos_router)
