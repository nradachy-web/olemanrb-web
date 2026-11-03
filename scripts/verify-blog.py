"""Verify the exported blog's routes, content, links and comment-free markup."""
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
output = root / "out"
prefix = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else ""
posts = json.loads((root / "src/content/blog.json").read_text())
manifest = json.loads((root / "src/content/blog-migration.json").read_text())
errors = []

def clean(text):
    return re.sub(r"\s+", " ", text).strip()

def target_path(url):
    path = unquote(urlparse(url).path)
    if prefix and path.startswith(prefix + "/"):
        path = path[len(prefix):]
    return output / path.lstrip("/")

for post in posts:
    page = output / post["slug"] / "index.html"
    if not page.exists():
        errors.append("Missing article: " + post["slug"])
        continue
    soup = BeautifulSoup(page.read_text(), "html.parser")
    prose = soup.select_one(".blog-prose")
    original = BeautifulSoup(post["html"], "html.parser")
    if not prose or clean(prose.get_text(" ")) != clean(original.get_text(" ")):
        errors.append("Article copy mismatch: " + post["slug"])
    if len(soup.find_all("h1")) != 1:
        errors.append("Heading hierarchy: " + post["slug"])
    canonical = soup.find("link", rel="canonical")
    if not canonical or canonical["href"] != f"https://olemanrb.com/{post['slug']}/":
        errors.append("Canonical mismatch: " + post["slug"])
    if soup.find(id="respond") or soup.find(id="comments") or soup.find("form") or soup.find("iframe"):
        errors.append("Comment/form/embed in article: " + post["slug"])
    for node in soup.select("img[src], .blog-prose a[href]"):
        url = node.get("src", node.get("href", ""))
        if "wp-content" in url or "wp-comments" in url:
            errors.append("WordPress dependency: " + url)
        if url.startswith("/") and not url.startswith("//"):
            target = target_path(url)
            if not target.is_file() and not (target / "index.html").is_file():
                errors.append("Missing linked asset/page: " + url)
        elif url.startswith("#") and not soup.find(id=url[1:]):
            errors.append("Broken article anchor: " + url)

slugs = set()
page_count = (len(posts) + 9) // 10
for page in range(1, page_count + 1):
    path = output / "category/blog" / (f"page/{page}/index.html" if page > 1 else "index.html")
    soup = BeautifulSoup(path.read_text(), "html.parser")
    for link in soup.select("a.blog-card"):
        slugs.add(urlparse(link["href"]).path.removeprefix(prefix).strip("/"))
if slugs != {p["slug"] for p in posts}:
    errors.append("Archive does not cover exactly all imported articles")
for slug, destination in manifest["aliases"].items():
    soup = BeautifulSoup((output / slug / "index.html").read_text(), "html.parser")
    refresh = soup.find("meta", attrs={"http-equiv": "refresh"})
    if not refresh or f"{prefix}/{destination}/" not in refresh["content"]:
        errors.append("Broken legacy article alias: " + slug)
for image in set(manifest["media"].values()):
    if not (output / image.lstrip("/")).is_file():
        errors.append("Missing imported image: " + image)
if errors:
    print("\n".join(sorted(set(errors))))
    raise SystemExit(1)
print(json.dumps({"articles": len(posts), "archivePages": page_count, "legacyAliases": len(manifest["aliases"]), "localImages": len(manifest["media"]), "copy": "preserved", "comments": "absent", "internalLinks": "passed", "basePath": prefix}, indent=2))
