# Speedy Corner Website

Marketing website for Speedy Corner built with Next.js App Router, React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

- Next.js `16.2.1` (App Router)
- React `19.2.4`
- TypeScript
- Tailwind CSS v4
- ESLint 9 + `eslint-config-next`

## Local Development

Install dependencies and start dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Routes

- `/` Home page (hero, locations, services, promo banner)
- `/about` About page
- `/promotions` Promotions page
- `/contact` Contact page with client-side success modal

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    promotions/page.tsx
    contact/page.tsx
    globals.css
  components/
    navbar.tsx
    footer.tsx
    hero-carousel.tsx
    locations-section.tsx
    what-we-provide-section.tsx
    promo-banner.tsx
    contact-form-section.tsx
  constants/
    navigation.ts
    carousel.ts
    locations.ts
    provided-services.ts
public/
  speedy-corner-logo.webp
  home-promo-banner.webp
  carousel/
```

## SEO Notes

Home page metadata is configured in `src/app/page.tsx` with:

- title and description
- canonical URL
- Open Graph and Twitter metadata
- robots directives
- JSON-LD structured data

Set this environment variable in production:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If unset, the app falls back to `https://www.speedycorner.com`.

## Form Behavior

The contact form currently uses client-side submit behavior and shows a success modal. It does not yet send data to a backend API.

## Design System Notes

- Primary brand accent is `--accent` in `src/app/globals.css`.
- Shared content blocks are defined under `src/constants/*`.
- New sections should follow existing spacing and typography conventions used in `about`, `promotions`, and home sections.
