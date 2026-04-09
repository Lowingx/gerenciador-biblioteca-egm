# Documentação - Diagramas do Projeto

Documentação técnica do **Gerenciador de Biblioteca Escolar**.

Todos os diagramas foram feitos em Mermaid e estão prontos para visualização direta no GitHub ou VS Code.

---

## 📋 Lista de Diagramas

| Diagrama                          | Arquivo                              | Descrição                                                                 |
|-----------------------------------|--------------------------------------|---------------------------------------------------------------------------|
| Diagrama ER (Entidade-Relacionamento) | `der.png`                            | Estrutura do banco de dados (3 tabelas: alunos, livros, emprestimos)    |
| C4 Container                      | `c4-container.md`                   | Visão geral do sistema completo (frontend, backend, banco e WhatsApp)   |
| C4 Component (Backend)            | `c4-component.md`                   | Estrutura interna do backend (routers, schemas, models, CRUD, auth)     |
| Sequência - Cadastro de Livro     | `sequencia-cadastro-livro.md`       | Fluxo completo de cadastro de um novo livro                              |
| Sequência - Empréstimo            | `sequencia-emprestimo.md`           | Fluxo de empréstimo com validações de disponibilidade e aluno ativo      |
| Sequência - Devolução             | `sequencia-devolucao.md`            | Fluxo de devolução de livro                                              |

---

## Como visualizar os diagramas

1. Abra qualquer arquivo `.md` no **GitHub** → o Mermaid renderiza automaticamente.
2. Ou use o **VS Code** com a extensão **Mermaid Preview**.
3. Para exportar imagem: clique com o botão direito no diagrama → “Exportar como PNG”.

---

**Todos os diagramas estão alinhados com:**
- Diagrama ER simplificado (3 tabelas)
- Stack oficial do projeto (FastAPI + SQLAlchemy + JWT + SlowAPI)
- Regras de negócio do MVP
- Notificação via WhatsApp para responsáveis em caso de atraso

Qualquer dúvida ou necessidade de ajuste, avise o time de backend.

Última atualização: 09/04/2026
