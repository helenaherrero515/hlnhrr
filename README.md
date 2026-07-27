# Helena Portfolio

## Purpose

This repository builds Helena R. Herrero’s portfolio as a premium digital product, not a résumé rendered in HTML. It must prove product thinking, UI/UX craft, frontend capability, and creative-technology range through the experience of using it.

## Product vision

The experience combines the calm clarity of Apple product pages, iOS 18 depth, Figma Community workspace artifacts, Linear-level precision, Arc/Framer motion restraint, and editorial poster composition. Visitors should immediately understand that Helena can design intentional interfaces and implement them with equal care.

The governing narrative is:

```text
Identity → point of view → selected work → credible practice → invitation to connect
```

Work is the primary evidence. Experience, communities, hackathons, skills, and certifications are supporting evidence. Decorative detail reinforces the story but never becomes the story.

## Goals and success criteria

- Establish Helena’s design, frontend, and creative-technology identity in the first viewport.
- Make three selected projects the clearest proof of craft.
- Feel authored, spacious, and system-led rather than template-led.
- Work with keyboard navigation, reduced motion, touch, and compact screens.
- Keep content, tokens, assets, and presentation independently maintainable.

A successful build feels memorable without feeling busy. A recruiter can identify the role, inspect work, and find a contact path quickly; a design peer can recognize the systems thinking behind the interaction details.

## Information architecture

The home page is the curated product story: Hero, About, Featured Projects, Experience, Hackathons, Skills, Communities, Certifications, Contact, Footer. Supporting routes (`/about`, `/experience`, `/projects`, `/certifications`, `/gallery`, `/contact`) reuse the same data and primitives. They must never become visually unrelated mini-sites.

## Repository architecture

```text
app/          Route composition, document metadata, and global CSS
components/   ui primitives, layout, sections, shared patterns, visual assets
data/         Typed display-free content
styles/       Token definitions and runtime CSS variables
types/        Domain contracts
hooks/        Small browser-only interaction hooks
lib/, utils/  Shared implementation helpers
public/       Optimized images, logos, icons, résumé, favicon
docs/         This handbook and the implementation plan
```

## Development workflow

1. Read `docs/IMPLEMENTATION_PLAN.md` and the relevant concern document before editing.
2. Update or verify the typed record in `data/` before adding final content to a component.
3. Reuse an existing token or create a semantic token before adding a recurring visual value.
4. Build server-first; isolate browser behavior to focused client components.
5. Check desktop, tablet, mobile, keyboard, and reduced-motion behavior before considering a feature done.
6. Run typecheck, lint, and production build before handoff.

## Documentation map

- `DESIGN_SYSTEM.md`: tokens and component visual mechanics.
- `VISUAL_LANGUAGE.md`: art direction and composition character.
- `LAYOUT_RULES.md`: responsive layout engine and spatial decisions.
- `COMPONENTS.md`: component contracts and usage patterns.
- `ANIMATIONS.md`: approved motion recipes and performance rules.
- `CONTENT.md`: verified content model and editorial presentation.
- `PROJECTS.md`: project/case-study specification.
- `TECH_STACK.md`: architecture, code conventions, delivery requirements.
- `STYLE_GUIDE.md`: writing, naming, and brand expression.
- `DO_NOT_DO.md`: drift-prevention rules.

## Scalability

Future case studies, a blog, gallery, talks, open source, and UI playgrounds extend the same typed data, route, and token systems. They do not justify a second design system or direct coupling of content to page JSX.
