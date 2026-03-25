# CLAUDE.md

Jorge Prado's personal portfolio and blog.
Live at: https://jorgepradoh.github.io

Stack: Astro 4 + MDX + React. Deploys to GitHub Pages on push to `main`.

---

## Commands

```bash
npm run dev      # dev server → localhost:4321
npm run build    # production build → dist/
npm run preview  # serve dist/ locally before pushing
```

---

## Project structure

```
src/
  components/
    Portfolio.jsx        ← ENTIRE portfolio page (React, single file)
    ExperimentTable.jsx  ← sortable results table, embeds in MDX posts
    Callout.jsx          ← insight/warning/note/result callout, embeds in MDX
  content/
    blog/                ← .mdx post files
    config.ts            ← frontmatter schema (zod)
  layouts/
    Base.astro           ← HTML shell, fonts, global CSS vars
    BlogPost.astro       ← single post layout
  pages/
    index.astro          ← mounts Portfolio.jsx via client:only="react"
    blog/
      index.astro        ← post listing with tag filter
      [slug].astro       ← dynamic post renderer (do not edit)
public/                  ← static assets (images, favicon)
astro.config.mjs         ← Astro config
```

---

## Portfolio page (src/components/Portfolio.jsx)

The entire portfolio is one React file mounted via `client:only="react"` in `index.astro`.
`client:only` is required — the portfolio uses canvas, requestAnimationFrame, and window APIs
that don't exist server-side.

### Sections (in order)

| Section    | id / ref     | Notes                                      |
|------------|--------------|--------------------------------------------|
| Hero       | `about`      | Gravity grid background, typewriter text   |
| Experience | `experience` | Click-to-expand accordion timeline         |
| Projects   | `projects`   | 4 cards in CSS grid                        |
| Lab        | `lab`        | Thesis card + Sobel edge detection demo    |
| Contact    | `contact`    | Links + easter egg hints                   |

### Color palette (P object at top of file)

```js
const P = {
  bg: "#0D0B1A",   bg2: "#12101F",
  cream: "#F4EED5", amber: "#FFB300",
  blue: "#00B6FF",  green: "#00FF9F",
  muted: "#6B6880", mutedL: "#9D9AB0",
  border: "rgba(255,255,255,0.07)",
};
```

Always use P.* references. Never hardcode hex values.

### GravityGrid (hero background)

- Canvas fills the hero section behind all content
- 40×28 flat square mesh drawn with `requestAnimationFrame`
- Mouse cursor creates a **sphere-cap gravity well depression** in the mesh
  - Profile: `depth = sqrt(1 - r²)` where r is normalised distance from cursor (0..1)
  - Well radius: ~180px. Deepest point pulled toward viewer via perspective projection
  - Lines brighten from dim blue at rim to bright cyan at the well center
  - Ambient sine wave animation fades out inside the well
- No nodes, no dots — pure line geometry only
- Gracefully handles resize via ResizeObserver

### Terminal

- Opened by: pressing `` ` `` or `~` anywhere on the page, or clicking `~/_` in nav
- Closed by: ESC, clicking outside, or clicking the red dot
- Arrow up/down navigates command history
- All output is pre-written strings — no eval, no shell, no filesystem access

**Commands:**

| Command          | Output                                      |
|------------------|---------------------------------------------|
| `help`           | Lists all commands                          |
| `whoami`         | Name, title, location                       |
| `skills`         | Tech stack by category                      |
| `thesis`         | MSc research summary                        |
| `results`        | MADMAX transfer learning results table      |
| `datasets`       | Evaluated planetary datasets                |
| `contact`        | GitHub, LinkedIn, location                  |
| `ls`             | Fake directory listing                      |
| `cat cv.pdf`     | CV summary                                  |
| `.secrets`       | Permission denied (easter egg)              |
| `cat .bash_history` | Fake shell history (easter egg)          |
| `konami`         | Hint about the Konami code                  |
| `invaders`       | Closes terminal, launches Space Invaders    |
| `starwars`       | Closes terminal, launches Star Wars crawl   |
| `clear`          | Clears terminal output                      |

### Easter eggs

**Space Invaders** (`invaders` in terminal)
- Full canvas game: 9×4 alien grid, 3 alien types with pixel art (amber/blue/green)
- Player ship, bullets, bombs, score counter, 3 lives
- Aliens speed up as they're killed
- Win screen: "per aspera ad astra"
- Mobile: canvas scales to fit screen width; touch buttons replace keyboard
- ESC to quit

**Star Wars crawl** (`starwars` in terminal)
- Full-screen black background, perspective `rotateX(25deg)` scroll animation (52s)
- Content: Jorge's thesis results written as the rebellion's victory
- Click or ESC to exit

**Konami code** (↑↑↓↓←→←→BA anywhere on page)
- Modal: "+30 LIVES GRANTED", rover emoji, "per aspera ad astra"

### Sobel edge detection demo (Lab section)

Located in `EdgeDemo` component inside Portfolio.jsx.

- Three input modes:
  - `procedural` — generated Mars-analog terrain via sine wave synthesis
  - Sample images — public domain NASA imagery loaded from Wikimedia URLs
  - `↑ upload image` — visitor uploads any image from their device
- Sobel kernel applied pixel-by-pixel on `ImageData`
- Threshold slider (10–140) controls feature density
- Overlay toggle: edges only vs. edges over dimmed original
- Regenerate button (procedural mode only)
- Graceful CORS fallback if sample image can't load

### Navigation

- Fixed top bar, blur backdrop
- Links: about / experience / projects / lab (green accent) / contact
- `~/_` button opens terminal
- Scroll spy via IntersectionObserver — highlights active section
- Mobile (≤640px): collapses to hamburger drawer
  - Animated hamburger → X on open
  - Terminal accessible from drawer as `~/_ terminal`

### Mobile handling

- `useIsMobile()` hook (window.innerWidth < 640, updates on resize)
- Hero uses `100svh` on mobile (respects browser chrome)
- Experience: role/company/date stack vertically on mobile
- Space Invaders: CSS `transform: scale()` to fit canvas; touch buttons rendered
- `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` on all buttons

---

## Blog (src/pages/blog/, src/content/blog/)

### Writing a post

Create `src/content/blog/your-slug.mdx`:

```mdx
---
title: "Post title"
description: "One sentence — shown on index and in OG tags."
date: 2025-01-15
updated: 2025-02-01      # optional
tags: ["computer-vision", "space-robotics"]
featured: false           # true = pinned at top of index
draft: false              # true = excluded from build
readingTime: 8            # optional — auto-computed ~200wpm if omitted
---

import ExperimentTable from '../../components/ExperimentTable.jsx';
import Callout from '../../components/Callout.jsx';

Your Markdown content here...
```

### Components available in posts

**Callout** — types: `insight` | `warning` | `note` | `result`
```mdx
<Callout type="insight">
  Key takeaway or observation.
</Callout>
```

**ExperimentTable** — sortable, highlights best row
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

### Adding a new interactive component for a post

1. Create `src/components/YourComponent.jsx` — plain React, no special setup
2. Use CSS variables (`var(--blue)`, `var(--amber)`, etc.) — never hardcode colors
3. Import in MDX with `client:load` if it uses React state/effects:
   ```mdx
   import YourComponent from '../../components/YourComponent.jsx';
   <YourComponent client:load someData={[1, 2, 3]} />
   ```
4. Keep components self-contained — accept all data as props, manage own state

### Prose style guide

Jorge's writing: direct, technical, first-person. Concrete numbers. Honest about failures.
- `h2` — main sections
- `h3` — subsections  
- `h4` — renders as monospace uppercase label (field names, categories)
- `Callout type="insight"` — key takeaways
- `Callout type="warning"` — failure modes, caveats
- `ExperimentTable` — any time there are comparative results
- Code blocks should be complete and runnable

### Blog index features

- Sorted by date descending
- Client-side tag filtering (no page reload)
- Auto-computed reading time (~200wpm)
- `featured: true` pins a post with a badge

---

## Content: Jorge's background

**Jorge Alberto Prado Herrada** — AI Engineer & Space Robotics researcher, Torreón MX.
Open to research positions in France/EU.

MSc Space Science, INAOE 2024
- Thesis: "A Transformer-based Visual Odometry framework applied to extremely
  unstructured Planetary Environments"
- Framework: TSformer-VO + MSRCP preprocessing
- Dataset: MADMAX (Morocco Sahara Mars-analog, 36 sequences, 8 sites)
- Result: MSRCP improved ATE ~10.6% over baseline; competitive RPE vs DSO, ORB-SLAM3
- First ViT applied to planetary VO at real-time performance

BEng Mechatronics, La Salle Laguna 2020

**Experience:**
- Founding AI Data Engineer — AuraChat.Ai (2025–2026, remote LA)
- AI Engineer — VW Financial Services México (2024–2025, Puebla)
- QA/Automation Engineer — VW Financial Services México (2023–2024, Puebla)
- Research Assistant — INAOE (2022–2023, Puebla)

**Links:** github.com/jorgepradoh · linkedin.com/in/jorge-a-prado

---

## Deployment

Push to `main` → GitHub Actions builds and deploys automatically (~60–90s).
Check the Actions tab for build status.

```bash
npm run build && npm run preview  # verify locally before pushing
```

**Common build failures:**
- Missing/wrong frontmatter field → check `src/content/config.ts`
- MDX import path wrong → paths are relative to the `.mdx` file
- React component with state missing `client:load` directive
- Canvas/window API in a component rendered server-side → add `client:only="react"`

---

## Future: custom domain

When buying a domain:
1. Update `site` in `astro.config.mjs` to the new domain
2. Add `CNAME` file in repo root with just the domain (e.g. `jorgeprado.dev`)
3. DNS: CNAME `www` → `jorgepradoh.github.io`; A records for apex:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`