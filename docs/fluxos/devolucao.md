## Fluxo de Devolução de Livros

```mermaid
flowchart TD
    A[Início: Devolução de Livro] --> B[Bibliotecário informa tombo/código do livro]
    B --> C{Sistema busca empréstimo ativo?}
    C -->|Não| D[Erro: Livro não está emprestado ou não encontrado]
    D --> Z[Fim com erro]
    
    C -->|Sim| E[Exibe dados do empréstimo\nUsuário, Livro, Data prevista]
    E --> F[Bibliotecário confirma devolução?]
    F -->|Não| Z[Fim]
    F -->|Sim| G[Sistema calcula dias de atraso]
    
    G --> H{Atraso > 0?}
    H -->|Sim| I[Calcular multa\nAplicar regras de negócio]
    I --> J[Registrar multa no usuário]
    H -->|Não| K[Devolução dentro do prazo]
    
    J --> L[Registrar devolução\nData e hora atual]
    K --> L
    
    L --> M[Atualizar status do livro para Disponível]
    M --> N[Atualizar histórico do usuário]
    N --> O[Exibir mensagem de sucesso + resumo]
    O --> P[Fim da devolução]
