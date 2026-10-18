# sahilshah.in

Personal site. Next.js 16 (App Router, fully static), Tailwind 4, Framer Motion.

```bash
npm ci
npm run dev     # http://localhost:3000
npm run check   # typecheck + lint + production build
```

- Copy lives in `lib/content.ts`. Add `href` to a project to make its title a link.
- Photos: `public/images/img-<id>-{640,1200}.webp`, metadata stripped. Alt text is in `lib/content.ts`.
- Link-preview image is generated at build time by `app/opengraph-image.tsx` (Geist Mono, OFL, in `assets/fonts`).
