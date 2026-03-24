from fastapi import FastAPI

app = FastAPI(title="Biblioteca Escolar - EGM")

@app.get("/")
def read_root():
    return {"mensagem": "Backend da Biblioteca Escolar rodando!"}

