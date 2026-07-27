# Design system

## Purpose and scope

This document defines visual tokens and control mechanics. It owns reusable values and states; it does not prescribe page composition (see `LAYOUT_RULES.md`) or motion choreography (see `ANIMATIONS.md`). Components consume semantic tokens rather than ad-hoc CSS literals.

## Token architecture

Define primitive palette values once, then map them to semantic roles in `styles/tokens.css`. TypeScript token exports mirror the CSS variables for non-CSS consumers. Never reference a palette value in a component when a semantic role exists.

```css
:root {
  --color-canvas: #fafafa;
  --color-surface: rgb(255 255 255 / 72%);
  --color-surface-solid: #ffffff;
  --color-ink: #1d1d1f;
  --color-ink-muted: #6e6e73;
  --color-line: rgb(29 29 31 / 10%);
  --color-lavender: #8b7cff;
  --color-periwinkle: #7186ff;
  --color-sky: #8dcfff;
  --color-pink: #ff72b8;
  --color-peach: #ffc9ae;
  --color-focus: #415cff;
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 28px;
  --radius-pill: 999px;
  --shadow-card: 0 12px 32px rgb(28 24 49 / 8%);
  --shadow-float: 0 22px 60px rgb(75 63 131 / 14%);
  --blur-glass: 18px;
}
```

The canvas remains near-white. Ink remains near-black. Accent colors identify an intentional focal point, status, or decorative lighting; they do not replace hierarchy or body-text contrast.

## Typography

Use General Sans (or a licensed display substitute) for display and UI headings, Inter for body/interface copy, and one optional handwritten display face only for the surname “Herrero.” Never use the script font in paragraphs, navigation, metadata, tags, or buttons.

| Token | Desktop | Mobile | Use |
| --- | --- | --- | --- |
| `--type-display` | `clamp(4.5rem, 10vw, 10rem)` | `clamp(3.25rem, 17vw, 5rem)` | Hero first name |
| `--type-script` | `clamp(3rem, 8vw, 7rem)` | `clamp(2.5rem, 14vw, 4.25rem)` | Hero surname only |
| `--type-h1` | `clamp(2.75rem, 5vw, 5rem)` | `clamp(2.25rem, 10vw, 3.25rem)` | Route heading |
| `--type-h2` | `clamp(1.75rem, 3vw, 2.75rem)` | `1.75rem` | Section heading |
| `--type-body` | `1rem/1.55` | `1rem/1.55` | Descriptive copy |
| `--type-meta` | `.75rem/1.35` | `.75rem/1.35` | Tags, dates, labels |

Use sentence case except names and accredited credential titles. Limit long-form body measures to 62 characters. Do not letterspace body copy; use modest positive tracking only for tiny all-caps labels.

## Spatial system

Base spacing follows a 4 px rhythm: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 112, 160`. Use `--space-section: clamp(72px, 10vw, 160px)` for major chapters and `--space-card: 20px` or `24px` for card interiors. A component may use a value outside the scale only when a token is added with a documented reason.

Containers: page maximum 1440 px; editorial content maximum 1180 px; readable text maximum 680 px. Give the hero permission to use the wider page frame. All containers retain 20 px mobile and 48–64 px desktop inline gutters.

## Surfaces, elevation, and dividers

Solid cards use `--color-surface-solid`; glass cards use `--color-surface`, `backdrop-filter: blur(var(--blur-glass))`, and a 1 px `--color-line` border. Glass is reserved for floating, overlaid, or contextual modules—not every block. Layering is: canvas (0), grid/light (1), static content (10), floating decor (20), navigation (30), modal/overlay (50).

Use `--shadow-card` for embedded modules and `--shadow-float` only when a card visibly floats above another layer. Do not stack multiple shadows. Dividers are 1 px `--color-line`, never dark rules; use spacing before adding a divider.

## Shape, icons, and controls

Cards use `md` or `lg` corners; small controls use `sm`; pills are reserved for badges, skill chips, availability, and compact filters. Never place a pill inside another pill without a clear hierarchy.

Use Lucide icons at 16 px in compact controls, 20 px in standard buttons, and 24 px in cards. Icons clarify an action; they do not decorate every label. Provide `aria-hidden` for redundant icons and an accessible name for icon-only controls.

## States

Every interactive primitive defines default, hover, focus-visible, active, disabled, and loading where applicable. Focus uses a 2 px `--color-focus` ring offset from the surface. Hover may raise a card by 2–4 px or adjust the border/light, but must not change layout. Disabled controls remain readable and non-interactive. Loading preserves dimensions and announces status where needed.

## Component recipes

- **Primary button:** near-black fill, white label, 44 px minimum height, 20 px icon gap; use for one primary action per local group.
- **Secondary button:** translucent white surface, line border, near-black label; use for an alternate action.
- **Text button:** no container, visible underline/arrow state on focus and hover; never hide the focus ring.
- **Badge:** 24–28 px height, semantic tint at low opacity, concise status or category only.
- **Skill chip:** compact outline/soft-fill pill; noninteractive unless it filters content.
- **Input:** 44 px minimum height, solid surface, visible label, helper/error text, never placeholder-only labeling.
- **Card:** one content hierarchy, intentional padding, one elevation level, no arbitrary gradients behind text.

## Scalability

Add a token when it represents a repeatable semantic decision. Add a variant when the same component structure solves another approved use case. Do not fork a component for a one-off page; compose it with layout wrappers or add a documented variant.
