# Clarity Architect — Lovable Repo Analysis & Enhancement Plan

## Context

Three repos form the project stack:

| Repo | Role | Status |
|------|------|--------|
| **v3** (architect.global-mkts.com) | Live site — Vite/React SPA, source not public | Legacy |
| **v4** (architectv4) | Full-stack template — React 19 + Hono + Sanity CMS + Skywork platform | Scaffolded, 5 commits, homepage+book only |
| **Lovable** (clarity-architect-love) | Active Lovable build — TanStack Start, hardcoded content, Stripe + Formspree | **Complete, 18 routes all built** |

The Lovable repo is the **current active codebase**. It is a pure frontend static site (no backend, no auth, no CMS, no database). All content is hardcoded in TypeScript files. It is hosted/publishable via Lovable.

---

## What's Already Built (18 routes)

| Route | Status | Notes |
|-------|--------|-------|
| `/` | Complete | Hero, quote rotator, 8C, book anchor, framework preview, roadmap, origin, services, speaking, insights, closing |
| `/the-architect` | Complete | Origin story, metrics, awards, certifications, field photos, archive |
| `/clarityos` | Complete | 8C methodology, steps, audiences, FAQs |
| `/book` | Complete | Cover, about, prologue, TOC (6 parts), metrics, roadmap, audiences, dedication, press |
| `/book/$slug` | Complete | 15 chapter pages with framework links, CTAs |
| `/frameworks/` | Complete | 16-framework grid |
| `/frameworks/$slug` | Complete | 16 framework detail pages with enrichment |
| `/services` | Complete | 3 service tiers + AI training |
| `/insights/` | Complete | 6 articles + quote cards + external pubs |
| `/insights/$slug` | Complete | Article detail with sections, related framework |
| `/media` | Complete | Film, workshops, speaking, gallery, recognition, press |
| `/newsletter` | Complete | Signup form, 2 issue archive |
| `/connect` | Complete | Contact form with qualifying fields |
| `/book-a-session` | Complete | $79 session page |
| `/organizational-development` | Complete | Pillar page |
| `/executive-coaching` | Complete | Pillar page |
| `/personal-development-framework` | Complete | Pillar page with 6-month track |
| `[.mcp]/*` | Complete | MCP server endpoints |

### Content Inventory
- **16 Frameworks** (8C, Exile Resilience, Cultural Ecosystem Mapping, Identity Preservation, Constraint-Based Innovation, Governance as Accelerator, Market Volatility Navigation, Crisis as Audit, Pyramid, Function Reframing, Cross-Cultural Authority, Super-Labor, Digital Nation Building, AI Governance Integration, Character Compass, Practical People Skills)
- **15 Book chapters** across 6 parts
- **6 Articles** (Leadership Styles, Investment Paradox, AI Adoption vs Human Readiness, Foundation Before Scale, What Crisis Reveals, Cross-Cultural Authority, Governance as Accelerator)
- **90+ Quotes** across 8 themes (signature set + fireside chats + workshops + LinkedIn + articles + memoir + beyond techniques)
- **16 Speaking engagements**, **9 External publications**, **2 Newsletter issues**
- **3 Certifications**, **3 Recognition items**, **4 Metrics**, **3 Testimonials**
- **16 Institution logos**, **10 Venture logos**, **16 Field photos**

### Technical Stack
- TanStack Start (React 19 + Vite + TanStack Router + TanStack Query)
- TypeScript + Bun
- Tailwind CSS v4 + Radix UI + shadcn/ui
- Zod for validation
- Formspree (4 forms: book waitlist, framework download, newsletter, contact)
- Stripe ($79 session)
- GA4 (G-Z9BFJP96Q4)
- MCP server (read-only content tools)
- Comprehensive CSS design system (navy/paper/stone/copper, Inter + Source Serif 4)

---

## Caps (Limitations & Gaps)

### Critical (must fix)
1. **Sitemap won't work on static hosting** — `src/routes/sitemap[.]xml.ts` uses server-side `GET` handler. Lovable/Cloudflare Pages serve static files; server handlers aren't available. Sitemap returns 404.
2. **Canonical URL bug in `book.$slug.tsx`** — Uses relative `/book/${params.slug}` instead of `canonicalUrl(...)` for canonical link. All other routes use `canonicalUrl()` correctly.
3. **No spam protection on forms** — Formspree forms have no honeypot or CAPTCHA. Vulnerable to abuse.
4. **Framework download forms lack email capture** — `frameworks.$slug.tsx` has a "Field Guide" form but no email field. Lead magnets aren't gated.

### High (should fix)
5. **No CMS backend** — All content hardcoded in TS files. Content updates require code changes + redeploy. README explicitly says "Replace with Notion CMS reads once the Notion connector is wired (Phase 4)" — Phase 4 not started.
6. **No search** — No search bar or index. Visitors can't find specific frameworks, articles, or chapters.
7. **No dark mode toggle** — CSS has `.dark` class support but no UI toggle. Feature is dead.
8. **No RSS/Atom feed** — No feed for insights. Misses syndication + SEO opportunity.
9. **No image optimization** — No `loading="lazy"` on most images, no responsive `srcSet`/`sizes`, no `<picture>` elements.
10. **No tests** — Zero test suite. No way to catch regressions.
11. **No CI/CD** — No GitHub Actions. Deploys are manual via Lovable.
12. **No AGENTS.md** — Just a placeholder comment. No lint/typecheck/test commands documented.

### Medium (nice to have)
13. **No `bunfig.toml`** — package.json uses npm scripts but project uses Bun runtime.
14. **No structured data on all pages** — Book chapter pages lack Article schema; some pages lack JSON-LD.
15. **No print/PDF generation** — No printable versions of frameworks or articles.
16. **No podcast/audio player** — Media page mentions "Clarity & Reflection show" as "Coming soon" but no audio component.
17. **No i18n** — No internationalization, though content targets GCC + international audiences.
18. **No A/B testing** — No mechanism for testing CTAs or content.
19. **No double opt-in** — Form submissions go directly to Formspree without email verification.
20. **No performance monitoring** — No monitoring beyond GA4 pageviews.
21. **No 404 with search** — Basic 404, no suggested links or search.
22. **Error reporting is Lovable-editor-only** — `lovable-error-reporting.ts` only works inside Lovable editor preview, not in production.

---

## Fixes (Immediate — Phase 1)

| # | Fix | File(s) | Effort |
|---|-----|---------|--------|
| 1 | Generate `sitemap.xml` at build time via TanStack Start `app/composers` or a build script | `app/composers/sitemap.ts` or `scripts/generate-sitemap.ts` | Low |
| 2 | Fix canonical URL in `book.$slug.tsx` — use `canonicalUrl(...)` | `src/routes/book.$slug.tsx` | Trivial |
| 3 | Add honeypot field to all Formspree forms | `src/components/site/FormspreeForm.tsx` (new) + all form pages | Low |
| 4 | Add email capture to framework download forms | `src/routes/frameworks.$slug.tsx` | Low |
| 5 | Add `loading="lazy"` to all non-hero images | All route files + components | Low |
| 6 | Add `AGENTS.md` with lint/typecheck/dev commands | `AGENTS.md` | Trivial |

---

## Enhancements (Phase 2 — Based on v3/v4 Analysis)

### A. Content Backend (CMS Integration)
**Problem**: Content is hardcoded. v4 had Sanity CMS schemas (16 document types + 7 object types) but zero data. README says "Replace with Notion CMS reads once the Notion connector is wired (Phase 4)."

**Enhancement**: Wire up a CMS backend to replace hardcoded content. Options:
- **Notion** (recommended per README — user likely writes there)
- **Sanity** (from v4 — structured studio already designed)
- **Strapi/Directus** (self-hosted)

**Content model to implement** (derived from v4 Sanity schemas):
- Article (title, slug, summary, body, hero, category, tags, date, SEO, related framework/service/chapter)
- BookChapter (number, title, slug, part, summary, lesson, body, SEO, related framework)
- Framework (title, slug, eyebrow, summary, parameters, impact, body, lead magnet, FAQs, evidence)
- MediaItem (title, outlet, date, type, link/embed, thumbnail, transcript)
- Program/Service (title, description, status, CTA)
- NewsletterIssue (number, title, slug, date, body, excerpt)
- Testimonial/CaseStudy (quote, attribution, role, related service/framework)

**Fallback**: Keep hardcoded TS files as static fallback when CMS is unavailable (already noted in README).

### B. Search
**Problem**: No search. v4 had no search either.

**Enhancement**: Add client-side search:
- Use Fuse.js or Algolia for fuzzy search
- Index frameworks, articles, book chapters, services
- Add search bar in header
- Show results with typeahead

### C. Dark Mode Toggle
**Problem**: CSS has `.dark` class but no toggle.

**Enhancement**: Add dark mode toggle in header:
- Persist preference in `localStorage`
- Respect `prefers-color-scheme`
- Toggle in Header component

### D. RSS/Atom Feed
**Problem**: No RSS feed.

**Enhancement**: Generate RSS feed for insights:
- `/rss.xml` route
- Include all 6 articles with full content
- Auto-update when new articles are added (if CMS is wired)

### E. Image Optimization
**Problem**: No lazy loading, no responsive images.

**Enhancement**:
- Add `loading="lazy"` to all non-hero images
- Add `srcSet` and `sizes` for responsive images
- Use `<picture>` for art direction where needed

### F. Framework Lead Magnet Gating
**Problem**: Download forms lack email capture.

**Enhancement**: Add email-gated lead magnet downloads:
- Email field required before download
- Formspree integration with auto-responder
- Track downloads per framework

### G. Tests
**Problem**: No test suite.

**Enhancement**: Add test suite:
- Vitest for unit tests (components, utilities)
- Playwright for e2e tests (routing, forms, SEO)
- Test key user flows: home → framework → download, home → book → chapter, home → services → connect

### H. CI/CD
**Problem**: No CI/CD.

**Enhancement**: Add GitHub Actions:
- Lint + typecheck on push
- Build verification
- Preview deployments on PRs

### I. Structured Data Completeness
**Problem**: Not all pages have JSON-LD.

**Enhancement**: Add structured data to all pages:
- Article schema on book chapter pages
- FAQPage schema on pages with FAQs
- HowTo schema on framework pages with processes
- Review schema on testimonials

---

## Implementation Phases

### Phase 1: Critical Fixes (2-3 days)
1. Fix sitemap generation (build-time script)
2. Fix canonical URL bug in book.$slug.tsx
3. Add honeypot spam protection to all forms
4. Add email capture to framework downloads
5. Add lazy loading to images
6. Add AGENTS.md

### Phase 2: High-Priority Enhancements (1-2 weeks)
1. **CMS integration** — Wire up Notion CMS (or Sanity) as content backend with TS fallback
   - Create CMS client module
   - Refactor `site-data.ts` to fetch from CMS at build time
   - Add content types for Article, Framework, BookChapter, etc.
2. **Search** — Add client-side search with Fuse.js
3. **Dark mode toggle** — Add toggle in header
4. **RSS feed** — Generate feed for insights
5. **Tests** — Add Vitest + Playwright test suite

### Phase 3: Medium Enhancements (2-3 weeks)
1. **Image optimization** — Add responsive images, lazy loading
2. **Structured data** — Add JSON-LD to all pages
3. **CI/CD** — GitHub Actions pipeline
4. **Framework gating** — Email-gated lead magnet downloads
5. **Print/PDF** — Printable versions of frameworks

### Phase 4: Future (Notion CMS deep integration)
1. **Admin interface** — Notion as CMS admin
2. **Webhook rebuilds** — Auto-rebuild on CMS content changes
3. **Preview mode** — Draft content preview
4. **Podcast player** — Audio component for "Clarity & Reflection"

---

## Key Decisions Needed

1. **CMS choice**: Notion (per README) or Sanity (from v4)? Notion is simpler; Sanity is more structured.
2. **Search**: Client-side (Fuse.js) or server-side (Algolia)? Client-side is simpler for static hosting.
3. **Test framework**: Vitest (unit) + Playwright (e2e) or just Vitest? Playwright adds complexity but catches routing/SEO issues.
4. **Dark mode**: Keep CSS-only or add JS toggle? Need JS toggle for UX.
5. **Form handling**: Keep Formspree or migrate to a different service? Formspree is fine for MVP but has limitations.

---

## Validation Plan

- **Phase 1**: Verify sitemap.xml is accessible, canonical URLs are absolute, forms have honeypot, images lazy-load
- **Phase 2**: Verify CMS content loads, search returns results, dark mode persists, RSS validates, tests pass
- **Phase 3**: Verify responsive images load correctly, structured data passes Google Rich Results Test, CI/CD runs on push
- **Phase 4**: Verify CMS webhook triggers rebuild, preview mode works, podcast player works

---

## Risks

1. **CMS migration risk** — Refactoring `site-data.ts` to use CMS could break existing routes if not done carefully. Mitigation: keep TS fallback.
2. **Lovable hosting constraints** — Lovable's hosting is static-only. Server-side features (sitemap, RSS) need build-time generation. Mitigation: use TanStack Start's server-side rendering or build scripts.
3. **Formspree rate limits** — Free tier has limits. Mitigation: upgrade if needed or migrate to alternative.
4. **Image optimization complexity** — Adding responsive images requires significant markup changes. Mitigation: do incrementally.
5. **Test suite maintenance** — Tests can become brittle. Mitigation: focus on critical user flows.
