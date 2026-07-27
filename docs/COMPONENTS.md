# Components

## Purpose and scope

Components are the portfolio’s implementation vocabulary. Generic primitives belong in `components/ui/`; narrative modules belong in `components/sections/`; site frame belongs in `components/layout/`; reusable portfolio patterns belong in `components/shared/`; non-semantic visual artifacts belong in `components/assets/`. Components accept typed data and callbacks; they do not own final content.

## Shared contract

Every component has one responsibility, a typed props interface, a semantic root, visible keyboard focus where interactive, and a reduced-motion-safe baseline. Use `cn()` for class composition. Prefer composition (`children`, slots, data props) to duplicated components. Do not make an entire section client-side for a single decorative effect.

## UI primitives

| Component | Purpose and contract | States / responsive / accessibility |
| --- | --- | --- |
| `Button` | Primary action primitive. Props: `variant`, `size`, `asChild`, `loading`, standard button props. | Primary, secondary, ghost; 44 px min target; links use `asChild`; disabled is not a color-only state. |
| `Badge` | Compact status, award, or category label. Props: `tone`, `icon?`, `children`. | Informational by default; not a button unless it filters; wraps only between words. |
| `GlassCard` | Contextual surface for portrait overlays, contact widgets, and elevated mini modules. Props: `tone`, `padding`, `children`. | Static by default; glass/blur only over visual background; becomes solid if contrast fails. |
| `FloatingCard` | A card visually attached to an anchor. Props: `anchor`, `placement`, `children`. | Desktop can overlap; tablet reduces offset; mobile renders in flow or hides if decorative. |
| `GradientBlob` | Non-semantic ambient light field. Props: `colorSet`, `size`, `className`. | `aria-hidden`; no pointer events; static under reduced motion. |
| `GridBackground` | Low-contrast layout texture. Props: `density`, `fade`. | Decorative only; remove when it competes with small-screen text. |
| `SectionTitle` | Eyebrow, heading, optional description and action. Props: `eyebrow?`, `title`, `description?`, `action?`. | One `h2` per section; description max readable measure; stacks action below on mobile. |
| `SkillChip` | Displays a verified skill. Props: `skill`, `interactive?`. | Noninteractive unless filtering; never uses proficiency color alone. |
| `StatCard` | Displays one factual statistic. Props: `stat`, `icon?`, `tone?`. | Value is the anchor; label is always visible; 2-up only when each card is at least 150 px wide. |
| `Timeline` | Ordered experience/milestones. Props: `items`, `variant`. | Chronological DOM order; line is decorative; each item retains date and role text. |
| `CursorGlow` | Optional pointer-responsive light. Props: `enabled`. | Client-only; disabled on touch/coarse pointer and reduced motion; never replaces the system cursor. |

## Narrative and layout components

### `Navigation`
Purpose: expose primary routes and an in-page home anchor map. Props: `items`, `activePath?`, `resumeHref?`. Use a semantic `nav` with an accessible label. Desktop may be inline; mobile uses a real disclosure/menu with escape key, focus return, and no hover dependency. Keep links short and use current-page indication.

### `Hero`
Purpose: establish name, role, point of view, availability, two actions, and a single portrait/interface cluster. Props: `profile`, `statistics`, `primaryAction`, `secondaryAction`. The display name is the anchor; script surname is decorative emphasis, not the only readable name. On mobile, identity precedes portrait. Do not place contact details, every skill, or more than two CTAs here.

### `ProjectCard`
Purpose: make a project understandable before navigation. Props: `project`, `size: "feature" | "standard" | "compact"`, `priority?`. Show title, role, concise outcome/focus, tags, image, and destination. Use an article; make one clear link destination rather than nested interactive controls. Feature size can span more grid columns; compact cards never hide essential metadata.

### `StatisticCard`
Purpose: a section-level alias/composition of `StatCard` for achievement proof. It must source a verified `Statistics` record and never embellish unknown metrics. Do not turn every number into a colorful counter animation.

### `ExperienceTimeline`
Purpose: present selected experience evidence. Props: `experience`, `showAll?`, `action?`. Each item includes organization, role, dates, one concise impact statement, tags, and optional logo. On mobile, the line moves left of content or disappears while chronological headings remain.

### `HackathonCard`
Purpose: present an event/project achievement. Props: `hackathon`, `emphasis?`. The award/placement is a badge only if verified. Use small groups or a rail; avoid a carousel as the only way to access cards.

### `Skills`
Purpose: organize skills by domain. Props: `skills`, `groups?`. Categories use headings; chips are compact evidence rather than a proficiency chart. Never show a numerical mastery score unless an objective source exists.

### `CommunityCard` and `CertificationCard`
Purpose: compact credibility records. Props: `community` or `certification`. Community records show organization, role, concise involvement; certification records show issuer, credential, date, and verified link. Use logos only with correct trademark treatment and alternative text where meaningful.

### `ContactWidget`
Purpose: conclude with a direct, low-friction contact choice. Props: `profile`, `socials`, `resumeHref?`. Email, location, and primary social links must be text-accessible; a QR code is additive and receives an explanatory label. Do not include a form until a delivery/spam/privacy contract exists.

### `QuoteCard`
Purpose: show one short design principle or verified testimonial. Props: `quote`, `attribution?`, `tone?`. Use quotes as breathing-room anchors, not filler. Do not fabricate testimonials.

### `MiniWidgets`
Purpose: composed, small proof modules such as availability, location, or project disciplines. Each widget has one fact and one visual hierarchy. Limit a local cluster to three widgets.

### `Footer`
Purpose: provide closing CTA, copyright, social links, and utility links. Props: `socials`, `copyrightName`, `resumeHref?`. Use semantic footer landmarks and retain links on small screens; do not treat it as a dumping ground.

## Asset components

`SelectionBox`, `PrototypeConnector`, `FloatingCursor`, `GridDots`, `Sparkles`, `FloatingStars`, and `DecorativeShapes` are presentational only. Props should describe placement/size/tone, never business data. Render SVG where possible, set `aria-hidden="true"`, and use `pointer-events: none` unless an asset is a real interactive demo.

## Usage examples

```tsx
<ProjectCard project={projects[0]} size="feature" priority />
<SectionTitle eyebrow="Selected work" title="Designed with clarity, built with care." />
<ContactWidget profile={profile} socials={socials} resumeHref="/resume.pdf" />
```

## Constraints and scalability

Do not create `ProjectCardBlue`, `ProjectCardPink`, or route-specific clones. Add a `tone` or `size` variant only when its semantics are repeatable. Keep files below roughly 300 lines; split data transformations, subparts, or visual assets before a component becomes a page in disguise.
