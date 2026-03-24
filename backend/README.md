# Backend - EGM Lib (REST API)

API assíncrona para gestão de acervo, autenticação JWT e processamento de telemetria IoT (Ruído).

## 💻 Tech Stack
* **Language:** [Python 3.10+](https://www.python.org/)
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
* **ASGI Server:** [Uvicorn](https://www.uvicorn.org/)
* **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (Produção) / [SQLite](https://www.sqlite.org/) (Desenvolvimento)
* **Validation:** [Pydantic](https://docs.pydantic.dev/)
* **Auth:** [PyJWT](https://pyjwt.readthedocs.io/)

## 📂 Estrutura de Arquivos
* `main.py`: Ponto de entrada e definição das rotas (Endpoints).
* `models.py`: Definição das classes do banco de dados (Tabelas).
* `schemas.py`: Modelos de dados para validação de entrada/saída (DTOs).
* `database.py`: Configuração da conexão e criação da sessão do DB.
* `auth.py`: Lógica de criptografia de senhas e geração de tokens.

## 🚀 Instalação e Execução

1. **Criar Ambiente Virtual (VENV):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: .\venv\Scripts\activate
   ```

2. **Instalar Dependências:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Subir Servidor (Hot-Reload):**
   ```bash
   uvicorn main:app --reload
   ```

---
**Nota:** A documentação automática da API (Swagger) estará disponível em `http://localhost:8000/docs` após o servidor iniciar.
