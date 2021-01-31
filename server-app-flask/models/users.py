from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean
import datetime
from database import Base


class User(Base):

    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    user = Column(String(20), index=True, nullable=False, unique=True)
    name = Column(String(20), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(50), index=True, nullable=False, unique=True)
    password = Column(String(512), nullable=False)
    country = Column(String(3), index=True, nullable=False)
    sector = Column(String(20), nullable=False)
    creation_date = Column(DateTime, index=True, nullable=False)
    delete_date = Column(DateTime)
    last_connection = Column(DateTime, nullable=False)
    active = Column(Boolean)
