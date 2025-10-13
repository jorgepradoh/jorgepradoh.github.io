# Jorge Prado - AI & Robotics Portfolio

A minimal, techy portfolio and blog powered by Hugo and PaperMod, hosted on GitHub Pages.

## Features

- 📱 Responsive design with DM Mono and Inter typography
- 🌓 Dark/light theme toggle with system preference detection
- 🌍 Bilingual support (English/Spanish)
- 📊 Analytics via GoatCounter
- ⚡ Fast static site generation
- 🎨 Custom PaperMod theme with accent colors (Amber, Portal Blue)

## Setup

### Prerequisites
- Hugo (extended version)
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/jorgeprado/jorgeprado.github.io.git
cd jorgeprado.github.io

# Install PaperMod theme
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod

# Run Hugo server
hugo server -D
```

Visit `http://localhost:1313` to preview the site.

### Deployment

Push to the `main` branch. GitHub Actions automatically builds and deploys to `gh-pages`.

## Project Structure

```
.
├── content/
│   ├── en/
│   │   ├── blog/
│   │   ├── projects/
│   │   └── about/
│   └── es/
│       ├── blog/
│       ├── projects/
│       └── about/
├── layouts/
│   ├── _default/
│   └── partials/
├── static/
│   └── js/
├── config.yml
└── README.md
```

## Customization

Edit `config.yml` to update:
- Site title and description
- GoatCounter analytics ID
- Social media links
- Color palette

Edit CSS in `layouts/partials/custom.html` to adjust styling.