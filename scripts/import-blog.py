"""Import an already-downloaded public WordPress export into static content.

No credentials, comments, forms or executable WordPress markup are imported.
Run: python3 scripts/import-blog.py ../evidence
Requires beautifulsoup4. Images are copied from the real source URLs.
"""
import concurrent.futures
import hashlib
import html
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1]).resolve()
DEST = ROOT / "src/content"
MEDIA = ROOT / "public/blog"
DEST.mkdir(parents=True, exist_ok=True)
MEDIA.mkdir(parents=True, exist_ok=True)
posts = json.loads((SOURCE / "wordpress-posts.json").read_text())
pages = json.loads((SOURCE / "wordpress-pages.json").read_text())
# This article was published as a WordPress page rather than a post.
posts += [p for p in pages if p["id"] == 1126]
legal = []  # Legal and internal WordPress pages are outside this blog-only migration.

def normalize(value):
    return html.unescape(value).replace("\u2014", ", ").replace("\u2013", "-")

def plain(value):
    return re.sub(r"\s+", " ", normalize(value)).strip()

def editorial_content(post):
    soup = BeautifulSoup(post["content"]["rendered"], "html.parser")
    # Elementor embeds live recommendations and repeated page chrome in its API.
    for el in soup.select('[data-widget_type="posts.classic"], [data-widget_type="post-info.default"], [data-widget_type="theme-post-title.default"], [data-widget_type="button.default"], [data-widget_type="spacer.default"], [data-widget_type="divider.default"]'):
        el.decompose()
    for el in soup.find_all(re.compile("^h[1-6]$")):
        if plain(el.get_text(" ")) == "Other Posts You May Like":
            el.decompose()
    for el in soup.find_all(["script", "style", "iframe", "form", "input", "button", "textarea", "select", "nav"]):
        el.decompose()
    for el in soup.find_all(string=lambda t: isinstance(t, Comment)):
        el.extract()
    return soup

soups = {p["id"]: editorial_content(p) for p in posts + legal}
image_urls = set()
featured = {}
for p in posts + legal:
    for img in soups[p["id"]].find_all("img"):
        if img.get("src"):
            image_urls.add(img["src"])
    media = p.get("_embedded", {}).get("wp:featuredmedia", [])
    if media and media[0].get("source_url"):
        sizes = media[0].get("media_details", {}).get("sizes", {})
        image = sizes.get("large", {}).get("source_url") or media[0]["source_url"]
        featured[p["id"]] = (image, media[0].get("alt_text", ""))
        image_urls.add(image)

def download(url):
    parsed = urlparse(url)
    if parsed.hostname not in ("olemanrb.com", "www.olemanrb.com") or not parsed.path.startswith("/wp-content/uploads/"):
        raise ValueError("Unexpected image source: " + url)
    suffix = Path(unquote(parsed.path)).suffix.lower()
    if suffix not in (".png", ".jpg", ".jpeg", ".webp", ".gif"):
        raise ValueError("Unexpected media type: " + suffix)
    filename = hashlib.sha256(url.encode()).hexdigest()[:18] + suffix
    path = MEDIA / filename
    if not path.exists():
        safe_url = quote(url, safe=":/?=&%")
        subprocess.run(["/usr/bin/curl", "--fail", "--silent", "--show-error", "--retry", "2", "--max-time", "45", safe_url, "-o", str(path)], check=True)
    if path.stat().st_size < 100:
        raise ValueError("Empty image: " + url)
    return url, "/blog/" + filename

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    images = dict(pool.map(download, sorted(image_urls)))

ALLOWED = {"p", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "b", "i", "u", "a", "br", "hr", "blockquote", "figure", "figcaption", "img", "table", "thead", "tbody", "tr", "th", "td", "caption", "sup", "sub"}
aliases = {
    "safeguard-your-home-this-winter-expert-emergency-tree-removal-near-grand-rapids-mi": "expert-emergency-tree-removal-near-grand-rapids-mi",
    "elementor-810": "how-to-find-licensed-tree-removal-experts-in-greenville-mi",
}
legacy_paths = {
    "/about-us/": "/about/", "/service-area/": "/service-areas/",
    "/category/services/": "/services/", "/full-service-tree-removal/": "/services/tree-removal/",
    "/tree-trimming/": "/services/tree-trimming/", "/storm-damage-cleanup/": "/services/storm-damage-cleanup/",
    "/stump-grinding/": "/services/stump-grinding/", "/crane-assisted-tree-removal/": "/services/crane-assisted-removal/",
    "/lot-clearing/": "/services/lot-clearing/",
}

def article(post, kind):
    soup = soups[post["id"]]
    title = plain(BeautifulSoup(post["title"]["rendered"], "html.parser").get_text(" "))
    original_text = plain(soup.get_text(" "))
    for text in soup.find_all(string=True):
        text.replace_with(normalize(str(text)))
    toc = []
    used_ids = set()
    for el in list(soup.find_all(True)):
        if el.name == "h1":
            el.name = "h2"
        if el.name not in ALLOWED:
            el.unwrap()
            continue
        attrs = dict(el.attrs)
        el.attrs = {}
        if el.name == "img":
            if attrs.get("src") not in images:
                el.decompose()
                continue
            el["src"] = images[attrs["src"]]
            el["alt"] = plain(attrs.get("alt", ""))
            el["loading"] = "lazy"
            el["decoding"] = "async"
            for key in ("width", "height"):
                if str(attrs.get(key, "")).isdigit():
                    el[key] = attrs[key]
        elif el.name == "a":
            href = html.unescape(attrs.get("href", "")).strip()
            parsed = urlparse(href)
            if parsed.scheme not in ("", "http", "https", "tel", "mailto"):
                el.unwrap()
                continue
            if parsed.hostname in ("olemanrb.com", "www.olemanrb.com"):
                path = parsed.path or "/"
                if path.endswith("/embed/"):
                    path = path[:-6]
                slug = path.strip("/")
                path = "/" + aliases[slug] + "/" if slug in aliases else legacy_paths.get(path, path)
                href = path + ("?" + parsed.query if parsed.query else "") + ("#" + parsed.fragment if parsed.fragment else "")
            el["href"] = href
            if parsed.scheme in ("http", "https") and parsed.hostname not in ("olemanrb.com", "www.olemanrb.com"):
                el["rel"] = "noopener noreferrer"
        elif el.name in ("th", "td"):
            for key in ("colspan", "rowspan"):
                if str(attrs.get(key, "")).isdigit():
                    el[key] = attrs[key]
        if el.name in ("h2", "h3", "h4", "h5", "h6"):
            text = plain(el.get_text(" "))
            slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-") or "section"
            anchor = slug
            n = 2
            while anchor in used_ids:
                anchor = f"{slug}-{n}"
                n += 1
            used_ids.add(anchor)
            el["id"] = anchor
            if el.name == "h2" and text:
                toc.append({"id": anchor, "title": text})
    # Empty builder spacers are omitted; editorial text stays unchanged.
    for el in list(soup.find_all(["p", "figure", "strong", "em", "h2", "h3", "h4", "h5", "h6"])):
        if not el.get_text(strip=True) and not el.find("img"):
            el.decompose()
    final_text = plain(soup.get_text(" "))
    if original_text != final_text:
        raise ValueError(f"Copy changed during import: {post['id']}")
    paragraphs = [plain(p.get_text(" ")) for p in soup.find_all("p") if len(plain(p.get_text(" "))) > 90]
    excerpt = paragraphs[0] if paragraphs else final_text
    if len(excerpt) > 190:
        excerpt = excerpt[:187].rsplit(" ", 1)[0] + "..."
    first_image = soup.find("img")
    featured_url, featured_alt = featured.get(post["id"], (None, ""))
    image = images[featured_url] if featured_url else (first_image["src"] if first_image else "/photos/hero-crew-1600.webp")
    return {
        "id": post["id"], "slug": post["slug"], "title": title, "kind": kind,
        "published": post["date"], "modified": post["modified"],
        "excerpt": excerpt, "image": image, "imageAlt": plain(featured_alt or (first_image.get("alt", "") if first_image else "")),
        "readingMinutes": max(1, round(len(final_text.split()) / 220)), "toc": toc,
        "html": str(soup), "sourceUrl": post["link"],
    }

articles = [article(p, "post") for p in posts] + [article(p, "legal") for p in legal]
articles.sort(key=lambda p: p["published"], reverse=True)
(DEST / "blog.json").write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n")
manifest = {
    "source": "https://olemanrb.com/wp-json/wp/v2/posts", "importedAt": "2026-11-03",
    "posts": len(posts), "legalPages": len(legal), "images": len(images),
    "copiedTextVerified": True, "aliases": aliases, "media": images,
    "routes": [{"id": p["id"], "path": "/" + p["slug"] + "/", "sourceUrl": p["sourceUrl"]} for p in articles],
}
(DEST / "blog-migration.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(f"Imported {len(posts)} articles, {len(legal)} legal pages, {len(images)} local images. All editorial text preserved.")
