from bs4 import BeautifulSoup
import json
import requests
from datetime import datetime
import dateutil.parser


def get_author(row):
    author = row.find_all('td', class_="author")[0].div.a.get_text().strip()
    author = author.split(", ")
    author.reverse()
    author = " ".join(author)
    return author


def get_title(row):
    return row.find_all('td', class_="title")[0].div.a.get_text().strip().splitlines()[0]


def get_link(row):
    link = row.find_all('td', class_="title")[0].div.a['href']
    link = "https://www.goodreads.com{}".format(link)
    return link


def get_num_pages(row):
    try:
        return int(row.find_all('td', class_="num_pages")[0].div.nobr.get_text().strip().splitlines()[0])
    except:
        return None


def get_date(row, class_):
    try:
        field = row.find_all('td', class_=class_)[0].div.get_text().strip()
        if "not set" in field:
            return None
        return dateutil.parser.parse(field).date()
    except:
        return None


def parse_row(row):
    return {
        'title': get_title(row),
        'author': get_author(row),
        'link': get_link(row),
        'pages': get_num_pages(row),
        'date_started': get_date(row, "date_started"),
        'date_read': get_date(row, "date_read"),
        'date_added': get_date(row, "date_added"),
    }


def get_books_page(user, shelf=None, page=0):
    url = "https://www.goodreads.com/review/list/{}?shelf={}&page={}".format(
        user, shelf, page)

    response = requests.get(url)
    if response.status_code != 200:
        return []

    content = response.content.decode('utf-8')
    soup = BeautifulSoup(content, "html.parser")
    rows = soup.find_all('tr', class_='review')

    return [parse_row(row) for row in rows]


def get_books(user, shelf):
    output = []
    page = 0
    res = get_books_page(user, shelf, page)
    while len(res) > 0:
        page += 1
        res = get_books_page(user, shelf, page)
        output += res

    return output


user = "22830084"
shelf = "currently-reading"
books = get_books_page(user, shelf)

print(json.dumps(books, ensure_ascii=False, indent=2, default=str))
