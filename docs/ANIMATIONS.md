# Animations

## Purpose and motion philosophy

Motion communicates hierarchy, spatial relationship, and response—not decoration for its own sake. The portfolio should feel polished, calm, and tactile. A visitor must understand every section with all nonessential animation disabled.

## Approved timing and easing

Use tokenized durations: `fast: 160ms`, `base: 320ms`, `slow: 560ms`. Use `cubic-bezier(0.22, 1, 0.36, 1)` for entry/elevation and a soft linear or low-amplitude sine-like curve only for ambient float. Never use spring motion for text hierarchy or a bouncy easing for professional navigation.

## Recipes by component

| Component | Approved motion | Constraint |
| --- | --- | --- |
| Hero | One initial fade/translate reveal; portrait/card settles after title | No delayed content beyond 700 ms total |
| Navigation | Underline/indicator opacity or position transition | No layout shift; menu respects focus management |
| Button | Background/border/elevation feedback | 160 ms; no scale below 0.98 |
| ProjectCard | 2–4 px elevation, border/light adjustment, image transform ≤1.02 | Hover is optional; card remains understandable static |
| GlassCard | Small opacity/light reflection shift | Do not animate blur continuously |
| Timeline | Once-only reveal of items in document order | No scroll-linked layout transforms |
| SkillChip / Badge | Color/border response only when interactive | Static when informational |
| GradientBlob | Very slow, subtle position/scale drift | One or two per viewport; remove for reduced motion |
| CursorGlow | Pointer-following opacity/light | Coarse-pointer and reduced-motion disabled |
| PrototypeConnector | Optional draw-in on first reveal | Must not imply a real workflow link |

## Scroll reveal and staggering

Use `IntersectionObserver`, not a continuous scroll listener, for reveal. Reveal only a section wrapper or a short group. Start at `opacity: 0; transform: translateY(16px)` and end at visible/zero with `base` duration. Stagger sibling cards by 40–80 ms, capped at 4 items; further items reveal in groups. Mark content visible by default when JavaScript is absent or motion is reduced.

## Page transitions

Do not block navigation behind theatrical transitions. If route transitions are added, fade the outgoing/incoming page shell within 160–240 ms, retain focus/scroll behavior, and avoid animating large images at the same time. The MVP may omit page transitions entirely.

## Performance and accessibility

Animate only `transform` and `opacity` whenever possible. Do not continuously animate `filter`, `box-shadow`, `backdrop-filter`, width, height, top, left, or large gradient repaint areas. Use `will-change` only shortly before a known animation; never apply it globally.

Respect `prefers-reduced-motion: reduce`: make all content immediately visible, remove parallax/floating/cursor tracking, and shorten essential feedback to opacity or none. Touch devices receive no hover-only behavior. Maintain focus visibility independently of animation state.

## Implementation rules

Centralize variants in `utils/animation.ts`; use Framer Motion only in focused client islands. Do not create a unique easing/duration in a section. Motion must support the component’s job: reveal a relationship, acknowledge an action, or guide a next step. If it does none of these, remove it.

## Future scalability

A future gallery may use richer motion, but it must load independently and maintain the same tokenized timing, reduced-motion fallback, and semantic fallback. The portfolio home page remains calm even if later experiments are more expressive.
