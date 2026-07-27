# Persistent AI working memory

## Update protocol

Update this file at the end of every meaningful development session. Add dated facts; do not turn it into a changelog of trivial formatting. Remove or move resolved items rather than allowing stale warnings to accumulate.

## Completed work

- **2026-07-27:** Initialized the Next.js 15, React 19, strict TypeScript, Tailwind, shadcn-compatible portfolio foundation.
- **2026-07-27:** Created the documentation handbook in `../docs/` and revised `../docs/IMPLEMENTATION_PLAN.md` with production asset/code directory ownership.
- **2026-07-27:** Populated typed CV-backed data for profile, education, internships, hackathons, projects, skills, communities, creative experience, certifications, socials, statistics, and timeline.
- **2026-07-27:** `npm run typecheck` passed after the data/contracts update.
- **2026-07-27:** Established the `.ai/` operating system.
- **2026-07-27:** Started `../docs/IMPLEMENTATION_PLAN.md` Phase 1 by replacing starter dark tokens with the documented soft-white token system, syncing TypeScript token mirrors, updating verified site metadata/routes/navigation, adding the global skip link, pinning Next.js output tracing to the repo root, and cleaning lint configuration for generated files.
- **2026-07-27:** Started Phase 2 by implementing tokenized UI primitives (`Button`, `Badge`, `GlassCard`, `FloatingCard`, `GradientBlob`, `GridBackground`, `SectionTitle`, `SkillChip`, `StatCard`, `Timeline`, `CursorGlow`), shared section wrappers, and reusable `SiteHeader`/`SiteFooter` shell components. Dev server is running at `http://127.0.0.1:3000`.
- **2026-07-27:** Continued Phase 3 by creating code-native decorative assets (`SelectionBox`, `PrototypeConnector`, `FloatingCursor`, `GridDots`, `Sparkles`, `FloatingStars`, `DecorativeShapes`) and a usable `BrandMark`. Approved portrait/image exports remain pending.
- **2026-07-27:** Completed a first Phase 4 home narrative pass: `Hero`, `About`, `FeaturedProjects`, `Experience`, `Hackathons`, `Skills`, `Communities`, `Certifications`, `Contact`, and `Footer` now compose in `app/page.tsx` from typed data and reusable shared cards/widgets.
- **2026-07-27:** Continued Phase 5 by adding a reduced-motion-safe `Reveal` client island and applying section-level reveal through `Section` without making routes client components.
- **2026-07-27:** Completed Phase 6 route shells for `/about`, `/experience`, `/projects`, `/certifications`, `/gallery`, and `/contact`, each with unique metadata, one `h1`, reused layout/section components, and static generation verified.
- **2026-07-27:** Reworked the home page to closely match the supplied reference screenshots: added `ShowcaseHero`, `ReferenceBoard`, a portrait crop at `public/images/profile/helena-portrait.png`, top contact/status row, tilted portrait collage, five stat tiles, compact bento proof grid, personality module, and bottom contact strip.
- **2026-07-27:** Enhanced the reference-style homepage interaction layer from `../docs/ANIMATIONS.md`, `../docs/VISUAL_LANGUAGE.md`, and `../docs/COMPONENTS.md`: added reduced-motion-safe float/pulse/draw/shine utilities, reusable `CopyButton` and `BackToTop`, hero section anchors, route-linked board CTAs, clickable email/phone actions, and hover/focus card elevation.

## Current work

- Phase 5 is implemented at the foundation level and extended on the reference homepage: restrained section reveal, cursor-glow fallback behavior, float/pulse/draw/shine effects, anchor navigation, copy-to-clipboard contact actions, responsive screenshot generation, and route checks are complete. Further visual refinement should continue after human screenshot review.
- Phase 6 route shells are implemented and verified. Individual case studies remain future work until briefs and assets are approved.

## Next tasks

1. Human-review the generated screenshots in `.screenshots/` for composition quality at 320, 768, 1024, and 1440 px.
2. Obtain/confirm approved portrait, project cover images, project URLs/case-study destinations, logos, resume, and social URLs.
3. Confirm any CV details that need date/title correction before public rendering, especially the education date and timeline date format.
4. Add approved raster assets with `next/image`, route-level social images, and final project destinations.
5. Consider future case-study routes only after project briefs and asset rights are verified.

## Known issues

- `profile.avatar` and featured project `coverImage` paths point to planned files under `public/images/`; approved exports have not been added and are not rendered yet.
- Project cards currently use code-native interface placeholders instead of `next/image` because approved project cover exports are unavailable.
- Some project titles/URLs, LinkedIn/GitHub URLs, logos, credential URLs, and resume file are not confirmed in data.
- Education date is represented exactly from the supplied CV (`Expected September 2025`) and should be confirmed before display.
- Timeline records currently use display date strings rather than ISO start/end fields; this should be normalized before timeline UI is final.
- The final display/script font delivery path is still open; Inter is currently wired as the reliable body/interface foundation.

## Technical debt

- `Hero` uses a portrait-ready identity/workspace panel until an approved portrait export is added.
- `ProjectGrid` and `ExperienceTimeline` remain compatibility wrappers around the new section implementations.
- `CreativeExperience` and `Education` are typed and populated; creative experience is displayed on `/experience`, while education still has no dedicated UI module.
- Gallery is an intentional reserved shell, not a finished gallery experience.

## Future improvements

- Add project-specific case-study data and `app/projects/[slug]/page.tsx` after briefs and approved assets exist.
- Add a social sharing image and per-route metadata once public image assets are available.
- Consider an MDX/CMS adapter only when local typed data no longer supports the content workflow.

## Open questions

- Which portrait and project images have approval for public use?
- Which social profile URLs, portfolio URL, resume file, and contact details should be publicly exposed?
- Is the CV education date correct for the intended publication date?
- Which three projects have approved case-study destinations and final titles?
- Which approved display/script font files or licensing path should be used?

## Current architecture

- `app/`: home and route shells with metadata and composition.
- `components/ui/`: generic primitives; `layout/`: site frame; `shared/`: portfolio patterns; `sections/`: narrative regions; `assets/`: code-native decoration.
- `data/`: CV-backed content; `types/`: contracts; `styles/`: semantic tokens; `hooks/`: browser effects; `lib/` and `utils/`: shared helpers.
- `docs/`: source-of-truth handbook; `.ai/`: agent operating workflow.

## Component inventory

Implemented primitives: `Button`, `Badge`, `GlassCard`, `FloatingCard`, `GradientBlob`, `GridBackground`, `Reveal`, `SectionTitle`, `SkillChip`, `StatCard`, `Timeline`, and `CursorGlow`.

Implemented assets: `BrandMark`, `DecorativeShapes`, `FloatingCursor`, `FloatingStars`, `GridDots`, `PrototypeConnector`, `SelectionBox`, and `Sparkles`.

Implemented shell/shared components: `PageShell`, `SiteHeader`, `SiteFooter`, `Section`, `SectionHeading`, `ExternalLink`, `ProjectCard`, `CertificationCard`, `CommunityCard`, `ContactWidget`, `QuoteCard`, `RouteIntro`, `MiniWidgets`, and `HackathonCard`.

Implemented sections: `Hero`, `About`, `FeaturedProjects`, `Experience`, `Hackathons`, `Skills`, `Communities`, `Certifications`, `Contact`, and `Footer`.

Implemented routes: `/`, `/about`, `/experience`, `/projects`, `/certifications`, `/gallery`, and `/contact`.

## Current branch

- Branch name: `main`.

## Notes

- Do not render planned image paths until matching optimized assets exist.
- Keep CV facts factual; do not infer missing project names, metrics, outcomes, or URLs from design mockups.
- Latest verification after reference-style home animation/functionality enhancement: `npm run typecheck`, `npm run lint`, and `npm run build` all pass.
- Dev route checks returned `200` and expected text for `/`, `/about`, `/experience`, `/projects`, `/certifications`, `/gallery`, and `/contact`.
- Headless Chrome screenshots were generated at `320x1200`, `768x1400`, `1024x1400`, and `1440x1400`; updated reference screenshots were generated as `.screenshots/reference-home-1440.png` and `.screenshots/reference-home-390.png`. Direct image inspection remains blocked by the Windows sandbox image-viewer issue.

