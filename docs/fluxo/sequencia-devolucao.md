Snippet de código

sequenceDiagram
    actor 📚 Bibliotecário
    participant 💻 Frontend
    participant 🖥️ Backend
    participant 📦 Banco
    📚 Bibliotecário->>💻 Frontend: Informa livro devolvido
    💻 Frontend->>🖥️ Backend: POST /emprestimos/devolver
    🖥️ Backend->>📦 Banco: Busca empréstimo ativo
    alt Não encontrado
        🖥️ Backend-->>💻 Frontend: 404 Não encontrado
    else Encontrado
        🖥️ Backend->>📦 Banco: Registra devolução
        🖥️ Backend->>📦 Banco: Aumenta quantidade disponível
        🖥️ Backend-->>💻 Frontend: 200 Devolução realizada
    end

