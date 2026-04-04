# Especificação Técnica: GBE Backend API
**Sistema de Gerenciamento de Biblioteca Escolar**

A API do GBE foi concebida sob o paradigma de **Arquitetura Limpa (Clean Architecture)**, priorizando o baixo consumo de recursos computacionais e a alta disponibilidade em redes locais. Este documento detalha a infraestrutura, os contratos de dados e os padrões de implementação do core do sistema.

---

## 1. Visão Geral do Sistema
O Backend atua como o núcleo de processamento e persistência do GBE, expondo uma interface RESTful para o consumo do Frontend. O design é focado na atomicidade das operações e na integridade referencial dos dados da biblioteca.

### Premissas de Engenharia:
* **Eficiência de Memória:** Otimização para instâncias de baixa performance (Kiosk Mode).
* **Persistência Híbrida:** Suporte nativo a SQLite (desenvolvimento) e PostgreSQL (produção).
* **Concorrência:** Gerenciamento de múltiplas requisições via `asyncio`.
* **Escalabilidade Horizontal:** Preparado para execução em containers isolados.

---

## 2. Stack Tecnológica

| Componente | Tecnologia | Especificação Técnica |
| :--- | :--- | :--- |
| **Linguagem** | Python 3.11+ | Suporte a Type Hinting e bibliotecas assíncronas. |
| **Framework** | FastAPI | Baseado em Starlette e Pydantic; geração automática de OpenAPI. |
| **ORM** | SQLAlchemy 2.0 | Mapeamento Objeto-Relacional com suporte a Async Drivers. |
| **Migrações** | Alembic | Controle de versionamento de esquema e integridade de transição. |
| **Validação** | Pydantic v2 | Serialização de dados em Rust Core para alta performance. |
| **Servidor** | Uvicorn | Servidor ASGI de baixa latência baseado em `uvloop`. |

---

## 3. Arquitetura de Dados (Modelo de Entidade-Relacionamento)

O banco de dados segue a normalização de terceira forma (3NF) para garantir a performance de consultas e evitar inconsistências.

* **User/Student:** Matrícula (PK), Nome, E-mail, Hash de Senha, Status (Ativo/Inativo).
* **Book:** ISBN (PK), Título, Autor, Categoria, Exemplares Disponíveis.
* **Loan (Empréstimo):** ID (PK), User_ID (FK), Book_ID (FK), Data_Emprestimo, Data_Previsao_Devolucao, Status.

---

## 4. API Reference (Contratos de Dados)

### Autenticação
| Endpoint | Método | Descrição | Requisito |
| :--- | :--- | :--- | :--- |
| `/auth/login` | `POST` | Geração de Token JWT. | RA e Senha |

### Gestão de Acervo e Operações
| Endpoint | Método | Descrição | Parâmetros |
| :--- | :--- | :--- | :--- |
| `/books` | `GET` | Listagem com paginação e busca. | `q, page, size` |
| `/loans` | `POST` | Registro de novo empréstimo. | `ra, book_id` |
| `/loans/{id}/return` | `PATCH` | Processamento de devolução. | `id (path)` |

---

## 5. Estrutura do Repositório (Standard Layout)

A organização segue padrões de escalabilidade, separando a lógica de negócio da infraestrutura de transporte.

```text
gbe-backend/
├── app/
│   ├── api/                # Camada de Transporte (Rotas e Versões)
│   ├── core/               # Configurações globais e Segurança (JWT)
│   ├── crud/               # Lógica de persistência e regras de negócio
│   ├── models/             # Definição de tabelas (SQLAlchemy Models)
│   ├── schemas/            # DTOs e Contratos Pydantic
│   ├── db/                 # Conexão assíncrona e sessões
│   └── main.py             # Entrypoint da aplicação
├── alembic/                # Versionamento do Banco de Dados
├── tests/                  # Testes unitários e de integração
├── Dockerfile              # Containerização do serviço
├── requirements.txt        # Manifesto de dependências fixadas
└── pyproject.toml          # Configuração de Ferramentas (Black, Mypy)
```

---

## 6. Procedimentos de Deployment e Qualidade

### Inicialização do Ambiente
1.  **Isolamento:** `python -m venv venv`
2.  **Dependências:** `pip install -r requirements.txt`
3.  **Database:** `alembic upgrade head`
4.  **Execução:** `uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`

### Monitoramento e Logs
* Implementação de logs estruturados em formato JSON.
* Documentação automática acessível em `/docs` (Swagger UI).
* Middlewares de segurança para controle de CORS e Rate Limiting.

---
<div align="center">
  <sub>GBE Backend - Documentação Técnica Oficial</sub>
</div>
