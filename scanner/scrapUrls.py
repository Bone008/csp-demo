import requests
from bs4 import BeautifulSoup

URL = "https://www.htmlstrip.com/alexa-top-1000-most-visited-websites"

page = requests.get(URL)

urls = []
soup = BeautifulSoup(page.content, "html.parser")
results = soup.find_all("div", {"class" : "col-6"})
for element in results:
  if element.find("img"):
    urls.append(element.text.strip())