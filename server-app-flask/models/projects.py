from sqlalchemy import Column, Integer, SmallInteger, String, Date, DateTime, Boolean, ForeignKey, Index
import datetime
from database import Base


class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String(20), nullable=False)
    description = Column(String(255), nullable=False)
    creation_date = Column(DateTime, index=True, nullable=False)
    delete_date = Column(DateTime)
    active = Column(Boolean)


class User2Project(Base):
    __tablename__ = 'user2project'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)

    '''
    ROLES FOR A PROJECT
    0 -> owner
    1 -> admin
    2 -> member
    '''
    role = Column(SmallInteger, nullable=False)


class Sprint(Base):
    __tablename__ = 'sprints'
    id = Column(Integer, primary_key=True)
    number = Column(Integer, index=True, nullable=False)
    description = Column(String(255), nullable=False)
    creation_date = Column(DateTime, index=True, nullable=False)
    estimated_date = Column(DateTime, nullable=False)
    final_date = Column(DateTime)
    delete_date = Column(DateTime)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)