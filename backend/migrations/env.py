import os
from dotenv import load_dotenv
from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
from app.models.base import Base
from app.models import *


load_dotenv()

config = context.config

database_url = os.getenv("DATABASE_URL")

if not database_url:
    raise ValueError("DATABASE_URL não definida")

config.set_main_option("sqlalchemy.url", database_url)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata