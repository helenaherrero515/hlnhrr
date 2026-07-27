# Layout rules

## Purpose and scope

This document defines the responsive layout engine. It explains how content composes at each breakpoint, how modules float, and how spacing creates editorial pacing. It does not define token values or component internals.

## Core principles

- Preserve narrative order in the DOM even when desktop placement is asymmetric.
- Compose around a dominant anchor; do not create equal-weight card mosaics.
- Use a grid for alignment and controlled overlap for tension.
- Let sections breathe; use a divider only when spacing cannot clarify the relationship.
- Recompose at smaller widths. Do not shrink a desktop collage until it becomes illegible.

## Grid and containers

Desktop uses a 12-column grid, 24 px gutters, and 48–64 px page padding. Tablet uses 8 columns with 20 px gutters. Mobile uses 4 columns with 16 px gutters. Major page content stays within 1440 px; standard chapters within 1180 px. A floating module may cross a column edge but may not cross the page-safe inset.

## Breakpoint behavior

| Range | Layout rule |
| --- | --- |
| ≥1280 px | Full editorial composition; asymmetry and controlled overlap permitted. |
| 768–1279 px | Preserve groups, reduce overlap, convert side rails to balanced two-column or ordered grid arrangements. |
| <768 px | Prioritize reading order; convert layered card clusters into a main card followed by supporting cards; move decorative assets behind or remove them. |
| <420 px | One column except compact stats/chips; retain 44 px targets and avoid horizontal text clipping. |

Desktop hero: 7 columns for identity and actions, 5 columns for portrait/interface composition. Tablet: type remains lead, media moves beside or after the lead based on available height. Mobile: identity first, media second, actions before secondary metadata; decorative connectors may be removed.

## Floating cards and layer order

A floating card needs an explicit anchor relationship: it attaches visually to a portrait, project image, hero wordmark, or parent card. Maximum overlap is 16% of the smaller card’s dimension. It cannot hide a parent’s title, CTA, or focus state. On tablet, reduce overlap; on mobile, render it in normal flow or remove it when decorative.

Layer order is canvas → background grid/light → static content → context-bound floats → navigation. Avoid `z-index` escalation; each chapter creates a local stacking context only when it owns a visual cluster.

## Section rules

Hero uses the broadest composition and earns the strongest asymmetry. Featured work uses one dominant project plus complementary cards. Experience uses a readable timeline or two-column proof arrangement. Skills and certifications use denser, quieter modules. Contact returns to large type and one confident action. Do not place two high-density sections adjacent without a large whitespace interval.

## Empty space and alignment

At least one side of an anchor should have generous negative space. Align edges across cards more often than centers; this produces a system-led editorial rhythm. Break alignment only to create a single intentional focal moment. Never use arbitrary absolute positioning to repair a weak grid.

## Scroll flow and accessibility

The scroll journey alternates expansive and compact chapters. Anchored navigation scrolls to a semantic section with heading context. Do not hijack scroll, use horizontal wheel galleries as the only access path, or rely on scroll position for essential content. On zoom up to 200%, content must reflow without clipped controls.

## Future scalability

New sections begin with an explicit grid span and mobile order, then inherit container and spacing tokens. A future case study can use full-bleed media only when its text remains in the standard readable container and its next action is obvious.
