from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import settings
import datetime

# engine starts
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, convert_unicode=True)
Session = sessionmaker(bind=engine)
session = Session()

# this is the base to operate with DB model
Base = declarative_base()

def init_db():

    # import all models module
    import models.users
    import models.projects

    # creates database tables
    Base.metadata.create_all(bind=engine)

    # populate all tables
    if(settings.SQLALCHEMY_POPULATE_DB):
        
        # user
        from database.users import populate_users
        populate_users()

