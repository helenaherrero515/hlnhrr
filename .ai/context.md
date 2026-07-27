# Project context for AI agents

## Product overview

Helena R. Herrero’s site is a premium personal portfolio for a UI/UX designer, frontend developer, and creative technologist. It is an interactive digital product that communicates professional experience; it is not a conventional résumé website. The canonical product purpose and visitor narrative are in `../README.md` and `../docs/IMPLEMENTATION_PLAN.md`.

## Audience and goals

Primary visitors are recruiters, hiring managers, design leaders, engineering collaborators, hackathon/community peers, and potential collaborators. They need fast evidence of Helena’s design judgment, implementation fluency, and credible practice. The first viewport must establish role and action; selected work provides the primary proof; experience, communities, skills, and certifications support the decision.

## Emotional and design goals

The experience should feel calm, premium, curious, intentional, airy, playful in restraint, and technically credible. It combines Apple-like clarity, iOS material depth, Figma workspace motifs, Linear/Arc precision, Framer restraint, and editorial composition. Reference images describe a soft-white, high-contrast, layered modular direction—not a layout to clone. Read `../docs/VISUAL_LANGUAGE.md` and `../docs/REFERENCES.md` before visual work.

## User journey

```text
Land → understand identity → notice point of view
→ inspect selected work → scan credibility signals
→ choose contact, résumé, or a deeper route
```

The home page must complete this journey without requiring secondary pages. Supporting routes reuse the same data, tokens, and component language; they cannot become unrelated mini-sites.

## Product success criteria

- Identity, role, selected work, and contact path are understandable quickly.
- Work is more prominent than credentials.
- The design system feels authored and cohesive rather than card-template driven.
- The site remains useful at 320 px, tablet, desktop, keyboard-only, touch/coarse-pointer, and reduced-motion settings.
- Content is verified and separated from UI; implementation is fast and maintainable.

## Technical context

The project uses Next.js 15 App Router, React 19, strict TypeScript, Tailwind CSS with semantic CSS variables, shadcn-compatible primitives, Framer Motion, Lucide, and `next/image`. See `../docs/TECH_STACK.md` for implementation boundaries. Routes live in `app/`; presentational layers live in `components/`; static portfolio facts live in `data/`; contracts live in `types/`; design tokens live in `styles/`.

## Component philosophy

Use atomic, purpose-specific components. `components/ui/` contains generic primitives, `components/layout/` site frame, `components/shared/` reusable portfolio patterns, `components/sections/` narrative areas, and `components/assets/` code-native decoration. The route composes; the section organizes; the primitive presents. Read `../docs/COMPONENTS.md` before adding or changing a component.

## Motion and accessibility philosophy

Motion guides attention and confirms interaction; it never carries required meaning. Static content must work before animation. Respect reduced motion, use `transform`/`opacity` where possible, and remove cursor/parallax behavior on coarse pointers. Semantic landmarks, heading order, real controls, focus visibility, adequate contrast, and image alternatives are non-negotiable. Read `../docs/ANIMATIONS.md`, `../docs/LAYOUT_RULES.md`, and `../docs/DO_NOT_DO.md`.

## Content status

The data layer contains CV-backed information. Project/portrait asset paths may be planned paths until real approved exports exist. Treat missing URLs, imagery, and unverified mockup claims as open content work, not implementation permission. Read `../docs/CONTENT.md` and `../docs/PROJECTS.md` before editing data.
