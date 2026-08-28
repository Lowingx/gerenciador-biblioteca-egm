<div align="center">

# 📚 Gerenciador de Biblioteca Escolar (GBE)

> **⚠️ Projeto descontinuado.** Mantido apenas como comprovação de experiência com Docker, React + Vite, Tailwind CSS e TypeScript.

</div>

---

## Sobre

Sistema fullstack para gerenciamento de bibliotecas escolares — cadastro de livros, empréstimos, devoluções, multas e controle de acervo.

**Não está em manutenção.** Issues e PRs não serão respondidos.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend | Python, FastAPI, SQLAlchemy, Alembic |
| Database | SQLite (dev), PostgreSQL (prod) |
| Infra | Docker, Docker Compose |
| CI/CD | GitHub Actions (security pipeline) |

---

## Como rodar

```bash
git clone https://github.com/Lowingx/gerenciador-biblioteca-egm.git
cd gerenciador-biblioteca-egm
docker compose up -d --build
```

| Serviço | URL |
|---------|-----|
| Frontend | `http://localhost:5173` |
| API (Swagger) | `http://localhost:8000/docs` |
| DB | `localhost:5432` |

### Login padrão

| RA | Senha |
|----|-------|
| `2024-001` | `abc123` |

---

## Estrutura

```
├── backend/          FastAPI API (auth, livros, empréstimos, catálogo)
├── frontend/         React SPA (Vite + Tailwind + TypeScript)
├── docker-compose.yml
└── .github/workflows/security.yml
```

---

## Funcionalidades implementadas

- Cadastro e busca de livros (com filtros por autor, categoria, editora)
- Validação de ISBN único
- Empréstimos com limite de 3 simultâneos
- Devolução com cálculo automático de multa (R$ 0,50/dia)
- Bloqueio de empréstimo quando há multa pendente
- Auth JWT com refresh token + blacklist
- RBAC (admin/usuário)
- Dashboard com estatísticas do acervo
- Claymorphism UI (Fredoka + Nunito)

---

## Licença

MIT
