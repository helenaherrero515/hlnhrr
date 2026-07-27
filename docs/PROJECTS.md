# Project specifications

## Purpose and scope

Projects are the portfolio’s primary proof of product and implementation craft. This document defines the minimum information required before a project appears on the home page and the structure required for a future case study. It deliberately does not fabricate project narratives from the supplied design mockups.

## Entry criteria

A featured project is eligible only when Helena can verify: project title/slug; her role; the problem or audience; her contribution; at least one visual asset she may publish; and a truthful outcome or learning. If impact metrics are unavailable, describe the design decision or scope without inventing numbers.

## Project card specification

```ts
type ProjectBrief = Project & {
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  process: string[];
  imageRequirements: Array<{ purpose: string; path: string; alt: string }>;
  primaryCta: { label: string; href: string };
};
```

A home card includes: title, 1–2 sentence concise summary, Helena’s role, 3–5 tags, purposeful image, and one destination. Feature cards may include one outcome line. Do not show a technology badge collection as the main story.

## Required project brief

For each project, document:

1. **Summary:** one sentence explaining product/audience/value.
2. **Challenge:** the concrete user, business, or system problem.
3. **Solution:** what was designed/built and the key decision.
4. **Role:** Helena’s responsibilities, collaborators, and scope boundary.
5. **Impact:** verified result, or an honest qualitative outcome/learning.
6. **Technologies:** only tools materially used.
7. **Design process:** relevant stages such as discovery, flows, wireframes, prototyping, testing, UI system, implementation, iteration.
8. **Images:** cover, interface evidence, process artifact, and alt text/publishing rights.
9. **CTA:** `Read the case study`, `View prototype`, or `View project` only when a real destination exists.

## Image requirements

The cover must communicate the project without relying on tiny unreadable UI. Use a 16:10 or 4:3 responsive crop, provide a desktop image at least 1600 px wide, and preserve a separate mobile crop when needed. Every image record contains purpose and alt text. Blur/redact sensitive data before publishing. Do not use unrelated stock photos as product evidence.

## Case-study route structure

```text
Hero: project name, role, outcome, hero visual
Context: audience, constraints, challenge
Approach: research/insight, flows, decisions
Design system / interaction: selected evidence, not every screen
Build: engineering implementation and trade-offs
Outcome: verified impact, learning, or next iteration
Reflection: what Helena would improve
Next project: one intentional navigation path
```

Keep the claim boundary explicit: team output is not automatically individual output. Explain Helena’s exact contribution in each chapter.

## Provisional intake queue

The reference mockups show hackathon cards named GDGPUP SparkSFest 2026, Feutech ACM Core Vertex, GDGPUP Build with AI, and Lingap. These are **hackathon records, not automatically featured portfolio projects**. Before any becomes a project card, complete the required brief, verify titles/dates/awards/roles, and obtain images or prototypes that demonstrate the work.

## Future scalability

Use `slug` as the stable public identifier. Case-study additions must not change existing links. A future CMS stores the same project fields and assets; components remain consumers of the contract, not CMS-specific objects.
