# Product Backlog

Este documento apresenta o **Product Backlog técnico do projeto GBE**, organizado por sprints, contendo as histórias técnicas, prioridades, estimativas e responsáveis de implementação.

---

## Sprint 1 — Gestão de Livros e Autenticação

| ID | Título | Descrição | Prioridade | Estimate | Responsáveis | Branch |
|----|--------|-----------|------------|----------|--------------|--------|
| PB-02a | Criar endpoint GET /livros | Implementar listagem de todos os livros | Must | 4 | Giovanna, Ícaro | `feature/pb-02a-get-livros` |
| PB-02b | Criar endpoint POST /livros | Implementar cadastro de livro com schema LivroCreate | Must | 5 | Fabrício, Miguel | `feature/pb-02b-post-livros` |
| PB-02c | Adicionar validação de ISBN único | Impedir cadastro de ISBN duplicado | Must | 3 | Fabrício, Miguel | `feature/pb-02c-validacao-isbn` |
| PB-03a | Implementar endpoint PUT /livros/{id} | Atualizar dados de um livro | Must | 4 | Giovanna, Ícaro | `feature/pb-03a-put-livro` |
| PB-03b | Implementar endpoint DELETE /livros/{id} | Excluir livro do sistema | Must | 3 | Fabrício, Miguel | `feature/pb-03b-delete-livro` |
| PB-04a | Criar endpoint de login por RA | Criar POST /auth/login | Must | 5 | Evy | `feature/pb-04a-auth-login` |
| PB-04b | Implementar JWT no login | Retornar token JWT após login | Must | 4 | Evy | `feature/pb-04b-jwt` |

---

## Sprint 2 — Usuários e Empréstimos

| ID | Título | Descrição | Prioridade | Estimate | Responsáveis | Branch |
|----|--------|-----------|------------|----------|--------------|--------|
| PB-05a | Criar model Usuario | Criar model de usuários/alunos | Must | 5 | Giovanna, Miguel | `feature/pb-05a-model-usuario` |
| PB-05b | Criar schemas para Usuario | Criar UsuarioCreate e UsuarioResponse | Must | 3 | Fabrício, Miguel | `feature/pb-05b-schemas-usuario` |
| PB-05c | Criar endpoint POST /usuarios | Cadastrar novo aluno/professor | Must | 5 | Giovanna, Ícaro | `feature/pb-05c-post-usuario` |
| PB-06a | Implementar endpoint de empréstimo | POST /emprestimos | Must | 8 | Fabrício, Miguel | `feature/pb-06a-emprestimo` |
| PB-06b | Validar exemplar disponível no empréstimo | Checar se livro está disponível | Must | 4 | Giovanna, Ícaro | `feature/pb-06b-validacao-disponivel` |
| PB-06c | Validar usuário sem pendências | Checar multas e limite de livros | Must | 4 | Fabrício, Miguel | `feature/pb-06c-validacao-usuario` |
| PB-07a | Implementar endpoint de devolução | POST /devolucoes | Must | 6 | Giovanna, Ícaro | `feature/pb-07a-devolucao` |
| PB-07b | Calcular multa automática | Cálculo de dias de atraso | Must | 5 | Fabrício, Miguel | `feature/pb-07b-multa` |

---

## Sprint 3 — Busca, Agenda e Dashboard

| ID | Título | Descrição | Prioridade | Estimate | Responsáveis | Branch |
|----|--------|-----------|------------|----------|--------------|--------|
| PB-08a | Criar busca avançada por título | GET /livros/busca?titulo=... | Should | 4 | Giovanna, Ícaro | `feature/pb-08a-busca-titulo` |
| PB-08b | Criar busca por autor e categoria | GET /livros/busca?autor=...&categoria=... | Should | 4 | Fabrício, Miguel | `feature/pb-08b-busca-avancada` |
| PB-09a | Criar agenda de monitores | Model + endpoints para agenda | Must | 6 | Evy | `feature/pb-09a-agenda-monitores` |
| PB-09b | Implementar rodízio de monitores | Visualização da agenda semanal | Should | 5 | Giovanna, Ícaro | `feature/pb-09b-rodizio` |
| PB-10a | Criar dashboard básico | Quantidade de livros, emprestados e atrasados | Should | 5 | Evy | `feature/pb-10a-dashboard` |
| PB-10b | Criar histórico de empréstimos do usuário | GET /meus-emprestimos | Should | 4 | Fabrício, Miguel | `feature/pb-10b-historico` |

---

## Sprint 4 — Finalização

| ID | Título | Descrição | Prioridade | Estimate | Responsáveis | Branch |
|----|--------|-----------|------------|----------|--------------|--------|
| PB-11 | Refatoração e testes finais | Refatorar, adicionar testes e preparar apresentação final | Must | 8 | Evy | `feature/pb-11-refatoracao-final` |
| PB-12 | Documentação final e apresentação | Finalizar documentação ABNT e slides | Must | 6 | Eduardo | `feature/pb-12-documentacao` |

---

## Resumo Técnico

- **Total de backlog items:** 23  
- **Total estimado:** 111 story points  
- **Sprints planejadas:** 4  
- **Estratégia de versionamento:** branches por backlog item (`feature/PB-ID`)  

---
