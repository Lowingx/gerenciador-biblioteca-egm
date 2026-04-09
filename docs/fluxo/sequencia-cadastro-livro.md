```mermaid
sequenceDiagram
    actor 📚 Bibliotecário
    participant 💻 Frontend
    participant 🖥️ Backend
    participant 📦 Banco
    📚 Bibliotecário->>💻 Frontend: Preenche dados do livro
    💻 Frontend->>🖥️ Backend: POST /livros
    🖥️ Backend->>📦 Banco: Verifica ISBN
    alt ISBN duplicado
        🖥️ Backend-->>💻 Frontend: 400 ISBN já cadastrado
    else Novo ISBN
        🖥️ Backend->>📦 Banco: Cadastra livro
        🖥️ Backend-->>💻 Frontend: 201 Livro criado
    end

