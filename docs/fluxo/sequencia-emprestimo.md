Snippet de código

sequenceDiagram
    actor 📚 Bibliotecário
    participant 💻 Frontend
    participant 🖥️ Backend
    participant 📦 Banco
    📚 Bibliotecário->>💻 Frontend: Informa matrícula + livro
    💻 Frontend->>🖥️ Backend: POST /emprestimos
    🖥️ Backend->>📦 Banco: Livro disponível?
    alt Não disponível
        🖥️ Backend-->>💻 Frontend: 400 Livro indisponível
    else Disponível
        🖥️ Backend->>📦 Banco: Aluno ativo?
        alt Inativo
            🖥️ Backend-->>💻 Frontend: 403 Aluno inativo
        else OK
            🖥️ Backend->>📦 Banco: Registra empréstimo
            🖥️ Backend->>📦 Banco: Atualiza quantidade
            🖥️ Backend-->>💻 Frontend: 201 Empréstimo criado
        end
    end

