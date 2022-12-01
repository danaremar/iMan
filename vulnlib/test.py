import requests
from get_nvd_scraping import get_from_nvd_scraping
import save_into_db
import multiprocessing as mp

PARALLEL = True
URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"

# get all from cisa
def get_from_cisa():
    page = requests.get(URL)
    json = page.json()
    return json['vulnerabilities']

def get_vulnlib(v):
    [cvss, vector, description, cwe, links] = get_from_nvd_scraping(v['cveID'])
    return save_into_db.create_vulnlib(cve = v['cveID'], company = v['vendorProject'], product = v['product'], description = v['shortDescription'], affected_versions = '', cvss = cvss, cvss_vector = vector, cwe_type = cwe, links= links)

# save all vulns
def save_all_cisa_vulns():
    s = save_into_db.create_session()
    vulns = get_from_cisa()
    vulns_obj = []
    if __name__ == '__main__':
        pool = mp.Pool(mp.cpu_count())
        with pool as p:
            m = p.map(get_vulnlib,vulns)
            vulns_obj.extend(m)
        pool.close()

    for v in vulns_obj:
        save_into_db.add_vulnlib(session=s, v=v)
    s.close()

save_all_cisa_vulns()

