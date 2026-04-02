# Gerenciador de Biblioteca Escolar

Template baseado em **Next.js** com **shadcn/ui**.


### Sobre o Projeto

Este projeto é um sistema para gerenciamento de biblioteca escolar desenvolvido com Next.js e a biblioteca de componentes shadcn/ui.

---

### Adicionando Componentes

Para adicionar novos componentes do shadcn/ui ao seu projeto, execute o seguinte comando:

bash

npx shadcn@latest add nome-do-componente

### Exemplo:
Bashnpx shadcn@latest add button
Isso irá adicionar o componente na pasta components/ui/.

- Isso irá adicionar o componente na pasta components/ui/.

### Como Usar os Componentes
Para utilizar os componentes no seu aplicativo, importe-os da seguinte forma:
tsximport { Button } from "@/components/ui/button"

---

### Estrutura de Pastas Recomendada
Bashsrc/

├── app/                 # Páginas e rotas 

├── components/

│   └── ui/              # Componentes do shadcn/ui

├── lib/                 # Utilitários e configurações

└── hooks/               # Hooks personalizados
