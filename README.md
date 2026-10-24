# AURA WALL

Premium interactive art-gallery / e-commerce website for AURA WALL, built with React + Vite.

## Included

- Premium iOS-inspired responsive UI
- Desktop / tablet / mobile layouts
- Mobile category covers stacked vertically
- Anime / Gaming / Movies & Series / Personalized Art
- Central product data in `src/data.js`
- Product detail routes
- Global artwork search
- Arabic / English language switcher with RTL support
- WhatsApp ordering with pre-filled artwork messages
- Responsive hero using the supplied hero image without altering the asset
- Lazy-loaded product imagery
- Reduced-motion support
- SEO-friendly artwork slugs
- GitHub-ready project structure

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This is a Vite SPA. For GitHub Pages, enable Pages using GitHub Actions and deploy the `dist` output. If the repository is served from a project sub-path rather than a custom domain, set the Vite `base` option in `vite.config.js` to the repository name.

## Add artworks

Edit `src/data.js` and add another product object:

```js
{
  id: "aw-101",
  title: "Your Artwork Name",
  category: "Anime",
  subcategory: "Naruto",
  franchise: "Naruto",
  character: "Your Character",
  image: "/assets/path/to/image.jpg",
  description: "Short description.",
  tags: ["anime", "naruto", "character"],
  slug: "your-artwork-name"
}
```

No price field is used anywhere in the catalog.

## WhatsApp

The ordering number is configured in `src/main.jsx` as:

`212627025271`

