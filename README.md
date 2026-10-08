# Yatra Nepal

A complete, responsive Nepal travel landing page inspired by the supplied cinematic destination reference. Built with **Next.js App Router + TypeScript, Tailwind CSS v4 and GSAP ScrollTrigger**.

## Quick start

Requires Node.js 20.9+ (Node.js 22 or 24 recommended) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production:

```sh
npm run build
npm start
```

`npm run build` produces a static site in `out/`. `npm start` uses the included dependency-free local preview server. Next's standard `next start` is not used because this project intentionally uses static export.

The ZIP also includes the already-built `out/` directory. To preview it immediately with Node.js, even before installing packages:

```sh
node scripts/serve.mjs
```

Use a web server rather than double-clicking `out/index.html`; assets use root-relative paths. Set `PORT` to change the preview port. Set `HOST=0.0.0.0` only if you want network access to the preview.

## Included

- Cinematic Himalayan hero, oversized NEPAL lettering and a foreground mountain mask.
- Original placeholder Yatra Nepal wordmark, responsive navigation and mobile menu.
- GSAP staggered hero entrance, mountain/title scroll movement, section reveals and reading progress.
- Reduced-motion support, semantic landmarks, visible keyboard focus and skip navigation.
- Destination preview controls, filters and accessible native detail dialogs.
- Three keyboard-operable experience tabs and expandable FAQs.
- Personal trip-outline builder with local text-file download.
- Three locally bundled Nepal photos, self-hosted Manrope, Playfair Display and Noto Sans Devanagari variable fonts, and credits/licenses.
- A prebuilt static export for immediate preview and simple hosting.

## Project structure

- `app/page.tsx`: page entry.
- `app/layout.tsx`: metadata and global styling.
- `app/globals.css`: Tailwind theme, responsive layout and visual styles.
- `components/nepal-experience.tsx`: UI, interactions and GSAP lifecycle.
- `lib/destinations.ts`: destination/experience copy and assets.
- `public/images/`: original photo assets.
- `public/fonts/`: locally served font files and font licenses.
- `public/CREDITS.txt`: image and font attribution.
- `scripts/serve.mjs`: static preview server.
- `out/`: generated production site; rebuild after edits.
- `DESIGN.md`: typography, palette, motion and asset guidance.

## Customisation

Change the brand in `Brand()` inside `components/nepal-experience.tsx`; update title and description in `app/layout.tsx`. Edit destination content in `lib/destinations.ts`. Main colours are CSS variables in `app/globals.css`.

The hero uses **the same photo twice**: a normal background and an SVG-clipped foreground. The SVG is a display mask, not a separately generated mountain. The mask follows the supplied Ama Dablam photo in a 1773 × 1407 viewBox. If you replace that photo, update the mask contour and viewBox to fit the new photograph. Keep background and foreground alignment and scroll transforms in sync.

Fonts are self-hosted and need no runtime Google Fonts request. Fontsource package entries are retained to document the font source; the production CSS uses the bundled files in `public/fonts/`.

## Deployment

- Vercel: import the project, install with `npm ci`, build with `npm run build`; use the Next.js preset.
- Static hosts / Netlify / Cloudflare Pages: build with `npm run build` and publish `out/`.
- Basic web hosting: upload the *contents* of `out/` to the site root.

No environment variables or API keys are required. For subdirectory hosting, configure Next.js `basePath` and adjust root-relative image/font URLs before rebuilding.

## Scope and honest behaviour

This is a complete front-end design, not a booking service. The brand and travel descriptions are concept content. The trip planner creates an inspiration outline in memory and downloads it to the visitor's device. It does not send messages, collect contact information, reserve travel, accept payment, check availability or save data on a server. No fake success confirmation is used.

A real business should replace the placeholder brand, add its own approved itineraries and connect booking/contact services before taking enquiries or payments. Photo and font rights are documented in `public/CREDITS.txt` and the bundled font licenses. GSAP and other dependencies retain their respective licenses.

## Checks

Run `npm run typecheck` and `npm run build`. The source has been compiled as a production Next.js static export. See `VALIDATION.md` for completed interface checks.
