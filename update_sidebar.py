#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
replace_header.py
Заменяет весь <header class="header">...</header> на новый HTML, как указано пользователем.
Создаёт бэкап оригинального файла.
"""

import os
import datetime
import urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path

# ====== НАСТРОЙКИ ======
SITE_ROOT = Path("/var/www/cimix/data/www/cimix.site")
SITEMAP_FILE = SITE_ROOT / "sitemap.xml"
BACKUP_DIR = SITE_ROOT.parent / "backups"
BACKUP_DIR.mkdir(exist_ok=True)

# ====== НОВЫЙ HEADER ======
NEW_HEADER = """<header class="header">
		<div class="header__wrap">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<div class="header__content">
							<!-- header logo -->
							<a href="https://animix.site/" class="header__logo">
								<img src="img/logo.svg" alt="">
							</a>
							<!-- end header logo -->

							<!-- header nav -->
							<ul class="header__nav">
								<!-- dropdown -->
								<li class="header__nav-item" href="https://animix.site/">
									<a class="dropdown-toggle header__nav-link" href="https://animix.site/">АНИМЕ</a>
								</li>

								<li class="header__nav-item">
									<a href="dorama.html" class="header__nav-link">Дорамы</a>
								</li>

								<li class="header__nav-item">
									<a href="top-100.html" class="header__nav-link">ТОП 100 АНИМЕ</a>
								</li>

								<li class="header__nav-item">
									<a href="multfilm.html" class="header__nav-link">Мультфильмы</a>
								</li>

								<li class="header__nav-item">
								  <div class="search-box">
									<input id="searchInput" type="text" placeholder="Поиск...">
									<button>
									  <!-- SVG иконка лупы -->
									  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<circle cx="11" cy="11" r="8" stroke-width="2"/>
										<line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
									  </svg>
									</button>
									<div id="results" class="search-results"></div>
								  </div>
								</li>
							</ul>
							<!-- end header nav -->

							<!-- header auth -->
							<div class="header__auth">
								<a href="signin.html" class="header__sign-in">
									<i class="icon ion-ios-log-in"></i>
									<span>Вход</span>
								</a>
							</div>
							<!-- end header auth -->

							<!-- header menu btn -->
							<button class="header__btn" type="button">
								<span></span>
								<span></span>
								<span></span>
							</button>
							<!-- end header menu btn -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- header search -->	  
		<!-- end header search -->
	</header>
"""

# ====== ФУНКЦИИ ======

def get_urls_from_sitemap(sitemap_file):
    tree = ET.parse(sitemap_file)
    root = tree.getroot()
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [url.find("ns:loc", ns).text for url in root.findall("ns:url", ns)]
    return urls

def process_file(file_path: Path):
    try:
        html = file_path.read_text(encoding="utf-8")

        start_idx = html.find('<header class="header">')
        end_idx = html.find('</header>', start_idx)
        if start_idx != -1 and end_idx != -1:
            end_idx += len('</header>')
            # бэкап
            backup_name = BACKUP_DIR / f"{file_path.name}.{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.bak"
            backup_name.write_text(html, encoding="utf-8")

            # замена header
            new_html = html[:start_idx] + NEW_HEADER + html[end_idx:]
            file_path.write_text(new_html, encoding="utf-8")
            print(f"[OK] {file_path}")
        else:
            print(f"[SKIP] {file_path} — <header> не найден")

    except Exception as e:
        print(f"[ERROR] {file_path}: {e}")

def main():
    urls = get_urls_from_sitemap(SITEMAP_FILE)
    for url in urls:
        rel_path = urllib.parse.urlparse(url).path.lstrip("/")
        file_path = SITE_ROOT / rel_path
        if file_path.is_file() and file_path.suffix.lower() == ".html":
            process_file(file_path)

if __name__ == "__main__":
    main()
