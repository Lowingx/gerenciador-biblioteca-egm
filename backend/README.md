<div align="center">

# ⚙️ GBE Backend API
**Gerenciador de Biblioteca Escolar • High-Performance Core**

[![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI_0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy_2.0+-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

*API RESTful assíncrona, leve e blindada. Otimizada para Kiosk Mode em hardware limitado.*

</div>

---

## 🎯 Engenharia e Missão
O backend do GBE foi projetado sob o paradigma de **Arquitetura Limpa**, focado em atomicidade e integridade. A missão é garantir que o sistema de gestão escolar opere com latência mínima, mesmo em tablets de baixa configuração (~2GB RAM).

### Diferenciais de Performance:
- ⚡ **Async/Await Nativo:** I/O não bloqueante para lidar com múltiplas requisições simultâneas.
- 📉 **Low Memory Footprint:** Gerenciamento eficiente de sessões de banco para evitar vazamentos de memória.
- 🔐 **JWT Stateless:** Autenticação via tokens, reduzindo consultas repetitivas ao banco de dados.
- 📦 **Pydantic V2:** Validação de dados processada em Rust para velocidade máxima.

---

## 🛠️ Stack Tecnológica

| Componente | Tecnologia | Justificativa de Performance |
| :--- | :--- | :--- |
| **Linguagem** | Python 3.11+ | Uso de *Type Hinting* para redução de erros em runtime. |
| **Framework** | FastAPI | O framework Python mais rápido da atualidade (benchmark Starlette). |
| **Servidor** | Uvicorn | Servidor ASGI de baixíssima latência baseado em `uvloop`. |
| **ORM** | SQLAlchemy 2.0 | Mapeamento assíncrono para evitar gargalos em consultas complexas. |
| **Database** | SQLite/Postgres | Portabilidade total: do banco local ultra-leve ao robusto. |

---

## 🛣️ API Reference (Principais Endpoints)

Documentação completa e testável disponível em: `http://localhost:8000/docs`

| Método | Endpoint | Função | Payload Exemplo |
| :---: | :--- | :--- | :--- |
| `POST` | `/auth/login` | Geração de Token JWT | `{"ra": "123", "senha": "..."}` |
| `GET` | `/books` | Catálogo com busca otimizada | `?q=Harry&limit=10` |
| `POST` | `/loans` | Registro de empréstimo (Atômico) | `{"book_id": 1, "ra": "123"}` |
| `PATCH` | `/loans/{id}` | Processamento de devolução | `{"status": "returned"}` |

---

## 📂 Arquitetura de Pastas (Standard Layout)

```text
gbe-backend/
├── app/
│   ├── api/                # Camada de Transporte (Rotas e Versões)
│   ├── core/               # Segurança (JWT), Configurações e Logs
│   ├── crud/               # Lógica de persistência e regras de negócio
│   ├── models/             # Tabelas do banco (SQLAlchemy Models)
│   ├── schemas/            # Contratos de dados (Pydantic DTOs)
│   └── db/                 # Conexão assíncrona e Engine do banco
├── alembic/                # Histórico de migrações e versionamento
├── Dockerfile              # Imagem otimizada para deploy rápido
├── requirements.txt        # Dependências fixadas
└── README.md               # Você está aqui
```

---

## 🚀 Como Executar (Modo Desenvolvedor)

### 1. Preparação do Ambiente
```bash
# Clone e entre no diretório
git clone <url-do-repositorio>
cd gerenciador-biblioteca-escolar

# Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# Instale as dependências
pip install -r requirements.txt
```

### 2. Banco de Dados e Start
```bash
# Aplique as migrações (Criação do esquema)
alembic upgrade head

# Inicialize o servidor ASGI
uvicorn app.main:app --reload --port 8000
```

---

## ✨ Roadmap de Desenvolvimento

- [ ] Implementação de **Inlay Hints** para clareza no desenvolvimento.
- [ ] Otimização de queries para evitar o problema de **N+1 queries**.
- [ ] Middlewares de **Rate Limiting** para segurança local.
- [ ] Sistema de backup automático do banco `database.db`.
---
<div align="center">
  <sub><strong>GBE Project</strong> • Sistema de Gestão de Bibliotecas Escolar</sub>
</div>
