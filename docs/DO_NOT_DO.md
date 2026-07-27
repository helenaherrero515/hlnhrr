# Do not do

## Purpose

This is the drift-prevention checklist. If a proposed change conflicts with any rule here, stop and justify an explicit documented exception before implementation.

## Design and visual anti-patterns

- Do not turn the page into a generic résumé template, dashboard, bento-grid clone, or card wall where every module has equal emphasis.
- Do not use saturated rainbow gradients, neon glow, black glass panels, heavy drop shadows, or random 3D objects; they break the soft editorial workspace language.
- Do not use Apple, Figma, Linear, Arc, Framer, or Pinterest branding/assets as decoration or reproduce a reference mockup pixel-for-pixel.
- Do not add an icon, blob, spark, cursor, arrow, sticker, or grid simply to fill space. Decoration must clarify a local composition.
- Do not place readable text over a busy gradient/image without verified contrast.
- Do not use script type outside the approved surname/accent treatment or all-caps as a substitute for hierarchy.

## Layout anti-patterns

- Do not shrink the desktop hero collage into mobile. Reorder and recompose it.
- Do not use absolute positioning for primary text, CTAs, or the only instance of meaningful content.
- Do not make a horizontal carousel the sole route to projects, credentials, or cards.
- Do not use arbitrary margins, magic `z-index` values, or unbounded negative offsets to repair alignment.
- Do not stack multiple dense sections without whitespace or hierarchy reset.

## Motion and accessibility anti-patterns

- Do not hijack scrolling, replace the cursor, force parallax, autoplay media, or make content appear only after animation.
- Do not animate layout, blur, shadow, or large filters continuously.
- Do not rely on hover, color, tiny icons, or QR codes as the only way to communicate meaning or access an action.
- Do not remove focus outlines, omit labels, use clickable `div`s, or hide navigation inside an inaccessible menu.
- Do not ignore `prefers-reduced-motion`, coarse pointers, zoom, or keyboard order.

## Content anti-patterns

- Do not invent roles, awards, dates, metrics, testimonials, client names, project outcomes, or credential status.
- Do not publish a phone number, precise location, résumé, or QR contact path without Helena’s approval.
- Do not use empty hype: “innovative,” “world-class,” “passionate,” “seamless,” or “revolutionary” without specific evidence.
- Do not duplicate biography/project copy across JSX files or use lorem ipsum as production content.

## Engineering anti-patterns

- Do not use `any`, giant route files, inline duplicated style values, or client components by default.
- Do not import a section from `app/` into lower layers, or import React into `data/`.
- Do not add a dependency before checking whether Next.js, CSS, existing utilities, or a small local component solves the problem.
- Do not ship unoptimized raster images, unbounded animation loops, console warnings, environment values, or build failures.
- Do not create one-off component duplicates when a documented variant or composition would work.

## Future scalability

When in doubt, preserve the visitor loop, semantic token system, typed content boundary, and accessible static experience. A smaller coherent portfolio is better than a larger portfolio that breaks these constraints.
