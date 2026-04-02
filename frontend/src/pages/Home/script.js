document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ra = document.getElementById('ra').value;
        const senha = document.getElementById('senha').value;


        if (ra && senha) {
            console.log("Tentativa de login:", { ra });

            alert("Login enviado com sucesso!");
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
});