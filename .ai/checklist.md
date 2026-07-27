# AI quality-assurance checklist

## Use

Run the applicable checklist before declaring work complete. A checked box means it was actually inspected or tested, not merely intended. Use `workflow.md` for procedure and `../docs/` for acceptance standards.

## New component

- [ ] Read `../docs/COMPONENTS.md` and `../docs/DESIGN_SYSTEM.md`.
- [ ] Has one responsibility and belongs in the correct component layer.
- [ ] Uses a strict typed props interface; no `any` or untyped data shape.
- [ ] Uses semantic tokens and `cn()` rather than repeated raw visual values.
- [ ] Uses semantic HTML and documented states.
- [ ] Is keyboard operable with a visible focus state when interactive.
- [ ] Handles responsive behavior and avoids assumptions about fixed viewport width.
- [ ] Has a static/reduced-motion-safe baseline.
- [ ] Is exported appropriately and does not duplicate an existing primitive.
- [ ] Stays near or below 300 lines.

## New section

- [ ] Read `../docs/VISUAL_LANGUAGE.md`, `../docs/LAYOUT_RULES.md`, and `../docs/CONTENT.md`.
- [ ] Has one stated visitor purpose and narrative position.
- [ ] Uses typed, verified data rather than JSX-only final copy.
- [ ] Has one visual anchor and a controlled decorative family.
- [ ] Preserves DOM reading order under desktop asymmetry.
- [ ] Defines desktop, tablet, and mobile composition—not only stack behavior.
- [ ] Remains understandable with decoration and motion removed.
- [ ] Does not make credentials compete with selected work.

## New page

- [ ] Route is in approved scope in `../docs/IMPLEMENTATION_PLAN.md`.
- [ ] Has unique metadata, one meaningful h1, landmarks, and clear primary action.
- [ ] Composes sections/components rather than implementing primitives in `page.tsx`.
- [ ] Works at 320, 768, 1024, and 1440 px.
- [ ] Supports keyboard-only navigation, browser zoom/reflow, and reduced motion.
- [ ] Uses real/approved destinations and assets.
- [ ] Passes typecheck, lint, and production build.

## Animation

- [ ] Read `../docs/ANIMATIONS.md`.
- [ ] Has a documented purpose: reveal, relationship, feedback, or guidance.
- [ ] Uses approved duration/easing tokens and transform/opacity where possible.
- [ ] Does not hide required content or cause layout shift.
- [ ] Has a reduced-motion and coarse-pointer fallback.
- [ ] Does not degrade focus, keyboard behavior, scroll, or performance.
- [ ] Is isolated to the smallest necessary client boundary.

## Responsive design

- [ ] Checked 320, 420, 768, 1024, and 1440 px.
- [ ] Uses the documented 4/8/12-column intent and safe inline gutters.
- [ ] Mobile is intentionally recomposed; essential content/actions are not hidden.
- [ ] No horizontal overflow, clipped text, overlapping controls, or clipped focus rings.
- [ ] Touch targets are at least 44 px where interactive.
- [ ] Floats/decorative layers flow, reduce, or disappear appropriately.
- [ ] DOM/read order remains logical at all widths.

## Accessibility

- [ ] Semantic landmarks and heading order are correct.
- [ ] Buttons, links, inputs, and disclosures use native elements.
- [ ] Interactive controls have accessible names and visible focus.
- [ ] State is not communicated through color/hover alone.
- [ ] Meaningful images have accurate alt text; decorative assets are hidden from assistive tech.
- [ ] Contrast and text readability are verified over images/glass/gradients.
- [ ] Keyboard traversal has no trap and mobile menu focus is managed.
- [ ] Reduced motion retains all content and actions.

## Performance

- [ ] Raster images use `next/image`, correct dimensions, `sizes`, and intentional priority.
- [ ] Below-fold/heavy work is lazy/dynamic only when it yields real benefit.
- [ ] No unnecessary route-level client component or browser listener.
- [ ] Animations avoid continuous blur/filter/shadow/layout work.
- [ ] No oversized source asset, unapproved logo, or duplicate dependency was introduced.
- [ ] Production build was inspected for warnings and regressions.

## Code and design consistency

- [ ] Imports follow architecture direction; `data/` does not import React.
- [ ] No repeated raw colors, radii, shadows, spacing, or timing values.
- [ ] No unverified public claim, metric, URL, logo, or image path was added.
- [ ] Typography, badges, chips, cards, and controls match the documented recipes.
- [ ] Visual hierarchy uses scale/placement/space before color/effects.
- [ ] The change does not create a second visual language or page-specific component clone.

## Documentation and deployment readiness

- [ ] Relevant docs were read and reusable rule changes were documented in the right file.
- [ ] `.ai/memory.md` records completed work, debt, or new open questions.
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Public assets, metadata, links, and environment values were reviewed.
- [ ] Handoff reports validation evidence and unresolved constraints.
