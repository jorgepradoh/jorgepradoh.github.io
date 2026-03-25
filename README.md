# Jorge Prado — Site Setup

Astro + MDX + React. Portfolio at `/`, blog at `/blog`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
```

## Project structure

```
src/
  content/
    blog/           ← your .mdx posts live here
    config.ts       ← frontmatter schema (edit to add fields)
  layouts/
    Base.astro      ← HTML shell, fonts, global CSS vars
    BlogPost.astro  ← single post wrapper (nav, prose styles, metadata)
  pages/
    index.astro     ← portfolio (or import your React SPA here)
    blog/
      index.astro   ← post listing with tag filter
      [slug].astro  ← dynamic post renderer
  components/
    ExperimentTable.jsx  ← sortable results table for posts
    Callout.jsx          ← insight/warning/note/result callout blocks
```

## Writing a post

Create `src/content/blog/your-slug.mdx`:

```mdx
---
title: "Your post title"
description: "One sentence — shown on the index and in OG tags."
date: 2025-01-15
tags: ["computer-vision", "architecture"]
featured: false       # pin to top of index
draft: false          # true = excluded from build
---

import ExperimentTable from '../../components/ExperimentTable.jsx';
import Callout from '../../components/Callout.jsx';

Your Markdown content here.

## Section heading

Normal prose, **bold**, `inline code`, [links](https://example.com).

<Callout type="insight">
  Any React component works inline. This one renders a highlighted aside.
</Callout>

<ExperimentTable
  client:load
  caption="My experiment results"
  highlight="Best method"
  columns={["Method", "Metric A", "Metric B"]}
  rows={[
    ["Baseline",     "0.42", "0.88"],
    ["Best method ★","0.31", "0.94"],
  ]}
/>
```

## Frontmatter fields

| Field         | Type     | Required | Notes                          |
|---------------|----------|----------|--------------------------------|
| `title`       | string   | ✓        |                                |
| `description` | string   | ✓        | Used in OG tags + index card   |
| `date`        | date     | ✓        | YYYY-MM-DD                     |
| `updated`     | date     |          | Shows "updated" in post header |
| `tags`        | string[] |          | Used for filtering on index    |
| `featured`    | boolean  |          | Pins post to top of index      |
| `draft`       | boolean  |          | Excluded from production build |
| `readingTime` | number   |          | Override auto-computed estimate|

## Adding interactive components

Any `.jsx` component can be embedded in MDX.
Use `client:load` directive for interactive (React state) components:

```mdx
import MyChart from '../../components/MyChart.jsx';
<MyChart client:load data={[1, 2, 3]} />
```

Static components (no state needed) can omit the directive entirely.

## Deploy to GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: actions/deploy-pages@v4
        with: { path: dist }
```

Set GitHub Pages source to **GitHub Actions** in repo Settings → Pages.
