import requests
from bs4 import BeautifulSoup

PRINTABLE = False    # shows console message when finish
URL = "https://nvd.nist.gov/vuln/detail/"

def parse_cvss(soup_cvss):
    return float(soup_cvss.text.split(' ')[0]) if soup_cvss else 0

def parse_vector(soup_vector):
    return soup_vector.text if soup_vector else 'TBD'

def parse_cwe(soup_cwe):
    return soup_cwe.text.replace("\n","") if soup_cwe else 'N/A'

def parse_vendor_link(soup_link):
    return soup_link.text.replace('\n','').replace('\xa0','').replace('\r','').replace('\t','')

def get_from_nvd_scraping(vuln: str):

    # get bs4
    page = requests.get(URL + vuln)
    soup = BeautifulSoup(page.text, "lxml")

    cvss = parse_cvss(soup.find('a', href=True, attrs={'id':'Cvss3CNCalculatorAnchor'}))
    if(cvss == 0):
        cvss = parse_cvss(soup.find('a', href=True, attrs={'id':'Cvss3NistCalculatorAnchor'}))

    vector = parse_vector(soup.find('span', attrs={'class': 'tooltipCvss3CnaMetrics'}))
    if(vector == 'TBD'):
        vector = parse_vector(soup.find('span', attrs={'class': 'tooltipCvss3NistMetrics'}))

    description = parse_cwe(soup.find('p', attrs={'data-testid': 'vuln-description'}))

    cwe = parse_cwe(soup.find('td', attrs={'data-testid': 'vuln-CWEs-link-1'}))
    if(cwe == 'N/A'):
        cwe = parse_cwe(soup.find('td', attrs={'data-testid': 'vuln-CWEs-link-0'}))

    # links -> [vendor, link]
    links = []
    table_link = soup.find('table', attrs={'data-testid': 'vuln-hyperlinks-table'})
    if(table_link):     # if table not exists
        table_rows = table_link.find('tbody').find_all('tr')
        for i in table_rows:
            table_row = i.find_all('td')
            links.append([parse_vendor_link(table_row[1]), table_row[0].text])

    if(PRINTABLE): print(vuln + ' nvd completed')

    return [cvss, vector, description, cwe, links]

# TEST
# VULN = 'CVE-2022-3133'
# get_from_nvd_scraping(VULN)