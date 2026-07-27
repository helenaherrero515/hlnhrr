# AI development workflow

## Universal preflight

Run this before every nontrivial change:

1. Read `agent.md`, `context.md`, and the applicable workflow below.
2. Load `../docs/IMPLEMENTATION_PLAN.md` and the concern-specific documentation named by the task.
3. Inspect the existing files, types, data, and current usage before modifying anything.
4. Identify whether the change affects public facts, tokens, layout, a reusable component, motion, accessibility, performance, or a route.
5. State the smallest coherent implementation plan and any material assumptions.
6. Build the static semantic baseline before enhancement.
7. Run the relevant checklist in `checklist.md`, verify changes, and update `memory.md`.

## Create a page

1. Read `../docs/IMPLEMENTATION_PLAN.md`, `../docs/LAYOUT_RULES.md`, `../docs/CONTENT.md`, `../docs/TECH_STACK.md`, and `../docs/DO_NOT_DO.md`.
2. Confirm the route is in scope and has verified content/data. Ask before adding a new information architecture branch.
3. Define route metadata, a unique `h1`, landmarks, primary action, and mobile reading order.
4. Compose existing layout/shared/section components; create a new component only for a reusable responsibility.
5. Implement desktop grid intent, then tablet recomposition, then mobile reading order.
6. Add optional motion only after the static page works.
7. Check metadata, headings, keyboard traversal, 320/768/1024/1440 widths, reduced motion, images, typecheck, lint, and build.

## Create a component

1. Read `../docs/COMPONENTS.md`, `../docs/DESIGN_SYSTEM.md`, `../docs/ANIMATIONS.md` if interactive, and `../docs/DO_NOT_DO.md`.
2. Classify the component: ui, layout, shared, section, or asset. Do not create a route-specific clone of an existing pattern.
3. Define a narrow TypeScript props interface and semantic root element.
4. Reuse tokens, `cn()`, documented variants, and existing data types. Keep data fetching/copy out of generic components.
5. Implement default, focus, hover, active, disabled/loading states where relevant.
6. Add responsive behavior and a static/reduced-motion fallback.
7. Add/adjust exports and usage only after validating the component in context.

## Add a section

1. Read `../docs/VISUAL_LANGUAGE.md`, `../docs/LAYOUT_RULES.md`, `../docs/COMPONENTS.md`, and `../docs/CONTENT.md`.
2. Write the section’s single visitor purpose and identify its narrative position.
3. Choose one anchor, one supporting pattern, the grid span, mobile order, and decorative family.
4. Confirm typed content exists; add a type/data record only when the domain is real and reusable.
5. Compose from documented components and preserve the home hierarchy: work before supporting credentials.
6. Check that removing decoration/motion leaves the section comprehensible.
7. Validate spacing before adding dividers or more cards.

## Add animation

1. Read `../docs/ANIMATIONS.md`, `../docs/DESIGN_SYSTEM.md`, `../docs/COMPONENTS.md`, and `../docs/DO_NOT_DO.md`.
2. State the motion’s purpose: reveal, relationship, feedback, or attention guidance. Delete it if no purpose exists.
3. Use an existing timing/easing recipe from `utils/animation.ts` and `styles/animations.ts`.
4. Keep the client boundary at the smallest interactive wrapper.
5. Implement visible static state first; use transform/opacity, cap stagger, and avoid continuous expensive properties.
6. Test reduced motion, touch/coarse pointer, keyboard focus, and low-end/slow-device behavior.

## Refactor

1. Read `../docs/TECH_STACK.md`, `../docs/COMPONENTS.md`, and any impacted concern docs.
2. Capture current behavior and consumers before moving files or changing props.
3. Refactor one boundary at a time: type/data, utility, primitive, shared pattern, section, route.
4. Preserve public paths, data contracts, accessibility semantics, and token output unless the change is explicitly approved.
5. Remove dead code only after confirming no import/use remains.
6. Run typecheck, lint, build, and targeted interaction checks. Update docs/memory if a reusable contract changes.

## Fix a bug

1. Reproduce and record the viewport, input mode, route, expected behavior, and actual behavior.
2. Read the relevant docs before proposing a fix; classify it as content, layout, motion, accessibility, performance, or code defect.
3. Inspect root cause rather than patching with arbitrary CSS, z-index, or timeout values.
4. Make the smallest fix that protects the relevant invariant.
5. Add a regression check: responsive size, keyboard path, reduced-motion state, or automated test where applicable.
6. Document a known issue in `memory.md` only if it remains unresolved.

## Improve responsiveness

1. Read `../docs/LAYOUT_RULES.md`, `../docs/DESIGN_SYSTEM.md`, and `../docs/DO_NOT_DO.md`.
2. Test 320, 420, 768, 1024, and 1440 px before changing CSS.
3. Identify the intended recomposition, not just the overflow symptom.
4. Preserve DOM reading order and 44 px targets; move decorative floats into flow or remove them at smaller widths.
5. Avoid hidden essential content, horizontal scrolling, clipped focus, and desktop-only hover affordances.
6. Re-test browser zoom at 200% and touch behavior.

## Improve accessibility

1. Read `../docs/TECH_STACK.md`, `../docs/COMPONENTS.md`, `../docs/ANIMATIONS.md`, and `../docs/DO_NOT_DO.md`.
2. Inspect landmarks, heading order, accessible names, semantic controls, focus order, contrast, and alternatives.
3. Fix native semantics before adding ARIA. Use ARIA only to express behavior native HTML cannot.
4. Test keyboard-only, screen-reader-friendly structure, reduced motion, zoom/reflow, and non-color state cues.
5. Verify the fix did not degrade visual hierarchy or interaction feedback.

## Optimize performance

1. Read `../docs/TECH_STACK.md` and `../docs/ANIMATIONS.md`.
2. Measure/inspect first: image dimensions, client boundary, JS payload, layout shift, unnecessary render, or animation property.
3. Fix source cause: optimize/crop image, add `sizes`, lazy-load below-fold heavy work, reduce client scope, memoize only proven expensive work, or simplify motion.
4. Do not trade accessible content or meaningful image alternatives for a metric.
5. Re-run production build and compare the affected path.

## Code review and self-review

1. Read `checklist.md` and the relevant handbook docs.
2. Review diff for scope creep, content duplication, raw repeated styles, leaked client boundaries, weak semantics, missing states, and asset paths.
3. Review visual hierarchy at each breakpoint and with motion disabled.
4. Run typecheck, lint, and build; address warnings rather than normalizing them.
5. Report change summary, validation evidence, unresolved risks, and documentation/memory updates.

## Documentation update

1. Update a handbook document only for a reusable, intentional decision—not to narrate every code edit.
2. Put token decisions in `../docs/DESIGN_SYSTEM.md`, art direction in `VISUAL_LANGUAGE.md`, layout in `LAYOUT_RULES.md`, contracts in `COMPONENTS.md`, motion in `ANIMATIONS.md`, content rules in `CONTENT.md`, and engineering boundaries in `TECH_STACK.md`.
3. Update `memory.md` after every meaningful work session. Keep it factual, dated, and short enough to scan.
4. Do not edit the implementation plan unless scope, sequencing, file ownership, or gates have changed.
