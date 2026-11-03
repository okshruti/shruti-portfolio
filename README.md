# Shruti Sharma — Portfolio

A personal portfolio built with React, TypeScript, TanStack Start, Vite, Tailwind CSS, Motion, and Three.js / React Three Fiber.

## Run locally

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Netlify

This project uses TanStack Start (SSR), so it needs the Netlify TanStack Start Vite plugin rather than a static-site-only configuration. The plugin and build settings are configured in `vite.config.ts` and `netlify.toml`.

Connect this GitHub repository to Netlify and deploy from the `main` branch. Netlify uses `npm install && npm run build` and publishes `dist/client`. Node.js 22 is selected in `netlify.toml`.

## Project structure

- `src/components/portfolio` — portfolio sections and 3D hero
- `src/components/ui` — reusable UI components
- `src/data/portfolio.ts` — portfolio content
- `src/routes` — TanStack Router routes

## Notes

- Never commit `.env` files, credentials, or API keys.
- Replace placeholder social, project, resume, and contact destinations with verified links before publishing.
- The contact form currently opens the visitor's email application; it does not submit to a hosted email service.
