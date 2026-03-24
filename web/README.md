# 🎨Frontend - EGM Lib (Single Page Application)

Core da interface do usuário focado em performance e reatividade.

##  Tech Stack
* **Engine:** [React 18+](https://react.dev/) (Functional Components + Hooks)
* **Build Tool:** [Vite](https://vitejs.dev/) (ESModules)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first framework)
* **Icons:** [Lucide React](https://lucide.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)

##  Scripts de Execução
No diretório root da pasta \`web/\`, utilize os comandos via \`npm\` ou \`yarn\`:

| Comando | Descrição |
| :--- | :--- |
| \`npm install\` | Instala as dependências do \`package.json\` |
| \`npm run dev\` | Starta o Hot Module Replacement (HMR) em \`localhost:5173\` |
| \`npm run build\` | Compila os assets para produção na pasta \`dist/\` |
| \`npm run preview\` | Executa o build localmente para validação |

##  Padrões de Projeto
1.  **Componentização:** Arquivos em \`src/components\` devem ser atômicos.
2.  **Hooks Customizados:** Lógica de estado complexa deve ser abstraída em \`src/hooks\`.
3.  **Variáveis de Ambiente:** O endpoint da API deve ser definido no arquivo \`.env\` como \`VITE_API_URL\`.

---
