# Backend - EGM Lib (REST API)

API assíncrona para gestão de acervo, autenticação JWT e processamento de telemetria IoT.

## 💻 Tech Stack
* **Language:** [Python 3.10+](https://www.python.org/)
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
* **ASGI Server:** [Uvicorn](https://www.uvicorn.org/)
* **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (Prod) / [SQLite](https://www.sqlite.org/) (Dev)
* **Validation:** [Pydantic](https://docs.pydantic.dev/)

## 📂 Estrutura de Arquivos
* `main.py`: Entry point e definições de rotas.
* `models.py`: Esquemas das tabelas do banco de dados.
* `schemas.py`: Modelos Pydantic para validação de dados.
* `database.py`: Configuração da engine e SessionLocal.

## 🚀 Instalação e Execução
1. Ativar ambiente virtual:
   `source venv/bin/activate` (Linux/Mac) ou `.\venv\Scripts\activate` (Windows)
2. Instalar dependências:
   `pip install -r requirements.txt`
3. Rodar servidor:
   `uvicorn main:app --reload`

---
Documentação Swagger disponível em `/docs` após o boot.
