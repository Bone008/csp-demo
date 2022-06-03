import logging
import requests
import sys
from scrapUrls import collect_urls

"""
First test on our csp demo
"""
# conn = http.client.HTTPConnection("localhost", 3000)
# conn.request("GET", "/csp1/")
# resp = conn.getresponse()
# csp = resp.getheader("Content-Security-Policy")
# print(csp)
# conn.close()


CSV_HEADER = ['domain', 'url', 'has_csp', 'has_reporting_csp', 'has_meta_csp', 'has_html', 'csp_default_src', 'csp_script_src', 'csp']

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
    
    # Extract default-src and script-src for easier analysis
    csp_default_src = None
    csp_script_src = None
    if csp:
      for part in csp.split(';'):
        spart = part.strip()
        if spart.startswith('default-src'):
          csp_default_src = spart
        if spart.startswith('script-src'):
          csp_script_src = spart
      

    csv_row = [dn, resp.url, has_csp, has_reporting_csp, has_meta_csp, has_html, csp_default_src, csp_script_src, csp]
  except Exception as e:
    logging.exception(e)
    csv_row = [dn, 'CONNECTION ERROR', None, None, None, None, None, None, None]

  return csv_row

def getCSPFromAbsoluteUrl(url):
  page = requests.get(url)
  return page.headers['Content-Security-Policy']

def analyzePolicy(csPolicy):
  """
  TODO
  """
  return 


def main():
  urls = collect_urls()
  print(f" Number of websites {len(urls)}", file=sys.stderr)
  print(','.join(CSV_HEADER))
  for i, url in enumerate(urls):
    if i < 849:
      continue
    csv_row = getCSP(url)
    print(','.join(f'"{x}"' if isinstance(x, str) else str(x)
            for x in csv_row))
            
    print(f'[{i: 3} / {len(urls)}]', url, bool(csv_row[-1]), file=sys.stderr)
    sys.stdout.flush()
  

if __name__ == '__main__':
  main()
