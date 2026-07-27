# AI command catalog

## Usage contract

Commands are reusable task protocols, not permission to bypass `agent.md`, `workflow.md`, or project documentation. Before executing a command, load its references, inspect relevant files, state assumptions, and run its validation. Replace bracketed inputs with verified values; never infer public facts.

| Command | Purpose | Inputs | Expected behavior | Output | Required references |
| --- | --- | --- | --- | --- | --- |
| `/build hero` | Implement the identity-first hero composition. | Verified profile, approved portrait, CTA destinations. | Build static semantic hero, then responsive composition and optional approved decoration/motion. | `components/sections/Hero.tsx` and required shared/assets only. | `../docs/IMPLEMENTATION_PLAN.md`, `../docs/COMPONENTS.md`, `../docs/LAYOUT_RULES.md`, `../docs/CONTENT.md` |
| `/build projects` | Build selected-work section/archive. | Verified project records, images, real destinations. | Use 3 max featured projects; one dominant card; add image/keyboard/reduced-motion behavior. | `FeaturedProjects`, `ProjectCard`, optional archive route. | `../docs/PROJECTS.md`, `../docs/COMPONENTS.md`, `../docs/LAYOUT_RULES.md` |
| `/build contact` | Build direct contact endpoint. | Approved public email/socials/résumé. | Render text-accessible contact choices; QR only as additive; no backend form. | `Contact`, `ContactWidget`, footer links. | `../docs/CONTENT.md`, `../docs/COMPONENTS.md`, `../docs/STYLE_GUIDE.md` |
| `/build timeline` | Implement experience timeline. | Typed experience/timeline records. | Preserve chronological DOM order; keep timeline line decorative; recompose for mobile. | `Timeline`, `Experience`. | `../docs/COMPONENTS.md`, `../docs/LAYOUT_RULES.md`, `../docs/CONTENT.md` |
| `/build skills` | Implement grouped skill evidence. | Typed skills. | Group by domain; use noninteractive chips unless filtering; no mastery chart. | `Skills`, `SkillChip`. | `../docs/COMPONENTS.md`, `../docs/CONTENT.md`, `../docs/DESIGN_SYSTEM.md` |
| `/build communities` | Implement community/leadership proof. | Verified community and creative-experience records/logos. | Show contribution over prestige; use approved logos only. | `Communities`, `CommunityCard`. | `../docs/CONTENT.md`, `../docs/COMPONENTS.md`, `../docs/REFERENCES.md` |
| `/create component [name]` | Add one reusable component. | Purpose, layer, props, consumers. | Follow component workflow; reject route-specific duplication. | Typed component, barrel export, documented variant if reusable. | `../docs/COMPONENTS.md`, `../docs/DESIGN_SYSTEM.md`, `.ai/workflow.md` |
| `/create section [name]` | Add a narrative section. | Visitor purpose, content source, route, anchor. | Define story role, grid/mobile order, component composition, decorative family. | Typed section plus route composition change. | `../docs/VISUAL_LANGUAGE.md`, `../docs/LAYOUT_RULES.md`, `../docs/CONTENT.md` |
| `/add animation [target]` | Add purposeful motion. | Component, motion purpose, trigger. | Use approved token recipe and static/reduced-motion fallback. | Focused client enhancement only. | `../docs/ANIMATIONS.md`, `../docs/DO_NOT_DO.md` |
| `/refactor [scope]` | Improve code without behavior drift. | Files/contract, reason, expected invariant. | Capture current behavior, make minimal structural change, validate consumers. | Smaller/clearer code with unchanged documented output. | `../docs/TECH_STACK.md`, `../docs/COMPONENTS.md`, `.ai/workflow.md` |
| `/review [scope]` | Perform design and code review. | Diff/files/route. | Review scope, tokens, semantics, responsive behavior, content, motion, perf. | Findings prioritized by severity and concrete fixes. | `.ai/checklist.md`, relevant `../docs/*` |
| `/fix responsive [target]` | Repair breakpoint behavior. | Route/component and failing widths. | Recompose rather than shrink; preserve reading order and targets. | Verified 320/768/1024/1440 behavior. | `../docs/LAYOUT_RULES.md`, `../docs/DO_NOT_DO.md` |
| `/improve spacing [target]` | Improve hierarchy through whitespace. | Section/component and issue. | Use spacing tokens and chapter rhythm before adding dividers/cards. | Token-based spacing adjustment. | `../docs/DESIGN_SYSTEM.md`, `../docs/VISUAL_LANGUAGE.md` |
| `/improve hierarchy [target]` | Clarify what visitors notice first. | Page/section and desired primary action. | Adjust scale, placement, contrast, and whitespace before color/decor. | More legible editorial composition. | `../docs/VISUAL_LANGUAGE.md`, `../docs/LAYOUT_RULES.md` |
| `/improve accessibility [scope]` | Find and fix access barriers. | Route/component and test mode. | Audit native semantics, focus, names, contrast, motion, reflow. | Tested accessibility fix and regression check. | `../docs/TECH_STACK.md`, `../docs/ANIMATIONS.md`, `.ai/checklist.md` |
| `/improve performance [scope]` | Reduce real delivery/render cost. | Route/component/metric. | Measure first; optimize image, client scope, or motion source cause. | Evidence-backed performance change. | `../docs/TECH_STACK.md`, `../docs/ANIMATIONS.md` |

## Standard command output

Every command response must state: files inspected; docs consulted; implementation/change summary; validation performed; unresolved assumptions; and whether `memory.md` or a handbook file was updated. Commands that lack verified content/assets must stop at the planning/data-contract stage instead of publishing placeholders.
