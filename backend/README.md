# 📚 Gerenciador de Biblioteca EGM + Smart Noise Sensor
> Sistema inteligente para gestão de acervo e monitoramento acústico ambiental.

![GitHub repo size](https://img.shields.io/github/repo-size/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=blue)
![GitHub last commit](https://img.shields.io/github/last-commit/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=brightgreen)

---

## 🎯 O Projeto
O **EGM Lib** une gestão bibliotecária clássica com **IoT**. O diferencial é um sensor de ruído que monitora o ambiente em tempo real, enviando alertas para o dashboard caso o nível de decibéis ultrapasse o limite permitido para estudos.

## 🏗️ Arquitetura do Sistema

* **🎨 web/**: Interface administrativa e do aluno desenvolvida em **React + Vite + Tailwind**.
* **🧠 backend/**: API REST construída com **Python + FastAPI**, utilizando **SQLAlchemy** para persistência de dados.
* **🔌 hardware/**: Firmware para o sensor de ruído (ESP32/Arduino) e esquemáticos de ligação.
* **📄 docs/**: Documentação técnica, diagramas de banco de dados e relatórios no padrão ABNT.

---

## 🛠️ Configuração de Ambiente

### 🐍 Backend
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### ⚛️ Frontend
```bash
cd web
npm install
npm run dev
```

---

## 🚦 Guia da Squad (Fluxo de Trabalho)

Para que os 7 integrantes trabalhem em harmonia sem conflitos de código:

1.  **Sync**: Sempre dê `git pull origin main` antes de iniciar.
2.  **Branch**: Crie uma ramificação para sua tarefa (`feat/nome-da-task`).
3.  **Commit**: Use mensagens claras (ex: `feat: adiciona busca de livros`).
4.  **PR**: Ao finalizar, abra um **Pull Request** no GitHub.
5.  **Review**: O código só entra na branch principal após revisão e aprovação do líder.

> [!CAUTION]
> **Push direto na MAIN é bloqueado.** Use o fluxo de Pull Request para garantir a estabilidade do sistema.

---

## 📡 Integração Discord
Este repositório está conectado via Webhook ao servidor do time. 
- Acompanhe o canal **#github-issues-prs** para notificações de commits e revisões.

---
Desenvolvido pela Squad EGM. 🚀
