#!/usr/bin/env python3
"""Generate crawlable static category and artwork routes for GitHub Pages."""
from pathlib import Path
import json, html

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = (ROOT / 'site-template.html').read_text(encoding='utf-8')
PRODUCTS = json.loads((ROOT / 'data/products.json').read_text(encoding='utf-8'))
(ROOT / 'assets/js/catalog.js').write_text('window.AURA_PRODUCTS = ' + json.dumps(PRODUCTS, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')

CATEGORIES = {
    'anime': ('Anime Wall Art | AURA WALL', 'Explore premium anime-inspired plexiglass wall art, including Naruto, One Piece, Dragon Ball Z and more anime collections.'),
    'anime/naruto': ('Naruto Wall Art | AURA WALL', 'Discover Naruto-inspired wall art featuring shinobi portraits, Sharingan-inspired artwork, Akatsuki themes and more.'),
    'anime/one-piece': ('One Piece Wall Art | AURA WALL', 'Explore One Piece-inspired wall art featuring pirates, Luffy, Zoro and bold anime artwork.'),
    'anime/dragon-ball-z': ('Dragon Ball Z Wall Art | AURA WALL', 'Discover Dragon Ball Z-inspired wall art featuring Saiyan energy, Goku, Vegeta and legendary rivals.'),
    'anime/more-anime': ('More Anime Wall Art | AURA WALL', 'Browse more anime-inspired wall art from dark fantasy, shonen and beloved anime worlds.'),
    'gaming': ('Gaming Wall Art | AURA WALL', 'Discover premium gaming-inspired plexiglass wall art, from neon cityscapes to iconic game worlds and characters.'),
    'movies-series': ('Movies & Series Wall Art | AURA WALL', 'Explore cinematic wall art inspired by movies, cult series and unforgettable screen characters.'),
    'personalized-art': ('Personalized Plexiglass Wall Art | AURA WALL', 'Create personalized plexiglass wall art from your photo, favourite character, couple portrait, gaming idea or custom concept.'),
    'search': ('Search the AURA WALL Gallery', 'Search AURA WALL artwork by character, anime, franchise, game, movie, series, category or title.'),
}

def esc(x):
    return html.escape(str(x or ''), quote=True)

def render_page(title, description, base_href, fallback, schema, path=''):
    asset_prefix = base_href
    json_ld = json.dumps(schema, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    page = TEMPLATE.replace('{{BASE_HREF}}', base_href)
    page = page.replace('{{ASSET_PREFIX}}', asset_prefix)
    page = page.replace('{{TITLE}}', esc(title))
    page = page.replace('{{DESCRIPTION}}', esc(description))
    page = page.replace('{{JSON_LD}}', json_ld)
    page = page.replace('{{FALLBACK}}', fallback)
    return page

def base_for(depth):
    return './' if depth == 0 else '../' * depth

def write_route(route, title, description, fallback, schema):
    parts = [x for x in route.split('/') if x]
    folder = ROOT.joinpath(*parts)
    folder.mkdir(parents=True, exist_ok=True)
    depth = len(parts)
    base = base_for(depth)
    page = render_page(title, description, base, fallback, schema, route)
    (folder / 'index.html').write_text(page, encoding='utf-8')

home_schema = {
    '@context':'https://schema.org', '@type':'WebSite', 'name':'AURA WALL',
    'description':'Premium plexiglass wall art inspired by anime, gaming, movies, series and personal stories.',
    'inLanguage':['en','ar']
}
home_fallback = '''<main id="main" class="route-fallback"><p class="kicker">Premium plexiglass wall art</p><h1>Give Your Walls an Aura.</h1><p>Premium plexiglass wall art inspired by the worlds you love.</p><img src="./assets/brand/hero-image-cover.png" width="680" height="576" alt="AURA WALL’s original iridescent glass A emblem"><p><a href="./anime/">Explore anime wall art</a> · <a href="./gaming/">Gaming</a> · <a href="./movies-series/">Movies &amp; series</a> · <a href="./personalized-art/">Personalized art</a></p></main>'''
(ROOT / 'index.html').write_text(render_page('AURA WALL — Premium Plexiglass Wall Art', 'Give your walls an Aura. Explore premium plexiglass wall art inspired by anime, gaming, movies, series and personalized ideas.', './', home_fallback, home_schema), encoding='utf-8')

for route, (title, desc) in CATEGORIES.items():
    if route == 'search':
        fallback = f'''<main id="main" class="route-fallback"><p class="kicker">AURA WALL</p><h1>Search the gallery</h1><p>{esc(desc)}</p><form action="../search/" method="get"><label for="fallback-q">Search artwork</label> <input id="fallback-q" name="q" type="search"><button type="submit">Search</button></form></main>'''
    elif route == 'personalized-art':
        fallback = f'''<main id="main" class="route-fallback"><p class="kicker">Personalized art studio</p><h1>Create something that is yours.</h1><p>{esc(desc)}</p><img src="../assets/categories/personalized-art.jpg" width="960" height="370" alt="Personalized plexiglass wall art category cover"></main>'''
    else:
        cover = 'anime' if route.startswith('anime') else ('gaming' if route == 'gaming' else 'movies-series')
        depth = len([p for p in route.split('/') if p])
        asset_relative = '/'.join(['..'] * depth + ['assets/categories', cover+'.jpg'])
        root_relative = '/'.join(['..'] * depth) + ('/' if depth else './')
        fallback = f'''<main id="main" class="route-fallback"><p class="kicker">AURA WALL gallery</p><h1>{esc(title.split('|')[0].strip())}</h1><p>{esc(desc)}</p><img src="{asset_relative}" alt="{esc(title)}" width="1200" height="600"><p><a href="{root_relative}">Back to AURA WALL</a></p></main>'''
    schema = {'@context':'https://schema.org','@type':'CollectionPage','name':title,'description':desc,'inLanguage':['en','ar']}
    write_route(route, title, desc, fallback, schema)

for p in PRODUCTS:
    route = p['route']
    title = f"{p['title']} | AURA WALL"
    description = f"Explore {p['title']} as premium plexiglass wall art at AURA WALL. Ask about this artwork and available finish options on WhatsApp."
    parts = route.split('/')
    depth = len(parts)
    asset_relative = '/'.join(['..'] * depth + p['image'].split('/'))
    parent_route = '/'.join(parts[:-1]) + '/'
    parent_relative = '/'.join(['..'] * depth) + '/' # from the detail directory to site root
    fallback = f'''<main id="main" class="route-fallback"><p class="kicker">{esc(p['categoryLabel'])} · AURA WALL</p><article><img src="{asset_relative}" alt="{esc(p['title'])} — premium plexiglass wall art" width="700" height="920"><h1>{esc(p['title'])}</h1><p>{esc(p['description'])}</p><p><a href="{parent_relative}{parent_route}">Back to collection</a></p><p><a href="https://wa.me/212627025271?text={esc('Hello AURA WALL, I would like to ask about the artwork: '+p['title'])}">Ask about this artwork on WhatsApp</a></p></article></main>'''
    schema = {
        '@context':'https://schema.org','@type':'VisualArtwork','name':p['title'],
        'artform':'Digital art for plexiglass wall art','description':p['description'],
        'image':asset_relative,'artMedium':'Plexiglass wall art','genre':p['categoryLabel'],
        'keywords':', '.join(p.get('tags',[])), 'inLanguage':'en'
    }
    write_route(route, title, description, fallback, schema)

# GitHub Pages should serve this as a plain static site (including directories beginning with a dot).
(ROOT / '.nojekyll').write_text('', encoding='utf-8')
print(f'Generated {1 + len(CATEGORIES) + len(PRODUCTS)} static pages.')
