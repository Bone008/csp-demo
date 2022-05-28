import http.client
import requests
from scrapUrls import urls
"""
First test on our csp demo
"""
# conn = http.client.HTTPConnection("localhost", 3000)
# conn.request("GET", "/csp1/")
# resp = conn.getresponse()
# csp = resp.getheader("Content-Security-Policy")
# print(csp)
# conn.close()

def getCSP(dn):
  """
  Extracts the csp from the traget's website header
  """
  csp = None
  conn = http.client.HTTPConnection(dn, timeout=60)
  try:
    conn.request("GET", "/")
    resp = conn.getresponse()
    csp = resp.getheader("Content-Security-Policy")
  except:
    conn.close()
  return csp

def getCSPFromAbsoluteUrl(url):
  page = requests.get(url)
  return page.headers['Content-Security-Policy']

def analyzePolicy(csPolicy):
  """
  TODO
  """
  return 


def noCSP():
    """ Filters websites with no csp policy"""
    print(f" Number of websites {len(urls)}")
    count = 0
    for url in urls:
      csp = getCSP(url)
      if csp:
        print(count, url, csp)
      else:
        print(count, "In progress")
        count += 1
    print(f"Number of websites that implement CSP is :{len(urls) - count}")
  

noCSP()