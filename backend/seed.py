"""Seed de exemplo: cria o banco (init_db) e popula dados reais de biblioteca.

Uso:
    cd backend && .venv/bin/python seed.py

Cria um usuário bibliotecário (RA 2024-001 / senha abc123) e dados de catálogo.
"""

import os
import bcrypt

from app.core.database import init_db, SessionLocal
from app.models.usuario import Usuario
from app.models.categoria import Categoria
from app.models.editora import Editora
from app.models.autor import Autor
from app.models.livro import Livro


def main():
    init_db()
    db = SessionLocal()
    try:
        # ── Usuário bibliotecário ─────────────────────────
        if not db.query(Usuario).filter(Usuario.ra == "2024-001").first():
            senha_hash = bcrypt.hashpw(b"abc123", bcrypt.gensalt()).decode("utf-8")
            db.add(Usuario(ra="2024-001", nome="Iori EGM", email="iori@egm.edu",
                           senha_hash=senha_hash, is_admin=True))

        # ── Categorias ────────────────────────────────────
        cat_ficcao = db.query(Categoria).filter_by(nome="Ficção").first() or \
            Categoria(nome="Ficção")
        cat_ciencia = db.query(Categoria).filter_by(nome="Ciência").first() or \
            Categoria(nome="Ciência")
        cat_historia = db.query(Categoria).filter_by(nome="História").first() or \
            Categoria(nome="História")
        db.add_all([cat_ficcao, cat_ciencia, cat_historia])

        # ── Editoras ──────────────────────────────────────
        ed_letras = db.query(Editora).filter_by(nome="Companhia das Letras").first() or \
            Editora(nome="Companhia das Letras")
        ed_zahar = db.query(Editora).filter_by(nome="Zahar").first() or \
            Editora(nome="Zahar")
        ed_cia = db.query(Editora).filter_by(nome="Editora Ciência Moderna").first() or \
            Editora(nome="Editora Ciência Moderna")
        db.add_all([ed_letras, ed_zahar, ed_cia])

        # ── Autores ───────────────────────────────────────
        aut_machado = db.query(Autor).filter_by(nome="Machado de Assis").first() or \
            Autor(nome="Machado de Assis", biografia="Romancista, contista e cronista brasileiro.")
        aut_carl = db.query(Autor).filter_by(nome="Carl Sagan").first() or \
            Autor(nome="Carl Sagan", biografia="Astrônomo e divulgador científico americano.")
        aut_laurentino = db.query(Autor).filter_by(nome="Laurentino Gomes").first() or \
            Autor(nome="Laurentino Gomes", biografia="Jornalista e escritor brasileiro.")
        db.add_all([aut_machado, aut_carl, aut_laurentino])

        # ── Livros ────────────────────────────────────────
        if not db.query(Livro).filter_by(isbn="9788535914847").first():
            db.add(Livro(titulo="Dom Casmurro", isbn="9788535914847",
                         ano_publicacao=1899, quantidade_total=3,
                         categoria=cat_ficcao, editora=ed_letras,
                         autores=[aut_machado]))
        if not db.query(Livro).filter_by(isbn="9788576571820").first():
            db.add(Livro(titulo="Cosmos", isbn="9788576571820",
                         ano_publicacao=1980, quantidade_total=2,
                         categoria=cat_ciencia, editora=ed_cia,
                         autores=[aut_carl]))
        if not db.query(Livro).filter_by(isbn="9788525042300").first():
            db.add(Livro(titulo="1808", isbn="9788525042300",
                         ano_publicacao=2007, quantidade_total=2,
                         categoria=cat_historia, editora=ed_letras,
                         autores=[aut_laurentino]))

        db.commit()
        print("Seed OK. Login: RA 2024-001 / senha abc123")
    except Exception as e:
        db.rollback()
        print("Erro no seed:", e)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
