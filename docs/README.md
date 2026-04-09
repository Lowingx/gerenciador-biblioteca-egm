# Documentação - Diagramas do Projeto

Documentação técnica do **Gerenciador de Biblioteca Escolar**.

Todos os diagramas estão organizados nesta pasta para facilitar a visualização e a documentação ABNT.

---

## 📋 Lista de Diagramas

| Diagrama                              | Arquivo                        | Descrição                                                                 |
|---------------------------------------|--------------------------------|---------------------------------------------------------------------------|
| Diagrama ER (Entidade-Relacionamento) | `der.png`                      | Estrutura do banco de dados (3 tabelas: alunos, livros, emprestimos)     |
| C4 Container                          | `dc4c.png`                     | Visão geral do sistema completo (frontend, backend, banco e WhatsApp)    |
| C4 Component (Backend)                | `c4-component.md`              | Estrutura interna do backend (routers, schemas, models, CRUD, auth)      |
| Sequência - Cadastro de Livro         | `sequencia-cadastro-livro.md`  | Fluxo completo de cadastro de um novo livro                               |
| Sequência - Empréstimo                | `sequencia-emprestimo.md`      | Fluxo de empréstimo com validações de disponibilidade e aluno ativo      |
| Sequência - Devolução                 | `sequencia-devolucao.md`       | Fluxo de devolução de livro                                               |

---

## Como visualizar os diagramas

- **Arquivos .png**: Abra diretamente (der.png e dc4c.png) — já são imagens prontas.
- **Arquivos .md**: Abra no GitHub ou VS Code (com extensão Mermaid) para visualizar os diagramas interativos.
- Para exportar imagem dos diagramas Mermaid: clique com o botão direito → "Exportar como PNG".

---

**Observações importantes:**
- Todos os diagramas seguem o escopo simplificado do MVP (3 tabelas no banco).
- O sistema roda localmente na escola.
- Segurança inclui autenticação JWT e rate limiting (SlowAPI).
- Notificação via WhatsApp para responsáveis em caso de atraso está contemplada.

Última atualização: 09/04/2026

Qualquer ajuste necessário, avise o time de backend.
