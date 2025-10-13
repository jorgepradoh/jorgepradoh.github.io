---filename: config.yml---
baseURL: https://jorgeprado.github.io/
languageCode: en-us
title: Jorge Prado - AI & Robotics Engineer
theme: PaperMod
defaultContentLanguage: en

outputs:
  home:
    - HTML
    - JSON

params:
  author: Jorge Prado
  description: AI & Robotics Engineer. Portfolio and technical blog.
  keywords: AI, Robotics, Machine Learning, Data Engineering
  socialLinks:
    - name: GitHub
      url: https://github.com/jorgeprado
    - name: LinkedIn
      url: https://linkedin.com/in/jorgeprado
  
  theme:
    colorScheme: auto
    darkMode:
      background: "#1A1535"
      primary: "#EDEDED"
      secondary: "#AAA"
      accent1: "#FFB300"
      accent2: "#00B6FF"
    lightMode:
      background: "#F4EED5"
      primary: "#1E1E1E"
      secondary: "#555"
      accent1: "#FFB300"
      accent2: "#00B6FF"
  
  fonts:
    body: "DM Mono"
    headings: "Inter"
  
  analytics:
    goatCounter: "jorgeprado"

taxonomies:
  category: categories
  tag: tags

languages:
  en:
    languageName: English
    weight: 1
    contentDir: content/en
    outputs:
      home:
        - HTML
    menu:
      main:
        - name: Blog
          url: /blog
          weight: 1
        - name: Projects
          url: /projects
          weight: 2
        - name: About
          url: /about
          weight: 3
  
  es:
    languageName: Español
    weight: 2
    contentDir: content/es
    outputs:
      home:
        - HTML
    menu:
      main:
        - name: Blog
          url: /es/blog
          weight: 1
        - name: Proyectos
          url: /es/projects
          weight: 2
        - name: Acerca de
          url: /es/about
          weight: 3

---filename: layouts/_default/baseof.html---
<!DOCTYPE html>
<html lang="{{ .Lang }}" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ .Title }} | {{ .Site.Title }}</title>
    <meta name="description" content="{{ .Summary }}">
    {{ with .OutputFormats.Get "json" }}
    <link rel="{{ .Rel }}" type="{{ .MediaType.Type }}" href="{{ .Permalink }}">
    {{ end }}
    <link rel="icon" href="{{ `favicon.ico` | relURL }}">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg: #F4EED5;
            --primary: #1E1E1E;
            --secondary: #555;
            --accent1: #FFB300;
            --accent2: #00B6FF;
        }
        
        @media (prefers-color-scheme: dark) {
            :root {
                --bg: #1A1535;
                --primary: #EDEDED;
                --secondary: #AAA;
                --accent1: #FFB300;
                --accent2: #00B6FF;
            }
        }
        
        html.dark {
            --bg: #1A1535;
            --primary: #EDEDED;
            --secondary: #AAA;
        }
        
        html.light {
            --bg: #F4EED5;
            --primary: #1E1E1E;
            --secondary: #555;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DM Mono', monospace;
            background: var(--bg);
            color: var(--primary);
            line-height: 1.6;
            transition: background 0.3s, color 0.3s;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Inter', sans-serif;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        
        a {
            color: var(--accent2);
            text-decoration: none;
            transition: color 0.2s;
        }
        
        @media (prefers-color-scheme: light) {
            a:hover { color: var(--accent2); }
        }
        
        @media (prefers-color-scheme: dark) {
            a:hover { color: var(--accent1); }
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        main {
            min-height: calc(100vh - 200px);
            padding: 2rem 0;
        }
    </style>
    {{ partial "custom.html" }}
</head>
<body>
    {{ partial "scroll-progress.html" }}
    {{ partial "navbar.html" }}
    <main class="container">
        {{ block "main" . }}{{ end }}
    </main>
    {{ partial "footer.html" }}
    {{ template "_internal/google_analytics.html" . }}
    {{ if .Site.Params.analytics.goatCounter }}
    <script data-goatcounter="https://{{ .Site.Params.analytics.goatCounter }}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
    {{ end }}
    <script src="{{ `js/theme-toggle.js` | relURL }}"></script>
</body>
</html>

---filename: layouts/partials/navbar.html---
<nav class="navbar">
    <div class="container navbar-content">
        <div class="navbar-logo">
            <a href="{{ .Site.BaseURL }}">{{ .Site.Title }}</a>
        </div>
        <ul class="navbar-menu">
            {{ range .Site.Menus.main }}
            <li><a href="{{ .URL }}">{{ .Name }}</a></li>
            {{ end }}
            <li><button id="theme-toggle" class="theme-btn">🌙</button></li>
        </ul>
    </div>
</nav>
<style>
.navbar {
    background: var(--bg);
    border-bottom: 1px solid var(--secondary);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background 0.3s;
}

.navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-logo a {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    color: var(--primary);
    font-size: 1.2rem;
}

.navbar-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
}

.navbar-menu a {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.navbar-menu a:hover {
    text-shadow: 0 0 8px var(--accent1);
}

.theme-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    transition: transform 0.2s;
}

.theme-btn:hover {
    transform: rotate(15deg);
}
</style>

---filename: layouts/partials/footer.html---
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <p>&copy; {{ now.Year }} {{ .Site.Params.author }}. All rights reserved.</p>
            <div class="social-links">
                {{ range .Site.Params.socialLinks }}
                <a href="{{ .url }}" target="_blank" rel="noopener noreferrer" title="{{ .name }}">{{ .name }}</a>
                {{ end }}
            </div>
        </div>
    </div>
</footer>
<style>
.footer {
    background: var(--bg);
    border-top: 1px solid var(--secondary);
    padding: 2rem 0;
    margin-top: 4rem;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
}

.footer-content p {
    font-size: 0.85rem;
    color: var(--secondary);
}

.social-links {
    display: flex;
    gap: 1.5rem;
}

.social-links a {
    font-size: 0.85rem;
    transition: all 0.2s;
    position: relative;
}

.social-links a:hover {
    text-shadow: 0 0 8px var(--accent1);
}
</style>

---filename: layouts/partials/scroll-progress.html---
<div class="scroll-progress" id="scroll-progress"></div>
<style>
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent2), var(--accent1));
    box-shadow: 0 0 10px var(--accent2);
    width: 0%;
    z-index: 999;
    transition: width 0.1s ease;
}
</style>
<script>
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrollPercent + '%';
});
</script>

---filename: layouts/partials/custom.html---
<style>
@media (prefers-color-scheme: light) {
    body {
        background: #F4EED5;
        color: #1E1E1E;
    }
    a:hover { color: #00B6FF; }
}

@media (prefers-color-scheme: dark) {
    body {
        background: #1A1535;
        color: #EDEDED;
    }
    a:hover { color: #FFB300; }
}

.fade-in {
    animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card {
    border: 1px solid var(--secondary);
    padding: 1.5rem;
    border-radius: 8px;
    transition: all 0.3s;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 182, 255, 0.15);
    border-color: var(--accent2);
}
</style>

---filename: static/js/theme-toggle.js---
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    html.classList.add(savedTheme);
    updateThemeIcon(savedTheme);
} else if (prefersDark) {
    html.classList.add('dark');
    updateThemeIcon('dark');
}

themeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    html.classList.remove(isDark ? 'dark' : 'light');
    html.classList.add(newTheme);
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

---filename: content/en/projects/_index.md---
---
title: "Projects"
description: "AI & Robotics projects showcasing technical expertise"
---

---filename: content/en/projects/project-1-voice-agent.md---
---
title: "AI Voice Agent Framework"
description: "End-to-end framework for building conversational AI agents with voice I/O, integrating speech-to-text, LLM reasoning, and text-to-speech synthesis."
date: 2024-10-01
draft: false
tags: ["LLMs", "AI Agents", "Voice", "Real-time"]
categories: ["AI", "AI Agents", "LLMs"]
tech: ["Python", "FastAPI", "OpenAI API", "WebSockets", "Eleven Labs"]
link: "https://github.com/jorgeprado/voice-agent-framework"
---

Built a production-ready voice agent framework enabling real-time conversational interactions. Features include streaming audio processing, multi-turn context management, and low-latency response generation.

---filename: content/en/projects/project-2-ocr-fraud.md---
---
title: "OCR-Based Fraud Detection System"
description: "Computer vision pipeline for detecting fraudulent documents using OCR and anomaly detection algorithms."
date: 2024-09-15
draft: false
tags: ["Computer Vision", "Fraud Detection", "OCR", "ML"]
categories: ["Computer Vision", "Machine Learning", "Data Analysis"]
tech: ["TensorFlow", "OpenCV", "Python", "PostgreSQL"]
link: "https://github.com/jorgeprado/ocr-fraud-detection"
---

Developed a document analysis system combining OCR with machine learning to identify forged or tampered documents. Achieves 96% accuracy on test dataset with real-time processing capabilities.

---filename: content/en/projects/project-3-robotics-cv.md---
---
title: "Robotics Vision Perception Module"
description: "Real-time object detection and pose estimation for autonomous robot navigation and manipulation."
date: 2024-08-20
draft: false
tags: ["Robotics", "Computer Vision", "Real-time", "Embedded"]
categories: ["Robotics", "Computer Vision", "Infrastructure"]
tech: ["ROS2", "YOLO", "OpenCV", "C++", "NVIDIA Jetson"]
link: "https://github.com/jorgeprado/robotics-cv-module"
---

Engineered a perception pipeline for mobile manipulators, enabling autonomous object detection, 6D pose estimation, and grasp planning. Deployed on NVIDIA Jetson with <50ms latency.

---filename: content/es/projects/project-1-voice-agent.md---
---
title: "Marco de Trabajo para Agente de Voz IA"
description: "Marco de trabajo completo para construir agentes IA conversacionales con entrada/salida de voz, integrando síntesis de voz, razonamiento LLM y conversión de texto a voz."
date: 2024-10-01
draft: false
tags: ["LLMs", "Agentes IA", "Voz", "Tiempo Real"]
categories: ["IA", "Agentes IA", "LLMs"]
tech: ["Python", "FastAPI", "API OpenAI", "WebSockets", "Eleven Labs"]
link: "https://github.com/jorgeprado/voice-agent-framework"
---

Construí un marco de trabajo de agentes de voz listo para producción que permite interacciones conversacionales en tiempo real. Incluye procesamiento de audio en streaming, gestión de contexto de múltiples turnos y generación de respuestas de baja latencia.

---filename: content/en/blog/_index.md---
---
title: "Blog"
description: "Technical articles on AI, Robotics, and Cloud Infrastructure"
---

---filename: content/en/blog/deploying-llms-vpcs.md---
---
title: "Deploying LLMs Securely in VPCs"
date: 2024-10-10
tags: ["LLMs", "Cloud Computing", "Infrastructure", "Security"]
categories: ["LLMs", "Cloud Computing", "Infrastructure"]
readingTime: 8
draft: false
---

Securing large language models in enterprise VPCs requires careful consideration of network isolation, encryption, and access controls. This post covers best practices for deploying LLMs using AWS PrivateLink, VPC endpoints, and IAM policies to maintain security without sacrificing performance.

Key topics:
- VPC architecture patterns for LLM inference
- Network encryption and TLS configuration
- IAM role strategies for service-to-service authentication
- Monitoring and logging in isolated environments

---filename: content/en/blog/building-ai-agents-mcp.md---
---
title: "Building AI Agents with Model Context Protocol"
date: 2024-09-25
tags: ["AI Agents", "MCP", "LLMs", "Architecture"]
categories: ["AI Agents", "AI", "MCP"]
readingTime: 10
draft: false
---

The Model Context Protocol (MCP) enables AI agents to dynamically access tools and data sources while maintaining stateless, scalable architectures. Learn how to design MCP-compatible agents and integrate them with popular LLM frameworks.

This article explores:
- MCP specification and protocol design
- Implementing custom MCP servers
- Integration with Claude and other LLMs
- Production deployment considerations

---filename: content/es/blog/deploying-llms-vpcs.md---
---
title: "Implementar LLMs de Forma Segura en VPCs"
date: 2024-10-10
tags: ["LLMs", "Computación en la Nube", "Infraestructura", "Seguridad"]
categories: ["LLMs", "Computación en la Nube", "Infraestructura"]
readingTime: 8
draft: false
---

Asegurar modelos de lenguaje grande en VPCs empresariales requiere considerar cuidadosamente el aislamiento de red, cifrado y controles de acceso. Este artículo cubre las mejores prácticas para implementar LLMs usando AWS PrivateLink, puntos finales VPC y políticas IAM.

---filename: archetypes/blog.md---
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
tags: []
categories: []
readingTime: 0
---

---filename: .github/workflows/hugo-deploy.yml---
name: Deploy Hugo Site

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: latest
        extended: true

    - name: Build
      run: hugo --minify

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
        publish_branch: gh-pages

---filename: README.md---
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

---filename: content/en/about/_index.md---
---
title: "About"
---

Hi, I'm Jorge Prado, an AI & Robotics Engineer focused on building intelligent systems at scale.

### Technical Stack

**AI & ML**: LLMs, Computer Vision, Deep Learning, Reinforcement Learning
**Infrastructure**: AWS, Docker, Kubernetes, VPC networking
**Robotics**: ROS2, embedded systems, autonomous navigation
**Languages**: Python, C++, TypeScript, Go

### Current Focus

Exploring the intersection of large language models and robotics, building production-grade AI systems, and sharing knowledge through technical writing.

---filename: content/es/about/_index.md---
---
title: "Acerca de"
---

Hola, soy Jorge Prado, un ingeniero de IA y Robótica enfocado en construir sistemas inteligentes a escala.

### Stack Técnico

**IA & ML**: LLMs, Visión por Computadora, Aprendizaje Profundo, Aprendizaje por Refuerzo
**Infraestructura**: AWS, Docker, Kubernetes, redes VPC
**Robótica**: ROS2, sistemas embebidos, navegación autónoma
**Lenguajes**: Python, C++, TypeScript, Go

### Enfoque Actual

Explorando la intersección entre modelos de lenguaje grande y robótica, construyendo sistemas de IA listos para producción y compartiendo conocimiento a través de escritura técnica.