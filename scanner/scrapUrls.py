import requests
import sys
from bs4 import BeautifulSoup
import json

URL = "https://www.htmlstrip.com/alexa-top-1000-most-visited-websites"
URL2 = "https://dataforseo.com/wp-content/plugins/dataforseo-topsites/get-data.php"

def collect_urls():
  response = requests.post(URL2, {"action": "send_request", "location": "0"})
  return [row["domain"] for row in json.loads(response.text)]

def collect_urls_alexa():
  page = requests.get(URL)

  urls = []
  soup = BeautifulSoup(page.content, "html.parser")
  main_table = soup.find("div", {"class" : "table"})
  rows = main_table.find_all("div", {"class" : "row"})
  for row in rows[1:]:
    urls.append(row.find_all("div")[-1].text.strip())
  return urls

if __name__ == '__main__':
  urls = collect_urls()
  print('\n'.join(urls))
  print('Total results:', len(urls), file=sys.stderr)
