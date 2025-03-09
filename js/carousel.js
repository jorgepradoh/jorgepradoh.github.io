// Array of project objects (update or add projects as needed)
const projects = [
  {
    image: 'images/project1.png',
    markdown: `
# Project One
A brief description of project one written in **markdown**.
- Feature A
- Feature B

\`\`\`mermaid
graph LR
  A[Start] --> B[Process]
  B --> C[Finish]
\`\`\`
    `
  },
  {
    image: 'images/project2.png',
    markdown: `
# Project Two
Details about project two.
- Innovative design
- Cutting-edge technology

\`\`\`mermaid
sequenceDiagram
  participant Alice
  participant Bob
  Alice->>Bob: Hello Bob, how are you?
  Bob-->>Alice: I am good thanks!
\`\`\`
    `
  },
  {
    image: 'images/project3.png',
    markdown: `
# Project Three
Overview of project three.
- Modular
- Scalable
    `
  }
];

// Render carousel slides from the projects array
function renderCarousel() {
  const carousel = document.getElementById('carousel');
  projects.forEach((project, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    // Add index overlay and convert markdown to HTML using marked.js
    slide.innerHTML = `
      <img src="${project.image}" alt="Project ${index + 1}">
      <div class="project-description">${marked.parse(project.markdown)}</div>
      <div class="carousel-index">${index + 1} / ${projects.length}</div>
    `;
    carousel.appendChild(slide);
  });

  // After rendering, initialize Mermaid diagrams (if any)
  mermaid.init(undefined, document.querySelectorAll('.project-description pre code.language-mermaid, .project-description .mermaid'));
}

// Navigation logic: scroll one slide at a time
function setupNavigation() {
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  // Assumes all slides have the same width
  const slideWidth = carousel.querySelector('.carousel-slide').clientWidth;

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderCarousel();
  setupNavigation();
});
