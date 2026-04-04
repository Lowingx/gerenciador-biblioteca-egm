<div align="center">

# ⚙️ GBE Backend
**Gerenciador de Biblioteca Escolar • Core API & Database**

[![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI_0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy_2.0+-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

*API RESTful leve, segura e performática. O motor de regras de negócio do GBE.*

</div>

---

## 🎯 A Missão do Backend

Enquanto o Frontend foca na experiência, o Backend do GBE garante que os dados nunca falhem. Construímos uma **API simples, rápida e segura**, projetada especificamente para rodar sem gargalos em servidores locais e tablets escolares com baixa configuração (~2GB RAM).

Nossos superpoderes incluem:
- 🔐 **Autenticação Direta:** Cadastro e login via Registro Acadêmico (RA/Matrícula).
- 📚 **Gestão Inteligente:** Controle rigoroso de alunos, livros e multas.
- 🔄 **Motor de Fluxo:** Lógica blindada para empréstimos, devoluções e cálculo de atrasos.
- ⚡ **Respostas em Milissegundos:** Processamento assíncrono garantindo fluidez no Kiosk Mode.

---

## 🛠️ Stack Tecnológica

O ecossistema Python moderno foi escolhido para garantir estabilidade e tipagem rigorosa:

| Tecnologia | Versão | Responsabilidade na Arquitetura 🏗️ |
| :--- | :--- | :--- |
| **Python** | `3.11+` | A linguagem principal. Clara, legível e poderosa. |
| **FastAPI** | `0.115+` | Framework da API. Roteamento ultrarrápido e documentação automática. |
| **Uvicorn** | `0.34+` | Servidor ASGI de alta performance. |
| **SQLAlchemy** | `2.0+` | ORM robusto para comunicação segura com o banco de dados. |
| **Pydantic** | `2.10+` | Validação estrita de dados e tipagem de payloads. |
| **Alembic** | `1.14+` | Versionamento e migrações do banco de dados. |
| **SQLite / PostgreSQL** | `-` | SQLite para dev rápido. PostgreSQL para a robustez de produção. |

---

## 📂 Arquitetura de Pastas

Estrutura limpa e escalável, separando rotas de modelos e regras de negócio:

```text
gerenciador-biblioteca-escolar/
├── app/
│   └── main.py               # ↳ Ponto de entrada da aplicação FastAPI
├── alembic.ini               # Configurações do versionamento de banco
├── Dockerfile                # Container isolado para o backend
├── pyproject.toml            # Configuração master do projeto
├── requirements.txt          # Cadeia de dependências (pip)
├── database.db               # Banco de dados local (ignorado no git)
└── README.md                 # Você está aqui
```

---

## 🚀 Como Executar o Backend

Levantar o servidor na sua máquina é um processo de poucos passos.

### 💻 Método Padrão (Ambiente Virtual)

```bash
# 1. Clone o repositório e acesse a pasta
git clone <url-do-repositorio>
cd gerenciador-biblioteca-escolar

# 2. Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux / macOS
# venv\Scripts\activate   # Windows

# 3. Instale as dependências da API
pip install -r requirements.txt

# 4. Rode as migrações para criar o banco (Apenas na primeira vez)
alembic upgrade head

# 5. Dê a ignição no servidor
uvicorn app.main:app --reload --port 8000
```

> 📡 **A API estará viva em:** `http://127.0.0.1:8000`
> 📖 **Swagger (Docs interativos):** `http://127.0.0.1:8000/docs`

### 🐳 Método Elite (Docker)
Recomendado para testar o ambiente real de produção sem instalar dependências na máquina:
```bash
docker-compose up --build
```

---

## ✨ Status do Desenvolvimento (Backlog)

Nosso motor está em construção contínua. Próximos commits:

- [ ] Modelos SQLAlchemy definitivos (Aluno, Livro, Empréstimo).
- [ ] Sistema de autenticação blindado por matrícula.
- [ ] CRUD completo (Livros, Alunos, Empréstimos).
- [ ] Implementação das regras de negócio de empréstimo/devolução.
- [ ] Rotas protegidas via dependências nativas do FastAPI.
- [ ] Migrações Alembic estruturadas.
- [ ] Bateria de testes unitários básicos (Pytest).

---

## 👥 Esquadrão de Dados (Responsáveis)

Código construído e mantido por:
- **Giovanna** 👩‍💻 → Arquitetura Backend & Criação de DB
- **Miguel** 👨‍💻 → Arquitetura Backend & Criação de DB
- **Fabrício** 👨‍💻 → Estruturação do Banco de Dados
- **Ícaro** 👨‍💻 → Backend Core & Auxílio Técnico
- **Evy** 👑 → Supervisão Geral e Code Review

<div align="center">
  <sub>Lógica implacável. Sem N+1 queries. Feito para o GBE. 🚀</sub>
</div>
