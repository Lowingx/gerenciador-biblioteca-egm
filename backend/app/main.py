from fastapi import FastAPI
app = FastAPI(title="GBE - Gerenciador de Biblioteca Escolar")
@app.get("/")
def read_root():
    return {"message": "GBE API is running"}
