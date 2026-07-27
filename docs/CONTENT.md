# Content model

## Purpose and scope

Content is a verified, typed source of truth—not decorative filler. This document defines what each content domain contains, how it is presented, and what must be verified before publication. It does not authorize the invention of results, roles, awards, metrics, or testimonials.

## Source policy

The supplied visual references contain draft portfolio facts such as availability, role labels, statistics, experience entries, and hackathon cards. Treat those as **content candidates pending Helena’s confirmation**, not evidence. Populate `data/` only from the résumé, official links, certificates, project material, or explicit approval. Unknown information remains omitted or clearly marked as a draft in private planning—not published as a placeholder claim.

## Typed content domains

| Domain | Required content | Presentation and UI pattern |
| --- | --- | --- |
| Hero | name, verified role line, one-sentence value proposition, availability, two actions | Large display type, script surname treatment, portrait/interface cluster, availability badge |
| About | 60–100 word point of view, disciplines, optional personal context | Editorial card beside or after supporting stats |
| Experience | organization, role, type, location, ISO dates, verified impact, tags, logo | Timeline with short evidence-led entries |
| Projects | `Project` record plus project specification | Dominant card and project archive; see `PROJECTS.md` |
| Hackathons | event, date, project, contribution, verified achievement, summary | Compact event cards, max four in a home group |
| Leadership | role, organization, dates, contribution, evidence link | Community/leadership card; separate title from organization |
| Communities | organization, role, description, link, logo | Logo-led compact card with readable text fallback |
| Certifications | official name, issuer, issued date, ID/link, badge | Credential list/card with issuer and date |
| Skills | official skill name, category, optional verified level | Grouped noninteractive chips by discipline |
| Statistics | exact value, label, evidence source, optional description | Stat cards; no animated counter required |
| Contact | public email, location granularity, social links, résumé link | Contact widget; QR code only as an additional path |
| Design philosophy | 1–3 short principles rooted in real practice | Quote/mini-widget or concise editorial statement |
| Quotes | exact quote, author/role if testimonial, permission status | QuoteCard; never fabricate testimonials |
| Taglines / CTA | short action-safe variants | Hero, project and footer actions |

## Editorial structure

### Hero

Title: Helena R. Herrero. Subtitle: a verified role combination, for example `UI/UX designer and frontend developer` only when confirmed. Lead copy must explain the work in 25–40 words: problem framing, experience focus, and implementation perspective. Primary CTA routes to selected work; secondary CTA is résumé or contact. The portrait is supporting evidence of authorship, not a substitute for the role statement.

### About and design philosophy

Use a short first-person paragraph, not a life story. Structure: discipline → approach → desired outcome. Example pattern: “I turn complex needs into clear, human-centered digital experiences through research, prototyping, and careful frontend implementation.” Replace only with Helena-approved wording. A separate philosophy quote may state one memorable principle, but it cannot repeat the paragraph.

### Experience

Lead with role and organization, then dates. Describe contribution using action + context + outcome where verified. Example form: “Collaborated with design and engineering to clarify feature flows and document UX feedback.” Do not claim that an individual “shipped” a result unless the scope is precise and true.

### Skills, credentials, and communities

Group skills by discipline (`Product design`, `Frontend`, `AI & data`, `Tools`) rather than one long alphabetical cloud. Credentials retain their official title. Community entries describe contribution rather than prestige. These are supporting proof, so their copy must be shorter and quieter than project copy.

### Contact

Use a decisive invitation: `Let’s build products people love using.` only after Helena approves it. Provide text links for email, LinkedIn, portfolio, and résumé. A telephone number, exact city, and QR code should be published only with explicit consent.

## Data workflow

1. Add/verify an interface in `types/` before a new domain enters `data/`.
2. Store ISO dates, stable slugs, and local asset paths in records.
3. Keep copy presentation-neutral; line breaks, truncation, and visual emphasis belong to components.
4. Add a source/verification note privately during intake when a metric or credential is sensitive.
5. Render from the relevant data file; never duplicate content in a route.

## Content constraints and future scalability

Home copy is concise and scannable. Long narratives belong in future case-study or article routes. A CMS/MDX source must adapt into the same types rather than changing component contracts. Content additions must retain the identity → work → proof → contact hierarchy.
