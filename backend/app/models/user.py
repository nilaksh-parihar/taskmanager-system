from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password_hash = Column(String, nullable=False)

    role = Column(String(20), default="USER")

    created_at = Column(DateTime, default=datetime.utcnow)