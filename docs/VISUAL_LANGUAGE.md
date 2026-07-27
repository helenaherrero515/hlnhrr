# Visual language

## Purpose and scope

This document defines the portfolio’s artistic direction: what makes it feel like Helena’s product experience rather than a generic grid of cards. It governs visual character, imagery, decoration, hierarchy, and new-section coherence. Tokens live in `DESIGN_SYSTEM.md`; placement rules live in `LAYOUT_RULES.md`.

## Identity

The visual identity is a soft, precise, editorial design workspace. It combines Apple-like calm and material quality with Figma-like artifacts: component labels, selection handles, prototype connectors, grids, cursor pointers, mini widgets, and token-like chips. The reference mockups demonstrate the intended feeling: white depth, high-contrast typography, lilac/blue/pink atmospheric light, and an assembled board of distinct but related modules.

The result must be original. Borrow principles—clarity, modulation, depth, and playful interface provenance—not another product’s layout, assets, logo, or interaction signature.

## Composition rhythm

Use a cycle of **anchor → breathing space → supporting module → accent**. Every chapter needs one anchor: display type, a major project image, or a large asymmetric card. Supporting cards should vary in width, height, and information density but align to an underlying grid. Empty space is active structure, not unused area.

Create visual hierarchy in this order: scale, placement, contrast, whitespace, then color. A pink gradient is never the reason something becomes important.

## Light, depth, and gradients

Light is ambient and soft. Place one or two blurred color fields behind a chapter, with low saturation and a large falloff. Gradients may appear in decorative blobs, subtle card edge lighting, the script surname, or tiny status accents. They must not reduce body-copy contrast or create a rainbow wash across the whole screen.

Use depth through surface opacity, thin borders, a single credible shadow, restrained overlap, and gentle backdrop blur. Do not use heavy dark shadows, glass on glass on glass, or unrelated 3D illustration.

## Decorative asset system

Decoration should look like it escaped a product-design file: `SelectionBox`, `PrototypeConnector`, `FloatingCursor`, `GridDots`, `Sparkles`, `FloatingStars`, and `DecorativeShapes`. It is always subordinate to content, non-semantic, `aria-hidden`, and excluded from the keyboard order. It must never cover text, controls, focus rings, or project evidence.

Use one decorative family per local composition. For example, a hero may use a selection box plus connector; a project region may use a dotted grid plus one sticker-like icon. Do not scatter stars, blobs, arrows, cursors, and gradients everywhere.

## Photography and imagery

Portraits are warm, editorial, and high-resolution. Use rounded framing with a subtle border; preserve natural skin tones; avoid cutout collages and stock-office clichés. Project images should reveal interface craft, be cropped consistently, and include an image purpose in content data. Background images need a contrast layer only when necessary.

## Adding a section

Before creating a section, write its one-sentence visitor purpose, choose its anchor, identify the one supporting pattern it reuses, and name the visual family it belongs to. If it requires a new color, shape language, or decorative metaphor, it is probably a separate future feature—not a section addition.

## Constraints and future scalability

The visual system can support future case studies, gallery work, and editorial posts by keeping the same canvas, ink, typography hierarchy, component shapes, and workspace metaphor. Future pages may be more image-led, but must retain generous whitespace, one dominant idea per viewport, and clear navigation back to the portfolio.
