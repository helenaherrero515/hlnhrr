# Technical stack

## Purpose and scope

This document records how the portfolio is built and the engineering rules that preserve its design quality over time. It owns implementation architecture; visual decisions remain in design documents.

## Stack

- Next.js 15 App Router, React 19, TypeScript with `strict` enabled.
- Tailwind CSS with CSS custom-property tokens.
- shadcn/ui-compatible primitives and Radix Slot for composable controls.
- Framer Motion for isolated client-side motion.
- Lucide React for interface icons.
- `next/image` for raster portfolio media and `next/font` for optimized font delivery.
- `clsx` and `tailwind-merge` through `cn()` for class composition.

## Architecture and naming

`app/` owns routes, metadata, and global styles. `components/` owns presentation boundaries. `data/` owns display-free content and imports only types. `types/` owns interfaces; `constants/` owns route/navigation/site metadata; `hooks/` own browser effects; `utils/` own pure helpers; `lib/` owns framework integrations and configuration.

Use PascalCase filenames for React components, camelCase exports/variables, lowercase directories, and kebab-case only where it improves non-component folder clarity. Never use `any`; model optional, unknown, loading, and error states explicitly.

## Component architecture

Default to Server Components. A component becomes client-only only when it uses hooks, browser APIs, Framer Motion interaction, or event state. Keep client boundaries low in the tree: `CursorGlow`, a mobile menu, or a reveal wrapper—not `page.tsx`.

Use typed props. Derive repeated UI from data arrays. Prefer a small component composed twice over a mega-component with unrelated conditional flags. Keep implementation files near or below 300 lines.

## Data and state

The MVP uses typed local modules in `data/`; it has no CMS, database, authentication, or global client store. URL path is route state. Local interaction state belongs in the narrowest client component. Add a CMS only when editing cadence and publishing workflow justify it; preserve existing domain types as its adapter boundary.

## Performance

Use `next/image` with explicit `sizes`, width/height or `fill` with an aspect-ratio wrapper. Mark only the hero’s true LCP image as `priority`; lazy-load lower content. Use SVG/CSS for lightweight decoration. Dynamically import future heavy gallery/demo modules. Avoid client-side content fetching for static portfolio data. Test production build output and inspect layout shift.

## Accessibility and SEO

Use landmarks (`header`, `nav`, `main`, `section`, `footer`), heading order, real buttons/links, visible focus, labels, alternate text, and reduced motion. Metadata comes from `constants/metadata.ts` and route overrides. Each page supplies a unique title, description, canonical expectation, social image when available, and one meaningful `h1`. Do not put private contact data in generated metadata unless intentionally public.

## Utilities and hooks

`cn()` merges classes. `formatDate()` formats content dates. `scrollToId()` is used only for accessible in-page navigation. `useScrollReveal`, `useMousePosition`, `useCursorGlow`, `useParallax`, and `useWindowSize` must clean up listeners and have SSR-safe defaults. Do not add a hook for one line of component-local logic.

## Quality and deployment

Before merging: run `npm run typecheck`, `npm run lint`, and `npm run build`; test responsive widths, keyboard-only traversal, reduced motion, and images. Deploy on a Next.js-compatible host such as Vercel. Keep secrets in host environment settings; do not commit `.env.local`. The static MVP should deploy without a server-side data dependency.

## Scalability

Future case studies use dynamic routes and the existing `Project` type. New data sources use an adapter layer. Feature-specific components stay colocated beneath a section or route; generic primitives only move into `components/ui` after a second proven use.
