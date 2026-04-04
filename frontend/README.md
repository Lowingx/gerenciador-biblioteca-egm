<div align="center">

# 📚 GBE Frontend
**Gerenciador de Biblioteca Escolar • Kiosk Mode Interface**

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

*Desenvolvido com foco na realidade escolar brasileira. Alta performance em hardware limitado.*

</div>

---

## 🎯 A Missão do Projeto
O **GBE Frontend** é a camada visual do nosso sistema de gestão. Ele foi projetado desde o primeiro commit para rodar liso em **tablets escolares de baixa configuração** (~2GB RAM, resolução ~1280x800). 

Nós não construímos apenas um site; nós construímos uma experiência **Kiosk Mode**:
- 📱 **Mobile-first Nativo:** Otimizado milimetricamente para o toque na tela.
- ⚡ **Extremamente Leve:** Baixo consumo de memória e uso inteligente de GPU para animações.
- 🎨 **Visual Impecável:** Interface moderna com nossa paleta proprietária (`#6B46C0` → `#00B4D8` → `#67E8F9`).
- 🧹 **Código Limpo:** Arquitetura direta, fácil de entender e manter por desenvolvedores iniciantes.

---

## 🛠️ Stack Tecnológica

Escolhemos as ferramentas a dedo para garantir **Developer Experience (DX)** e **Performance Máxima**:

| Tecnologia | Versão | O motivo da escolha 🎯 |
| :--- | :--- | :--- |
| **React + TypeScript** | `19.x` | Tipagem forte para evitar bugs em produção e escalabilidade máxima. |
| **Vite** | `8.x` | HMR instantâneo e tempo de build estupidamente rápido. |
| **Tailwind CSS** | `3.4.x` | Estilização utilitária pesando quase zero no bundle final. |
| **Framer Motion** | `12.x` | Animações fluídas de 60fps otimizadas para navegadores mobile. |
| **Lucide React** | `1.7.x` | Ícones SVG leves, combinados com nossos assets PNG customizados. |

---

## 🚀 Como Executar Localmente

Zero dor de cabeça. Clone, instale e rode.

```bash
# 1. Clone e entre na pasta do frontend
cd frontend

# 2. Instale as dependências com velocidade
npm install

# 3. Dê a ignição no servidor de desenvolvimento
npm run dev
```
> 🔥 O Kiosk Mode estará rodando em: `http://localhost:5173`

---

## 📂 Arquitetura de Pastas

Organização é inegociável. Nossa árvore é desenhada para você encontrar o que precisa em 3 segundos:

```text
src/
├── pages/                  # Views completas 
│   └── LoginPage.tsx       # ↳ Tela de login de elite
├── components/             # Peças de lego (reutilizáveis)
├── assets/                 # Nossos tesouros visuais
│   └── icons/              # ↳ logo-gbe.png, lapis-icon.png, etc.
├── App.tsx                 # O maestro das rotas
├── main.tsx                # Ponto de entrada do React
├── index.css               # Coração do Tailwind
└── vite-env.d.ts           # Tipagens de ambiente
```

---

## ✨ Status do Desenvolvimento

O GBE está crescendo rápido. Acompanhe nosso Roadmap:

### 🟢 Entregue (MVP)
- [x] Tela de Login com *Fluid Background* animado em Canvas.
- [x] Modal "Esqueceu sua senha?" (UX amigável).
- [x] Modal "Precisa de ajuda?" (Redirecionamento para monitor/bibliotecário).
- [x] Layout responsivo travado para proporção de Tablet Escolar.
- [x] Integração de assets PNG com fallback de ícones.

### ⏳ Backlog (Próximos Passos)
- [ ] **Dashboard / Home:** Visão geral do aluno.
- [ ] **Catálogo:** Listagem de livros e motor de busca.
- [ ] **Empréstimo/Devolução:** O core business da biblioteca.
- [ ] **Agenda:** Escala e horários dos monitores.
- [ ] **Recompensas:** Sistema de gamificação (cinema/documentários).

---

## 🤝 Como Contribuir

A equipe é preguiçosa para tarefas manuais, mas exigente com o código. Siga o fluxo:

1. Faça um **Fork** do projeto.
2. Crie uma branch clara para sua feature: `git checkout -b feature/minha-tela-nova`
3. Siga o padrão GBE: **Sem comentários óbvios no código, use nomes descritivos.**
4. Comite suas mudanças: `git commit -m 'feat: adiciona componente de busca'`
5. Faça o Push: `git push origin feature/minha-tela-nova`
6. Abra um **Pull Request** detalhado.

---
<div align="center">
  <sub>Construído com sangue, suor e código limpo pela equipe GBE. 🚀</sub>
</div>
