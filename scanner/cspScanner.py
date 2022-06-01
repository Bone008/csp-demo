import logging
import requests
import sys
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
  try:
    resp = requests.get('https://' + dn + '/', headers={
        # Simulate Google Chrome to avoid CSP responses that are conditional on user agent sniffing.
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
    })
    csp = resp.headers.get("Content-Security-Policy")
    csp_report_only = resp.headers.get("Content-Security-Policy-Report-Only")
    html_text = resp.text.lower()
    has_html = '<html' in html_text
    has_csp = bool(csp)
    has_reporting_csp = bool(csp_report_only)
    has_meta_csp = 'content-security-policy' in html_text

    if not csp and has_reporting_csp:
      csp = csp_report_only

    csv_row = [dn, resp.url, has_csp, has_reporting_csp, has_meta_csp, has_html, csp]
  except Exception as e:
    logging.exception(e)
    csv_row = [dn, 'CONNECTION ERROR', None, None, None, None, None]

  print(','.join(f'"{x}"' if isinstance(x, str) else str(x)
          for x in csv_row))
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
    print(f" Number of websites {len(urls)}", file=sys.stderr)
    print(','.join(['domain', 'url', 'has_csp', 'has_reporting_csp', 'has_meta_csp', 'has_html', 'csp']))
    count = 0
    for i, url in enumerate(urls):
      csp = getCSP(url)
      if csp:
        #print(count, url, csp)
        pass
      else:
        #print(count, url, "No CSP")
        count += 1
      print(f'[{i: 3} / {len(urls)}]', url, bool(csp), file=sys.stderr)
    print(f"Number of websites that implement CSP is :{len(urls) - count}", file=sys.stderr)
  

noCSP()