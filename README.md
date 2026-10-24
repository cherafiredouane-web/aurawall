# AURA WALL — Premium Plexiglass Art Gallery

A polished, responsive static website for AURA WALL with English/Arabic UI, right-to-left Arabic layout, searchable artwork, category and artwork pages, personalized-art requests, and WhatsApp ordering. It is built without a framework or third-party runtime dependencies, so the deployed site stays lightweight and fast.

## Preview locally

You only need Node.js installed. In this folder, run:

```bash
npm install
npm run dev
```

Then open **http://localhost:4173**. Stop the preview with `Ctrl+C`.

## Build

```bash
npm run build
```

The ready-to-deploy site is written to `dist/`.

## Publish on GitHub Pages

1. Extract the project ZIP on your computer.
2. Create or open the GitHub repository you want to publish. For a new repository, `main` is the simplest branch to use.
3. Upload the **contents of this project folder** (not the ZIP file itself) to the repository, including the `.github` folder and `.nojekyll` file. GitHub Desktop is the easiest way to upload the full folder if you do not use Git locally yet.
4. Commit and push the files to `main` or `master`.
5. In the repository, open **Settings → Pages**. Set the build/deployment source to **GitHub Actions**.
6. Open the **Actions** tab. The workflow named **Deploy AURA WALL to GitHub Pages** will build and publish the site. When it finishes successfully, open the Pages URL shown by the workflow.

The included workflow rebuilds and deploys the site on each push to `main` or `master`. No Vite configuration, server, database, or environment secret is required.

## What is included

- AURA WALL home page with the supplied, unmodified hero image and logo
- Four category experiences; mobile category covers are full-width and vertically stacked
- 173 artwork entries with artwork pages, descriptive titles, search tags, and related suggestions
- Anime subcategories: Naruto, One Piece, Dragon Ball Z, and More Anime
- English and Arabic language switcher, including Arabic RTL layout
- Live search and full search-results page
- Personalized-art studio with request form
- WhatsApp CTAs using **+212 627 025 271**, with pre-filled messages
- Unique page titles, descriptions, and structured metadata for category and artwork pages
- GitHub Pages workflow and a local static preview server

## Updating the gallery

The artwork catalogue is maintained in `data/products.json`. Each item stores its title, category, subcategory, franchise, character, tags, image path, description, and URL route. New artwork images go under `assets/artworks/`.

After changing the catalogue, run the route generator to refresh the front-end catalogue and static artwork pages:

```bash
python scripts/build_routes.py
npm run build
```

Then commit and push the changed files. For a new artwork, add a descriptive title, tags and image path rather than a generic filename-based title. Keep the original hero source file at `assets/brand/hero-image-cover.png` unchanged.

## WhatsApp

The number is configured in `assets/js/app.js` as `212627025271` (country code included, no `+` or spaces, as required by the `wa.me` URL format). Update that constant if the business number changes.

## Notes

- Product prices are intentionally not displayed anywhere on the storefront.
- Artwork orders and personalized requests open WhatsApp; payments and order management are handled in chat, not through an online checkout.
- Arabic navigation and UI are localized, while proper names and artwork titles remain in their original form for easier searching.
- The supplied hero image and original category-cover assets are copied without editing or recompression.
