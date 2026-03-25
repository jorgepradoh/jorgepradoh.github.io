# CLAUDE.md

This is Jorge Prado's personal portfolio and blog site.
Built with Astro 4 + MDX + React. Deploys to GitHub Pages at `jorgepradoh.github.io`.

---

## Stack

- **Astro 4** — static site generator, handles routing and build
- **MDX** — blog posts are `.mdx` files (Markdown + embedded React components)
- **React** — used only for interactive islands inside posts or the portfolio page
- **Shiki** — syntax highlighting in posts (theme: one-dark-pro)
- **GitHub Actions** — auto-deploys on push to `main` via `.github/workflows/deploy.yml`

---

## Commands

```bash
npm run dev      # dev server at localhost:4321 — use this to preview everything
npm run build    # production build → dist/
npm run preview  # serve dist/ locally to verify before pushing
```

---

## Project structure

```
src/
  content/
    blog/           ← .mdx post files live here
    config.ts       ← frontmatter schema (zod)
  layouts/
    Base.astro      ← HTML shell, fonts, CSS variables
    BlogPost.astro  ← single post layout (nav, prose, metadata)
  pages/
    index.astro     ← portfolio landing page
    blog/
      index.astro   ← post listing with tag filter
      [slug].astro  ← dynamic post route (do not edit)
  components/
    ExperimentTable.jsx  ← sortable results table, embeddable in MDX
    Callout.jsx          ← insight/warning/note/result callout block
public/              ← static assets (images, fonts, favicon)
astro.config.mjs     ← Astro config (site URL, integrations)
```

---

## Design system

All colors are CSS variables defined in `Base.astro`:

| Variable    | Value       | Use                          |
|-------------|-------------|------------------------------|
| `--bg`      | `#0D0B1A`   | Page background              |
| `--bg2`     | `#12101F`   | Alternate section background |
| `--cream`   | `#F4EED5`   | Primary text                 |
| `--amber`   | `#FFB300`   | Accents, highlights          |
| `--blue`    | `#00B6FF`   | Links, tags, code            |
| `--green`   | `#00FF9F`   | Lab/research accent          |
| `--muted`   | `#6B6880`   | Subdued text                 |
| `--mutedL`  | `#9D9AB0`   | Secondary text               |
| `--border`  | `rgba(255,255,255,0.07)` | Borders, dividers |
| `--mono`    | `DM Mono`   | Monospace font               |
| `--sans`    | `Inter`     | Body font                    |

Always use these variables. Never hardcode hex values in new components.

---

## Writing a new blog post

Create a new file in `src/content/blog/your-slug.mdx`.

**Frontmatter schema** (defined in `src/content/config.ts`):

```mdx
---
title: "Post title"
description: "One sentence shown on index and in OG tags."
date: 2025-01-15
updated: 2025-02-01      # optional
tags: ["computer-vision", "architecture"]
featured: false           # true = pinned at top of index
draft: false              # true = excluded from build entirely
readingTime: 8            # optional — auto-computed if omitted (~200wpm)
---
```

**Available components** (import at top of the MDX file):

```mdx
import ExperimentTable from '../../components/ExperimentTable.jsx';
import Callout from '../../components/Callout.jsx';
```

`Callout` usage — types: `insight` | `warning` | `note` | `result`:
```mdx
<Callout type="insight">
  Your observation here.
</Callout>
```

`ExperimentTable` usage — add `client:load` so sorting works:
```mdx
<ExperimentTable
  client:load
  caption="Results on MADMAX"
  metric="lower is better"
  highlight="MSRCP"
  columns={["Method", "ATE", "RPE"]}
  rows={[
    ["Baseline", "185.37", "0.1932"],
    ["MSRCP ★",  "165.62", "0.1912"],
  ]}
/>
```

---

## Adding new interactive components

If a post needs a custom interactive demo (chart, slider, canvas experiment, etc.):

1. Create `src/components/YourComponent.jsx` — plain React, no special setup needed
2. Use only CSS variables from the design system for colors
3. Import and embed in the MDX file with `client:load` directive
4. Keep components self-contained — accept all data as props, manage state internally

Example skeleton:
```jsx
import { useState } from "react";

export default function MyDemo({ initialValue = 50 }) {
  const [val, setVal] = useState(initialValue);
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 8, padding: 24 }}>
      {/* your demo */}
    </div>
  );
}
```

---

## Content guidelines

Jorge's writing covers:
- AI systems, software architecture, production decisions and lessons learned
- Space robotics, planetary navigation, visual odometry
- Computer vision research — experiments, paper discussions, thesis follow-ups
- Opinion and notes on papers, conferences, and ideas

Tone: direct, technical, first-person. No fluff. Explain the decision and what was learned.
Prose style: concise paragraphs, concrete numbers where available, honest about failures.

When helping draft or edit posts:
- Match this tone — don't over-explain or hedge unnecessarily
- Use `Callout type="insight"` for key takeaways
- Use `Callout type="warning"` for known failure modes or caveats
- Use `ExperimentTable` whenever there are comparative results
- Code blocks should be complete and runnable where possible
- Prefer `h2` for main sections, `h3` for subsections, `h4` (renders as monospace label) for field names or categories

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml` automatically.
Build takes ~60–90 seconds. Check Actions tab for status.

To preview before pushing:
```bash
npm run build && npm run preview
```

If the build fails, the most common causes are:
- Frontmatter field missing or wrong type — check `src/content/config.ts` for the schema
- MDX import path wrong — paths in MDX are relative to the `.mdx` file location
- React component missing `client:load` directive — required for any component with `useState`/`useEffect`

---

## Future: custom domain

When Jorge buys a domain, two changes needed:
1. Update `site` in `astro.config.mjs` to the new domain
2. Add a `CNAME` file in the repo root containing just the domain name (e.g. `jorgeprado.dev`)

DNS setup: CNAME `www` → `jorgepradoh.github.io`, four A records for apex → GitHub IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
