# Gerenciador de Biblioteca GBE
> Sistema inteligente para gestão de acervo e monitoramento acústico ambiental.

[![Project Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue?style=for-the-badge)](https://github.com/Lowingx/gerenciador-biblioteca-egm/projects)
[![GitHub repo size](https://img.shields.io/github/repo-size/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=blue)](https://github.com/Lowingx/gerenciador-biblioteca-egm)
[![GitHub last commit](https://img.shields.io/github/last-commit/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=brightgreen)](https://github.com/Lowingx/gerenciador-biblioteca-egm/commits/main)

---

## 🛠 Stack Tecnológica

| Camada | Tecnologia | Versão | Status / Widget |
| :--- | :--- | :--- | :--- |
| **Backend** | Python + FastAPI | 3.11+ / 0.115 | [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com) |
| **Frontend** | React + TypeScript + Vite | 18+ / 5+ | [![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev) |
| **Banco** | PostgreSQL + SQLAlchemy + Alembic | 16 / 2.x | [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org) |
| **DevOps** | GitHub Actions + Docker Compose | - | [![GitHub Actions](https://img.shields.io/badge/CI/CD-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/features/actions) |
| **UI** | Tailwind CSS + shadcn/ui | - | [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com) |
| **Testes** | Pytest + Vitest | - | [![Tests](https://img.shields.io/badge/Tests-OK-brightgreen?style=flat-square)](https://docs.pytest.org/) |

---

## Estrutura do Repositório

```text
.
├── backend/    # Servidor API e lógica de banco de dados
├── frontend/   # Aplicação web em React e TypeScript
├── docs/       # Documentação técnica, diagramas ER e fluxos
└── scripts/    # Utilitários para automação e deploy

```

## Protocolo de Contribuição

    Gestão de Branches: Proibido commits diretos na main. Utilize o padrão tipo/nome-da-tarefa (ex: feat/setup-db).

    Revisão de Código: Todo código deve ser submetido via Pull Request (PR) e aprovado.

    Sincronização: Acompanhe o canal #github-issues-prs no Discord para atualizações em tempo real.

Documentação Adicional

> Consulte a pasta /docs para visualizar o Modelo de Entidade-Relacionamento (DER), o backlog das Sprints e os fluxogramas de processos.
Último teste de bot: qui 02 abr 2026 20:21:47 -03
