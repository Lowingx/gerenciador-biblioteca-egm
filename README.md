# 📚 Gerenciador de Biblioteca EGM
> Sistema inteligente para gestão de acervo e monitoramento acústico ambiental.

![GitHub repo size](https://img.shields.io/github/repo-size/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=blue)
![GitHub last commit](https://img.shields.io/github/last-commit/Lowingx/gerenciador-biblioteca-egm?style=for-the-badge&color=brightgreen)

---

## 🎯 O Projeto
O **EGM Lib** une gestão bibliotecária com **IoT**. O diferencial é um sensor de ruído que monitora o ambiente em tempo real, enviando alertas para o dashboard caso o nível de decibéis ultrapasse o limite.

## 🏗️ Estrutura do Repositório
* **web/**: Frontend em React + Tailwind.
* **backend/**: API em Python (FastAPI).
* **hardware/**: Código para o sensor (ESP32/Arduino).
* **docs/**: Documentação técnica e ABNT.

## 🛠️ Instalação Rápida

### Backend
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd web
npm install
npm run dev
```

## 🚦 Regras da Squad
1. **Sem Push na Main**: Use sempre branches (`feat/task`).
2. **Pull Requests**: Todo código deve ser revisado antes do merge.
3. **Discord**: Acompanhe o canal #github-issues-prs para atualizações.

---
Desenvolvido pelo Squad Library Nexus
