# AI implementation rules

## Purpose

This file gives coding agents an execution contract. It complements the handbook; it does not replace it.

## Required behavior

- Read `IMPLEMENTATION_PLAN.md`, root `README.md`, and the concern-specific document before editing.
- Preserve the dependency direction: types/styles/constants → data/utils/lib → ui/assets → shared/layout → sections → routes.
- Keep facts in typed data. Do not transform a mockup into unverified public claims.
- Use existing tokens and primitives before introducing a new one. Document reusable new decisions in the correct handbook file.
- Build server-first; add client boundaries only for real browser behavior.
- Validate keyboard, reduced-motion, mobile, image, type, lint, and build behavior proportionate to a change.

## Decision protocol

If content, public contact data, awards, dates, metrics, assets, or a major visual direction are unknown, stop and request the missing source. Do not resolve uncertainty with fabricated copy. If an existing document conflicts with accessibility, verified content, or implementation-plan invariants, choose the safer requirement and note the conflict.

## Completion standard

A change is complete only when it is scoped, typed, token-consistent, accessible, responsive, and documented where it creates a reusable rule. Do not rewrite unrelated files or silently expand MVP scope.
