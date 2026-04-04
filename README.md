<div align="center">

# ⚙️ GBE Backend API
**Core Engine & Gerenciamento de Dados • GBE Project**

*API RESTful de alta performance, assíncrona e resiliente. O motor de regras de negócio responsável pela integridade e segurança do ecossistema GBE.*

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.49-D71F00?style=for-the-badge)](https://www.sqlalchemy.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Alembic](https://img.shields.io/badge/Migrations-Alembic-6BA531?style=for-the-badge)](https://alembic.sqlalchemy.org/)

</div>

---

## 🏗️ Arquitetura e Engenharia

O backend foi projetado sob o paradigma de **Clean Architecture**, garantindo que a lógica de negócio seja independente de frameworks e drivers externos.

| Componente | Tecnologia | Finalidade Técnica |
| :--- | :--- | :--- |
| **Framework** | FastAPI | I/O não bloqueante e validação de dados via Rust (Pydantic v2). |
| **ORM** | SQLAlchemy | Mapeamento declarativo assíncrono para alta concorrência. |
| **Migrações** | Alembic | Versionamento de esquema e controle de evolução do banco. |
| **Segurança** | JWT & Passlib | Autenticação Stateless e criptografia de senhas (BCrypt). |
| **Servidor** | Uvicorn | Servidor ASGI de baixíssima latência baseado em `uvloop`. |

---

## 📂 Estrutura do Módulo Backend

```text
backend/
├── 📂 alembic/          # Histórico de versões e migrações do banco
├── 📂 app/              # Core da aplicação
│   ├── 📂 api/          # Endpoints e roteamento (v1)
│   ├── 📂 core/         # Configurações globais e segurança (JWT)
│   ├── 📂 crud/         # Lógica de persistência (Service Layer)
│   ├── 📂 models/       # Entidades do SQLAlchemy (Banco de Dados)
│   ├── 📂 schemas/      # DTOs e Contratos Pydantic (Validação)
│   └── 📂 db/           # Session management e engine assíncrona
├── 📄 main.py           # Entrypoint da aplicação FastAPI
├── 📄 alembic.ini       # Configuração do ambiente de migração
└── 📄 requirements.txt  # Manifesto de dependências fixadas
```

---

## 🚀 Setup de Desenvolvimento (Local)

Para rodar o backend fora do Docker (para debug rápido):

### 1. Ambiente Virtual e Dependências
```bash
# Navegar até a pasta
cd backend

# Criar venv
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# Instalar pacotes
pip install -r requirements.txt
```

### 2. Sincronização do Banco
```bash
# Rodar migrações pendentes
alembic upgrade head

# Iniciar servidor em modo hot-reload
uvicorn app.main:app --reload --port 8000
```

> 🔌 **Swagger Docs:** Acesse `http://localhost:8000/docs` para testar os endpoints em tempo real.

---

## 🛡️ Padrões de Segurança e Contratos

> [!IMPORTANT]
> Todas as rotas de escrita (`POST`, `PUT`, `DELETE`) exigem obrigatoriamente o header `Authorization: Bearer <token>`.

### Formato de Resposta Padrão (JSON)
As rotas seguem a especificação de status HTTP correta:
- **201 Created**: Sucesso na criação de recursos (Livros/Alunos).
- **400 Bad Request**: Erro de validação de schema (Pydantic).
- **401 Unauthorized**: Token expirado ou ausente.
- **404 Not Found**: Recurso inexistente no banco.

---

## 📊 Plano de Evolução (Backlog Backend)

- [ ] Implementação de **Inlay Hints** para clareza no desenvolvimento.
- [ ] Otimização de queries para evitar o problema de **N+1 queries**.
- [ ] Middlewares de **Rate Limiting** para segurança local.
- [ ] Logs estruturados em formato JSON para monitoramento Docker.

---

<div align="center">

**GBE Backend - Desenvolvido para Escabilidade e Performance** <br>
Sincronização via Discord: `#github-issues-prs`

</div>

---
<div align="center">
  <sub><strong>GBE Project</strong> • Sistema de Gestão de Bibliotecas Escolar</sub>
</div>
