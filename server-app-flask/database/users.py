from models.users import User
from database import session
import datetime

def populate_users():

    user1 = User()
    user1.user = "danaremar"
    user1.name = "Daniel"
    user1.last_name = "Arellano Martínez"
    user1.email = "danaremar@alum.us.es"
    user1.password = "shuloshulo"
    user1.country = "ES"
    user1.sector = "Ing"
    user1.creation_date = "2021-01-31 12:25:01"
    user1.last_connection = "2021-01-31 12:25:01"
    user1.active = True
    session.add(user1)

    user2 = User()
    user2.user = "admin"
    user2.name = "Administrator"
    user2.last_name = "Of This Site"
    user2.email = "admin@iMan.es"
    user2.password = "iManThaBest"
    user2.country = "US"
    user2.sector = "Ing"
    user2.creation_date = "2021-01-30 12:25:01"
    user2.last_connection = "2021-01-30 12:25:01"
    user2.active = True
    session.add(user2)

    user3 = User()
    user3.user = "cuberito"
    user3.name = "Cubero"
    user3.last_name = "Garrafón Jagger"
    user3.email = "cuberito@cuberito.es"
    user3.password = "cuberito123"
    user3.country = "ES"
    user3.sector = "Ing"
    user3.creation_date = "2021-01-29 12:25:01"
    user3.last_connection = "2021-01-29 12:25:01"
    user3.active = True
    session.add(user3)

    # commit all changes
    session.commit()
