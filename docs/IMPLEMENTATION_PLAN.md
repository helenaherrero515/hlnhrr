# Helena Portfolio — Implementation Plan

## 0. Plan purpose and authority

This is the executable implementation plan for Helena R. Herrero’s premium portfolio. It turns the handbook in `docs/` into an ordered build sequence with exact ownership for design files, production assets, application code, content, and validation.

Authority order:

1. Verified public facts, accessibility, privacy, and performance requirements.
2. This implementation plan for scope, file ownership, sequencing, and gates.
3. The concern-specific handbook in `docs/` for design decisions.
4. Existing typed contracts and established primitives.

The visitor story is fixed:

```text
Identity → point of view → selected work → credible practice → contact
```

The result is an editorial product experience, not a vertically formatted résumé or a literal reproduction of the supplied mockups.

---

## 1. Delivery scope

### MVP included

- One high-fidelity editorial landing page with a complete identity-to-contact narrative.
- Reusable visual system: soft-white surfaces, near-black ink, restrained lavender/periwinkle/sky/pink/peach lighting, glass modules, design-workspace artifacts, and responsive compositions.
- Typed content for profile, projects, experience, hackathons, skills, communities, certifications, socials, statistics, and timeline data.
- Accessible route shells for About, Experience, Projects, Certifications, Gallery, and Contact.
- Lightweight progressive enhancement: motion reveal, card hover, optional cursor glow, optional parallax, and reduced-motion fallback.
- Production requirements: `next/image`, semantic HTML, metadata, keyboard navigation, tokenized styling, typecheck, lint, and production build.

### Explicitly excluded

- CMS, database, authentication, analytics, contact-form backend, blog, or custom dashboard.
- Full case-study prose before project facts and publishable assets are verified.
- Scroll hijacking, custom-cursor replacement, autoplay media, WebGL, or effects that obscure content.
- Unverified public claims from the reference mockups, including awards, dates, metrics, contact details, project results, or employment details.

---

## 2. Source-of-truth and file-directory map

### Design source versus production output

Figma (or another approved design workspace) is the editable source for high-fidelity layouts, exploratory variants, image treatment decisions, and approval history. Do not commit proprietary Figma files or unoptimized source exports into the application repository.

The repository contains the implementation-ready translation:

```text
C:\Users\Helena\portfolio\
├── docs/                         Design and engineering rules; decision record
│   ├── DESIGN_SYSTEM.md           Token names, component recipes, states
│   ├── VISUAL_LANGUAGE.md         Art direction and reference interpretation
│   ├── LAYOUT_RULES.md            Grid, breakpoints, composition behavior
│   ├── COMPONENTS.md              Component contracts and usage
│   ├── ANIMATIONS.md              Motion recipes and reduced-motion behavior
│   ├── CONTENT.md                 Verified-content intake and display model
│   ├── PROJECTS.md                Project and case-study specification
│   └── IMPLEMENTATION_PLAN.md     This file
│
├── public/                        Deployable, optimized, non-code files only
│   ├── images/
│   │   ├── profile/               Approved portrait exports
│   │   ├── projects/<slug>/       Project cover and case-study media
│   │   ├── social/                Open Graph and social sharing images
│   │   └── ui/                    Raster-only decorative exports, if needed
│   ├── logos/                     Approved organization/brand SVG or raster marks
│   ├── icons/                     Static non-Lucid icons only
│   ├── favicon/                   Favicon source exports
│   └── resume.pdf                 Approved public résumé only
│
├── components/assets/             Code-native decorative SVG/React assets
│   ├── BrandMark.tsx
│   ├── SelectionBox.tsx
│   ├── PrototypeConnector.tsx
│   ├── FloatingCursor.tsx
│   ├── GridDots.tsx
│   ├── Sparkles.tsx
│   ├── FloatingStars.tsx
│   └── DecorativeShapes.tsx
│
├── styles/                        Token source, never one-off visual files
│   ├── tokens.css
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── gradients.ts
│   ├── shadows.ts
│   ├── radius.ts
│   ├── glass.ts
│   └── animations.ts
│
├── data/                          Verified display-free portfolio content
├── types/                         Stable content interfaces
├── components/                    UI, layout, shared, and section implementation
├── hooks/                         Isolated browser-only behavior
├── lib/ and utils/                Framework helpers and pure shared utilities
└── app/                           Routes, metadata, and global entry points
```

### Asset rules

- Use `components/assets/` for code-native vectors that scale, inherit tokens, and remain `aria-hidden` decoration.
- Use `public/images/profile/` for the approved portrait; do not put a portrait in a component directory.
- Use `public/images/projects/<slug>/cover.webp` for card imagery and descriptive filenames such as `research-flow.webp` or `prototype-desktop.webp` for case-study media.
- Use `public/logos/` only for approved brand marks. Prefer text when licensing or accessibility is uncertain.
- Use `next/image` for all raster production media. SVG decorative assets are React components or static files, not Next/Image candidates.
- Record source, permission, purpose, and alt text in the associated data/project brief before publication.

---

## 3. Target implementation directory

The following is the planned production structure. Existing files are retained where compatible; create only files required by the staged work below.

```text
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── about/page.tsx
├── experience/page.tsx
├── projects/page.tsx
├── certifications/page.tsx
├── gallery/page.tsx
└── contact/page.tsx

components/
├── ui/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── GlassCard.tsx
│   ├── FloatingCard.tsx
│   ├── GradientBlob.tsx
│   ├── GridBackground.tsx
│   ├── SectionTitle.tsx
│   ├── SkillChip.tsx
│   ├── StatCard.tsx
│   ├── Timeline.tsx
│   └── CursorGlow.tsx
├── layout/
│   ├── PageShell.tsx
│   ├── SiteHeader.tsx
│   └── SiteFooter.tsx
├── shared/
│   ├── Section.tsx
│   ├── SectionHeading.tsx
│   ├── ProjectCard.tsx
│   ├── CertificationCard.tsx
│   ├── CommunityCard.tsx
│   ├── ContactWidget.tsx
│   ├── QuoteCard.tsx
│   ├── MiniWidgets.tsx
│   └── ExternalLink.tsx
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── FeaturedProjects.tsx
│   ├── Experience.tsx
│   ├── Hackathons.tsx
│   ├── Skills.tsx
│   ├── Communities.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── assets/
    ├── BrandMark.tsx
    ├── SelectionBox.tsx
    ├── PrototypeConnector.tsx
    ├── FloatingCursor.tsx
    ├── GridDots.tsx
    ├── Sparkles.tsx
    ├── FloatingStars.tsx
    └── DecorativeShapes.tsx

data/
├── profile.ts
├── projects.ts
├── experience.ts
├── hackathons.ts
├── skills.ts
├── communities.ts
├── certifications.ts
├── socials.ts
├── statistics.ts
└── timeline.ts
```

`app/page.tsx` composes the home narrative. It must not contain primitive implementation, raw content copy, decorative SVG markup, or client-only effects. `components/sections/` does not fetch or invent data; it receives typed props. Existing names such as `ProjectGrid.tsx` may be replaced by `FeaturedProjects.tsx` only when its responsibility changes; do not maintain duplicate section implementations.

---

## 4. Implementation invariants

| ID | Requirement |
| --- | --- |
| INV-001 | Final content originates in typed `data/` records and has a verified source. |
| INV-002 | Recurring color, spacing, radius, shadow, blur, and timing values originate in `styles/` tokens. |
| INV-003 | DOM order follows the reading order even when desktop cards overlap or reposition. |
| INV-004 | All interactions are keyboard operable with visible focus and a non-color state cue. |
| INV-005 | Reduced motion makes all content visible and removes nonessential reveal, float, parallax, and cursor behavior. |
| INV-006 | Raster assets use `next/image` with dimensions/sizes and purposeful alternatives. |
| INV-007 | A first-time visitor can identify Helena’s role, view selected work, and find contact action without visiting another route. |
| INV-008 | Public visual effects are subordinate to the editorial hierarchy and never block text, controls, or focus. |

---

## 5. Sequential implementation plan

### Phase 1 — Foundation and verified input

**Files:** `styles/*`, `app/globals.css`, `app/layout.tsx`, `constants/*`, `types/*`, `data/*`, `public/images/*`, `docs/CONTENT.md`.

1. Confirm which mockup-derived content may be public. Do not code temporary public claims.
2. Replace the initial dark placeholder palette with the semantic soft-white token system in `docs/DESIGN_SYSTEM.md`.
3. Confirm approved fonts and add only their licensed/hosted delivery path.
4. Add verified data records and public asset paths; preserve ISO dates and stable project slugs.
5. Create the public asset directory subsets only when a real export is ready.
6. Set accurate site metadata and a skip-to-content link.

**Gate:** content contracts compile; global tokens match the handbook; no unverified contact/metric/award appears in production data.

### Phase 2 — Primitives and application shell

**Files:** `components/ui/*`, `components/layout/*`, `components/shared/Section.tsx`, `components/shared/SectionHeading.tsx`, `components/shared/ExternalLink.tsx`, `hooks/*`, `utils/animation.ts`.

1. Implement Button, Badge, GlassCard, FloatingCard, GridBackground, GradientBlob, SectionTitle, SkillChip, StatCard, and Timeline from token recipes.
2. Complete SiteHeader, PageShell, and SiteFooter with landmarks, keyboard behavior, focus states, and responsive navigation.
3. Implement only focused client hooks; no browser effects in routes.
4. Build the static/reduced-motion version first, then add optional movement.

**Gate:** one representative card, button group, timeline item, and header work at 320 px, tablet, and desktop with keyboard-only navigation.

### Phase 3 — Workspace visual assets

**Files:** `components/assets/*`, `public/images/profile/*`.

1. Create React/SVG assets for selection, connector, cursor, grid, spark, stars, and shapes.
2. Keep each asset decorative, noninteractive, `aria-hidden`, and pointer-safe.
3. Add the verified portrait with an image record and responsive crops.
4. Test asset removal: every section must still communicate without decoration.

**Gate:** one coherent hero asset family exists; no asset obscures a heading, action, focus ring, or project evidence.

### Phase 4 — Home narrative

**Files:** `components/sections/Hero.tsx`, `About.tsx`, `FeaturedProjects.tsx`, `Experience.tsx`, `Hackathons.tsx`, `Skills.tsx`, `Communities.tsx`, `Certifications.tsx`, `Contact.tsx`, `Footer.tsx`, `components/shared/*`, `app/page.tsx`.

1. Build Hero: display name, confirmed role, concise value proposition, verified availability, two actions maximum, portrait/workspace cluster.
2. Build About and statistics as supporting context, not a résumé paragraph.
3. Build exactly three featured project cards from `data/projects.ts`; one is compositionally dominant.
4. Add experience timeline, hackathons, skills, communities, and certifications as quieter proof modules.
5. End with Contact and Footer, including text-accessible social/resume routes.
6. Compose sections in `app/page.tsx` only after each section is independently typed and responsive.

**Gate:** `identity → work → proof → contact` is legible without animation or secondary routes.

### Phase 5 — Responsive composition and motion

**Files:** `components/sections/*`, `components/ui/CursorGlow.tsx`, `hooks/*`, `utils/animation.ts`, `styles/animations.ts`.

1. Desktop: 12-column editorial grid with one dominant anchor per chapter; controlled overlap only for context-bound cards.
2. Tablet: 8-column composition; reduce overlap and convert side rails into intentional two-column groups.
3. Mobile: 4-column/one-column reading order; flow primary cards, remove nonessential decoration, retain actions before secondary metadata.
4. Add one-time reveal groups, restrained card hover, and optional ambient/cursor effects from the approved recipes.
5. Implement `prefers-reduced-motion` and coarse-pointer fallbacks before adding polish.

**Gate:** at 320 px, 768 px, 1024 px, and 1440 px, content has no clipping/overlap defects; reduced motion contains no hidden content or pointer-dependent affordance.

### Phase 6 — Route shells, metadata, and quality

**Files:** `app/about/page.tsx`, `app/experience/page.tsx`, `app/projects/page.tsx`, `app/certifications/page.tsx`, `app/gallery/page.tsx`, `app/contact/page.tsx`, `constants/metadata.ts`, `lib/seo.ts`.

1. Add route shells that reuse existing layout, data, and sections. Each route has one h1 and unique metadata.
2. `/projects` is an archive entry point; individual case studies wait for a verified project brief.
3. `/gallery` is a reserved, intentional shell—do not add placeholder art or empty cards.
4. Review image alt text, title/description, canonical URL configuration, header state, footer links, and public asset paths.
5. Run typecheck, lint, production build, keyboard traversal, reduced-motion, and responsive visual checks.

**Gate:** all routes build, are semantic, have unique metadata, and do not create a second visual system.

---

## 6. Acceptance checklist

- [ ] First viewport identifies Helena, the verified role, and two or fewer clear actions.
- [ ] Home renders all final portfolio facts from `data/`, not duplicated JSX strings.
- [ ] Featured projects are limited to three and each has an approved image, role, concise summary, tags, and real destination.
- [ ] Design exports live in the correct `public/` subdirectory; code-native decorative vectors live in `components/assets/`.
- [ ] Every new visual value is tokenized or uses an existing semantic token.
- [ ] Desktop, tablet, and mobile layouts are compositions appropriate to their width, not scaled copies.
- [ ] Keyboard focus, landmarks, labels, alt text, and reduced motion are verified.
- [ ] No QR code, icon, hover behavior, or animation is the sole path to information or action.
- [ ] `npm run typecheck`, `npm run lint`, and `npm run build` pass.
- [ ] All public claims, portraits, social links, logos, and résumé links have approval or are omitted.

---

## 7. Future releases

1. **Case studies:** add `app/projects/[slug]/page.tsx` after project briefs and rights-cleared assets exist.
2. **Editorial content:** add MDX/CMS adapters only when manual typed data is no longer sufficient.
3. **Gallery/playground:** load experimental motion or interactive work separately from landing-page critical content.
4. **Contact workflow:** introduce a backend only after consent, privacy, spam, delivery, and error-state decisions are documented.

Future work may extend the system but cannot weaken the content boundary, token system, accessibility baseline, or the identity-to-work hierarchy.
