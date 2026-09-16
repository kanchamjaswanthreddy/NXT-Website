# NXT Financial Group — website (v4)

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · TypeScript

## Run
```
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```
Deploys to Vercel with zero config.

## What the site covers
Five solution lines only: Annuities, Life Insurance, Care Planning, Medicare Planning, Disability Income.
Routes: `/`, `/solutions`, `/solutions/[slug]` (5), `/carriers`, `/about`, `/resources` (3 calculators), `/insights`, `/insights/[slug]` (5 articles), `/contact`, `/partner`, `/referral`, `/privacy-policy`, `/terms`.

## Where content lives
- `lib/solutions.ts` — the five lines: headline, intro, sub-products, fit, process, image
- `lib/carriers.ts` — carrier partners grouped by solution, with AM Best rating and optional logo
- `lib/insights.ts` — articles
- `lib/team.ts` — advisors
- `app/globals.css` — brand tokens (`@theme`) per Brand Guidelines v2.0

## ⚠ Before going live — please verify
1. **Carrier list and ratings.** `lib/carriers.ts` contains a representative list of carriers typical for each line, with approximate AM Best ratings. Your brand guide prohibits naming a carrier without current approval. Edit the list to match your actual appointments and confirm ratings.
2. **Carrier logos.** Carriers render as typographic wordmarks by default. To show a logo, add a file to `public/logos/` and set `logo: '/logos/<file>.svg'` on that carrier.
3. **Claims in copy.** "Zero uncovered losses", "$0 cost to you", "A-rated carriers only", "paid by the carrier, never by you" — keep only those that are true for NXT.
4. **Medicare disclaimer.** The footer carries the standard "we do not offer every plan available in your area" language required by CMS; confirm the wording with compliance.
5. **Forms.** Contact, Partner and Referral forms show a success state but do not send. Wire `onSubmit` to your CRM or a Route Handler at `app/api/lead/route.ts`.
6. **Photos.** Medicare imagery and a few article images are Unsplash URLs. Replace with owned photography when available. Cindy Prouty and Rigoberto Ayala have no photos in the repo.

## Logo
`public/logo.png` — full color, for light grounds. `public/logo-white.png` — all-white reversed, cut from the alpha of the original, for dark grounds. Neither is ever placed in a box.
