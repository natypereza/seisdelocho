# TODO: Add New Portfolio Content to seisdelocho.com

Natalia has added new image files to the project root — client work, photography, event designs, branding assets, and PDFs. Organize them, upload to Supabase, and display as portfolio projects. Clean up duplicates. Make the PDF portfolio viewable inline.

---

## 1. Clean Up Files

- [ ] Delete all duplicate files:
  - [ ] All `6del8.X copy 2.png` (12 files)
  - [ ] `N (1) 2.png`, `N (2) 2.png`, `N 2.png`
  - [ ] `PORTFOLIO - NATALIA PEREZ 2.pdf`, `Portfolio Natalia Pérez 2.pdf`
  - [ ] `5a0c1fa2-... 2.jpg`, `de70e604-... 2.jpg`
  - [ ] `public/N (1).png`, `public/N (2).png`, `public/N.png` (unused, site uses N.svg)
- [ ] Rename remaining files to web-friendly names:
  - [ ] `INFLUENCERS.png` → `paccari-influencers.png`
  - [ ] `producto.png` → `paccari-product.png`
  - [ ] `6.png` → `taylor-taylor-logo.png`
  - [ ] `7.png` → `taylor-taylor-card.png`
  - [ ] `5.png`, `12.png`, `15.png` → `lule-product-{1,2,3}.png`
  - [ ] Lifestyle images → `lule-lifestyle-{1,2,3}.png`
  - [ ] Benefit/recipe images → `lule-benefit-{1,2}.png`, `lule-recipe.png`
  - [ ] `FRONT.png` → `ba-menu.png`
  - [ ] Event designs → `wedding-save-the-date.png`, `engagement-poster.png`
  - [ ] `6del8.X copy.png` → `6del8-{01..12}.png`
  - [ ] `PANEM - LANZAMIENTO SHOT.png` → `panem-launch.png`
- [ ] Skip HEIC files for now (convert later with `sips` if needed)

---

## 2. Database Schema Changes

- [ ] Add `slug String @unique` and `category String?` to Project model in `prisma/schema.prisma`
- [ ] Add new `ProjectImage` model (id, projectId, url, altText, caption, width, height, order)
- [ ] Add `@@index` for slug and projectId+order
- [ ] Run migration: `npx prisma migrate dev --name add_project_detail_support`
- [ ] Backfill existing projects with generated slugs

---

## 3. Upload Images to Supabase

- [ ] Install dev dependencies: `sharp`, `ts-node`
- [ ] Create `scripts/upload-images.ts`:
  - [ ] Read each renamed image from project root
  - [ ] Resize (max 1920px width) and convert to WebP (quality 85)
  - [ ] Upload to Supabase Storage in organized folders (`projects/paccari/`, `projects/lule/`, etc.)
  - [ ] Output public URLs for the seed script
- [ ] Run the upload script

---

## 4. Seed New Projects

- [ ] Create `prisma/seed.ts` for all 3 locales (en, es, nl):

| Project | Category | Images | Featured |
|---|---|---|---|
| PACCARI | branding | 2 | Yes |
| taylor&taylor creations | branding | 2 | No |
| lulé | product | 9 | Yes |
| BA Restaurant Menu | branding | 1 | No |
| Wedding Save-the-Date | events | 1 | No |
| Engagement Party Poster | events | 1 | No |
| 6del8 Photography | photography | 12 | Yes |
| PANEM Launch | marketing | 1 | No |

- [ ] Each project gets a hero `imageUrl` + related `ProjectImage` entries
- [ ] Run the seed script

---

## 5. Project Detail Page

- [ ] Create `src/app/[locale]/project/[slug]/page.tsx`:
  - [ ] Server component fetching project by slug with ProjectImage relations
  - [ ] Hero section: title, description, category badge
  - [ ] Image gallery (masonry/grid layout, Framer Motion animations)
  - [ ] Back button to `/#work`
  - [ ] Reuse existing Header/Footer, same warm aesthetic
- [ ] Create API route `src/app/api/projects/[slug]/route.ts`

---

## 6. Update Portfolio Component

- [ ] Add `slug` and `category` to Project interface in `src/components/Portfolio.tsx`
- [ ] Add category filter tabs: "All", "Branding", "Product", "Events", "Photography", "Marketing"
- [ ] Make project cards link to `/[locale]/project/[slug]`
- [ ] Show "View details" instead of external link for multi-image projects
- [ ] Update `src/app/api/projects/route.ts` to include slug, category, and image count

---

## 7. PDF Portfolio Viewer

- [ ] Upload `Portfolio Natalia Pérez.pdf` (~52MB) to Supabase Storage under `documents/`
- [ ] Create `src/app/[locale]/portfolio/page.tsx`:
  - [ ] Embed PDF via `<iframe>` with Supabase public URL
  - [ ] Clean layout with Header/Footer, centered ~3:4 aspect ratio
  - [ ] Mobile-friendly with scroll
- [ ] Add "View Portfolio" button in `src/components/About.tsx` next to "View CV"
- [ ] Add translation keys to `en.json`, `es.json`, `nl.json`

---

## 8. Admin Dashboard Updates

- [ ] Add category dropdown and slug field to `src/components/admin/ProjectForm.tsx`
- [ ] Add multi-image upload section for ProjectImage entries
- [ ] Update admin API routes for new fields and nested image CRUD

---

## 9. Cleanup

- [ ] Add `*.HEIC`, `*.heic` to `.gitignore`
- [ ] Remove all uploaded image originals from repo root
- [ ] Only keep `N.svg` in root (already tracked)

---

## Files to Modify

- [ ] `prisma/schema.prisma` — add slug, category, ProjectImage model
- [ ] `src/components/Portfolio.tsx` — category filters, detail page links
- [ ] `src/components/About.tsx` — add "View Portfolio" button
- [ ] `src/app/api/projects/route.ts` — include new fields in response
- [ ] `src/messages/en.json` — new translation keys
- [ ] `src/messages/es.json` — new translation keys
- [ ] `src/messages/nl.json` — new translation keys
- [ ] `src/components/admin/ProjectForm.tsx` — new form fields
- [ ] `src/app/api/admin/projects/route.ts` — handle new fields
- [ ] `.gitignore` — exclude media files

## Files to Create

- [ ] `scripts/upload-images.ts` — one-time image upload script
- [ ] `prisma/seed.ts` — seed new projects
- [ ] `src/app/[locale]/project/[slug]/page.tsx` — project detail page
- [ ] `src/app/api/projects/[slug]/route.ts` — single project API
- [ ] `src/app/[locale]/portfolio/page.tsx` — PDF viewer page

---

## Verification

- [ ] `npx prisma migrate dev` — migration applies cleanly
- [ ] Run upload script — all images land in Supabase Storage
- [ ] Run seed script — all 8 projects appear in all 3 locales
- [ ] Visit homepage — portfolio grid shows new projects with filters
- [ ] Click a multi-image project — detail page loads with gallery
- [ ] Visit `/en/portfolio` — PDF renders in the iframe
- [ ] Check About section — "View Portfolio" button links correctly
- [ ] Test admin — can edit new projects, add/remove images
- [ ] `next build` — succeeds on Vercel
