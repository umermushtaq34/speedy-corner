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
- `/careers` Careers grid using static job descriptions
- `/careers/[slug]` Job details and application form (currently `/careers/cashier`)

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

### Career applications

Edit `src/constants/jobs.ts` to add or update positions, expectations, responsibilities, and skills. The listing, application routes, metadata, and sitemap use this file.

The career form includes personal information, skills, up to six employers, education, seven-day availability, two optional references, and required applicant certification. The selected position comes from the route and is submitted as a hidden field. Optional sections can be left blank; partially filled employers require a name, position, and employment dates, and references require a name and contact method.

`POST /api/careers/[slug]` validates the position and application on the server, enforces same-origin requests, and limits request size. **Delivery is intentionally not configured yet.** The endpoint returns `503` for valid applications, and the form clearly states that nothing has been sent or saved. Entries remain in the open page after a failed submission; reloading or leaving the page clears them.

To connect Brevo later, replace the final `503` response in `src/app/api/careers/[slug]/route.ts` with delivery of the validated `data` and server-resolved `job.title`. Keep credentials on the server, add production rate limiting with the delivery integration, handle provider failures, and return success only after acceptance. Applicant data must not be logged. The client already handles pending, field errors, delivery failures, and confirmed success.

Careers SEO includes unique titles and descriptions, canonical URLs, Open Graph/Twitter metadata, breadcrumb and page structured data, the opening list, and sitemap entries. JobPosting rich-result data is deferred until verified posting dates and hiring locations are supplied.

## Design System Notes

- Primary brand accent is `--accent` in `src/app/globals.css`.
- Shared content blocks are defined under `src/constants/*`.
- New sections should follow existing spacing and typography conventions used in `about`, `promotions`, and home sections.
