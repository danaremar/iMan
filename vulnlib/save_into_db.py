from datetime import datetime
from msilib import Table
import sqlalchemy
from sqlalchemy import Column, ForeignKey, Table, exists, distinct
from sqlalchemy.orm import relationship, declarative_base

PRINTABLE = True

DB_HOST_NAME = "localhost:3306"
DB_NAME = "iman_db"
DB_USER = "root"
DB_PASS = "aH4jK?21AZbX"

def create_engine():
    return sqlalchemy.create_engine('mariadb+mariadbconnector://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST_NAME + '/' + DB_NAME)

def create_session():
    session = sqlalchemy.orm.sessionmaker()
    engine = create_engine()
    session.configure(bind=engine)
    return session()

Base = declarative_base()

vulnlib_vulnlinks = Table("vulnlib_vulnlinks",
    Base.metadata,
    Column("vuln_lib_id", ForeignKey("vulnlib.id"), primary_key=True),
    Column("vulnlinks_id", ForeignKey("vulnlink.id"), primary_key=True))

class vulnlib(Base):
    __tablename__ = 'vulnlib'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    name = sqlalchemy.Column(sqlalchemy.String(length=50))
    description = sqlalchemy.Column(sqlalchemy.String(length=2000))
    company = sqlalchemy.Column(sqlalchemy.String(length=50))
    product = sqlalchemy.Column(sqlalchemy.String(length=50))
    affected_versions = sqlalchemy.Column(sqlalchemy.String(length=255))
    standard = sqlalchemy.Column(sqlalchemy.Boolean())
    creation_date = sqlalchemy.Column(sqlalchemy.Date())
    modification_date = sqlalchemy.Column(sqlalchemy.Date())
    cwe_type = sqlalchemy.Column(sqlalchemy.String(length=50))
    cvss = sqlalchemy.Column(sqlalchemy.Numeric())
    cvss_vector = sqlalchemy.Column(sqlalchemy.String(length=50))
    cvss_manual = sqlalchemy.Column(sqlalchemy.Boolean())
    active = sqlalchemy.Column(sqlalchemy.Boolean())
    lang = sqlalchemy.Column(sqlalchemy.String(length=5))
    vulnlinks = relationship("vulnlink", secondary=vulnlib_vulnlinks)


class vulnlink(Base):
    __tablename__ = 'vulnlink'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    website_name = sqlalchemy.Column(sqlalchemy.String(length=50))
    url = sqlalchemy.Column(sqlalchemy.String(length=500))

# def add_vulnlib(session, cve, company, product, description, affected_versions, cvss, cvss_vector, cwe_type, links):
#     v = vulnlib()
#     v.name = cve[0:49]
#     v.description = description[0:1999]
#     v.company = company[0:49]
#     v.product = product[0:49]
#     v.affected_versions = affected_versions[0:254]
#     v.standard = True
#     v.creation_date = datetime.now()
#     v.modification_date = datetime.now()
#     v.cwe_type = cwe_type[0:49]
#     v.cvss = cvss
#     v.cvss_vector = cvss_vector[0:49]
#     v.cvss_manual = False
#     v.active = True
#     v.lang = 'EN-US'

#     links_transformed = []
#     for i in links:
#         l = vulnlink()
#         l.website_name = i[0][0:49]
#         l.url = i[1][0:499]
#         links_transformed.append(l)

#     v.vulnlinks = links_transformed

#     session.add(v)
#     session.commit()

#     if(PRINTABLE): print(v.name + ' added into db')

def exists_cve(session, cve):
    return session.query(exists().where(vulnlib.name==cve)).scalar()

def get_products_company(session):
    p = session.query(vulnlib).distinct(vulnlib.product).all()
    return {x.product: x.company for x in p}

def create_vulnlib(cve, company, product, description, affected_versions, cvss, cvss_vector, cwe_type, links):
    v = vulnlib()
    v.name = cve[0:49]
    v.description = description[0:1999]
    v.company = company[0:49]
    v.product = product[0:49]
    v.affected_versions = affected_versions[0:254]
    v.standard = True
    v.creation_date = datetime.now()
    v.modification_date = datetime.now()
    v.cwe_type = cwe_type[0:49]
    v.cvss = cvss
    v.cvss_vector = cvss_vector[0:49]
    v.cvss_manual = False
    v.active = True
    v.lang = 'EN-US'

    links_transformed = []
    for i in links:
        l = vulnlink()
        l.website_name = i[0][0:49]
        l.url = i[1][0:499]
        links_transformed.append(l)

    v.vulnlinks = links_transformed
    print('Vuln object ' + cve + ' created')
    return v

def add_vulnlib(session, v):
    if(not exists_cve(session,v.name)):
        session.add(v)
        session.commit()
        if(PRINTABLE): print(v.name + ' added into db')


# s = create_session()
# print(exists_cve(s,'CVE-2020-5735'))
# p = get_products_company(s)
# print('Company', list(p.values()))
# print('Products', list(p.keys()))
# print(p.get('Interactive Graphical SCADA System Data Server'))
# s.close()