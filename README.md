# 📚 Gerenciador de Biblioteca GBE

### ⚡ Sistema Inteligente de Gestão para Bibliotecas Escolares

O **GBE** é uma plataforma Full-Stack de alto desempenho desenvolvida para modernizar a administração de bibliotecas. O sistema centraliza o controle de acervo, usuários e fluxos de empréstimos, garantindo integridade de dados e uma experiência de usuário fluida.

---

## 📊 Status e Indicadores do Projeto

<div align="center">

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-4488ff?style=for-the-badge&logo=github)
![Versão](https://img.shields.io/badge/Versão-1.0.0--beta-blueviolet?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-orange?style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=333)
![Last Commit](https://img.shields.io/github/last-commit/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=brightgreen)

</div>

---

## 🛠 Stack Tecnológica Detalhada

| Camada | Tecnologia | Badge | Versão |
| :--- | :--- | :--- | :--- |
| **Linguagem Backend** | Python | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | `3.11+` |
| **Framework API** | FastAPI | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi) | `Latest` |
| **Frontend Core** | React | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | `19.0` |
| **Tipagem** | TypeScript | ![TS](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) | `5.0+` |
| **Build Tool** | Vite | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | `6.0` |
| **Estilização** | Tailwind CSS | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | `3.4+` |
| **Banco de Dados** | PostgreSQL | ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) | `16` |
| **ORM / Migrations** | SQLAlchemy & Alembic | ![DB](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square) | `-` |
| **Containerização** | Docker | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | `24+` |

---

## 📂 Arquitetura de Pastas

```text
root/
├── 📂 .github/           # Workflows de CI/CD (GitHub Actions)
├── 📂 backend/           # API RESTful, Schemas, Models e CRUD
│   ├── 📂 alembic/       # Controle de migrações do banco
│   └── 📂 app/           # Core da aplicação Python
├── 📂 frontend/          # SPA em React com Vite
│   ├── 📂 src/
│   │   ├── 📂 components/ # UI Reutilizável
│   │   └── 📂 hooks/      # Lógica de estado customizada
├── 📂 docs/              # DER, Diagramas de Fluxo e Backlog
└── 🐋 docker-compose.yml # Orquestração de serviços (App + DB)
```

---

## 🚀 Guia de Instalação e Execução

### Pré-requisitos
* **Docker** & **Docker Compose** instalados.
* **Git** para clonagem.

### Procedimento de Inicialização

```bash
# 1. Clonagem do repositório via SSH ou HTTPS
git clone [https://github.com/Lowingx/gerenciador-biblioteca-egm.git](https://github.com/Lowingx/gerenciador-biblioteca-egm.git)

# 2. Navegação para o diretório raiz
cd gerenciador-biblioteca-egm

# 3. Build e execução dos containers em background
docker compose up -d --build
```

### Portas de Acesso Local
* 🌐 **Interface Web:** `http://localhost:5173`
* 🔌 **Documentação API (Swagger):** `http://localhost:8000/docs`
* 🗃️ **Banco de Dados:** `localhost:5432`

---

## ⚙️ Protocolos de Contribuição e Qualidade

Para garantir a integridade do código e a rastreabilidade das features, adotamos o seguinte fluxo:

### 🔱 Gerenciamento de Branches
* **`main`**: Apenas código estável e em produção.
* **`develop`**: Branch de integração. Todo PR deve ser destinado a ela.
* **`feature/pb-XX-nome`**: Desenvolvimento de novas funcionalidades.
* **`fix/pb-XX-nome`**: Correção de bugs críticos.

### ✍️ Padrão de Commits (Conventional Commits)
| Tipo | Descrição |
| :--- | :--- |
| `feat:` | Introdução de nova funcionalidade. |
| `fix:` | Correção de um erro. |
| `chore:` | Mudanças em ferramentas ou bibliotecas de build. |
| `refactor:` | Alteração de código que não corrige erro nem adiciona feature. |

---

## 📑 Documentação Técnica Adicional

> [!IMPORTANT]
> Antes de iniciar qualquer desenvolvimento, revise os documentos na pasta `/docs`:
> - **Modelo DER:** Definição de chaves estrangeiras e relacionamentos.
> - **Backlog da Sprint:** Priorização de tarefas vigentes.
> - **Fluxogramas:** Lógica de negócio para empréstimos e multas.

---

<div align="center">

**GBE - Sistema Licenciado sob a [MIT License](LICENSE)** <br>
Sincronização via Discord: `#github-issues-prs`

</div>


