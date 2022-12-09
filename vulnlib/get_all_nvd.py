from ast import arg
import datetime
from itertools import product
from dateutil.relativedelta import relativedelta
import requests
import save_into_db
from get_nvd_scraping import get_from_nvd_scraping
from bs4 import BeautifulSoup
import pandas as pd
import multiprocessing as mp

products_company = {}

PRINTABLE = True
MONTHS_AGO = 1
VULN_LIMIT = 200
URL = "https://nvd.nist.gov/vuln/full-listing/"

def generate_month_list(start, end):
    total_months = lambda dt: dt.month + 12 * dt.year
    mlist = []
    for tot_m in list(range(total_months(start), total_months(end))):
        y, m = divmod(tot_m, 12)
        mlist.append(str(y)+'/'+str(m+1))
    return mlist

def get_cves_by_month_str(m):
    page = requests.get(URL + m)
    soup = BeautifulSoup(page.text, "lxml")
    spans = soup.find_all('span', attrs={'class': 'col-md-2'})
    cves = []
    for s in spans:
        a = s.find('a', href=True)
        cves.append(a.text)
    print('Vulns from ' + m + ' extracted')
    return cves

def get_all_cves_from_nvd():
    now = datetime.datetime.now()
    past = now + relativedelta(months=-MONTHS_AGO)
    months = generate_month_list(past, now)
    cves = []
    if __name__ == '__main__':
        pool = mp.Pool(mp.cpu_count())
        with pool as p:
            m = p.map(get_cves_by_month_str,months)
            for x in m:
                cves.extend(x)
        pool.close()
    return cves

##########################

# get vuln object
def get_vulnlib(cve):
    [cvss, vector, description, cwe, links] = get_from_nvd_scraping(cve)
    company = ''
    product = ''
    for p in list(products_company.keys()):
        if(p!='' and p in description):
            product = p
            company = products_company.get(p)
            break
    v = save_into_db.create_vulnlib(cve = cve, company = company, product = product, description = description, affected_versions = '', cvss = cvss, cvss_vector = vector, cwe_type = cwe, links= links)
    return v

# save vulns into db
def save_all_cves_from_nvd():
    cves = get_all_cves_from_nvd()[0:100]
    s = save_into_db.create_session()
    products_company.clear()
    products_company.update(save_into_db.get_products_company(s))
    vulns = []
    if __name__ == '__main__':
        pool = mp.Pool(mp.cpu_count())
        with pool as p:
            m = p.map(get_vulnlib,cves)
            vulns.extend(m)
            pool.close()
    for v in vulns:
        save_into_db.add_vulnlib(session=s,v=v)
    s.close()
        

save_all_cves_from_nvd()