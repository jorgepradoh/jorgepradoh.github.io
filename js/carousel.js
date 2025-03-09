// Array of project objects (add or modify as needed)
const projects = [
  {
    image: 'images/project1.png',
    markdown: `
# Project One
A brief description of project one written in **markdown**.
- Feature A
- Feature B
    `
  },
  {
    image: 'images/project2.png',
    markdown: `
# Project Two
Details about project two.
- Innovative design
- Cutting-edge technology
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
    // Create a container for each slide
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    // Use marked.js to convert markdown to HTML
    slide.innerHTML = `
      <img src="${project.image}" alt="Screenshot for project ${index + 1}">
      <div class="project-description">${marked.parse(project.markdown)}</div>
    `;
    carousel.appendChild(slide);
  });
}

// Navigation logic: scroll by one slide width
function setupNavigation() {
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  // Get the width of one slide (assumes all slides are same width)
  const slideWidth = carousel.querySelector('.carousel-slide').clientWidth;

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });
}

// Initialize carousel on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderCarousel();
  setupNavigation();
});
