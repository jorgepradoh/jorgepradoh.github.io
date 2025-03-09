(function() {
    const canvas = document.getElementById('starfieldCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 250; // Number of stars (adjust as needed)
  
    // Resize canvas to fit viewport
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  
    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Pixel-art sized stars
        speed: Math.random() * 0.5 + 0.2  // Slow upward movement
      });
    }
  
    // Animate stars: move upward, reset to bottom when off-screen
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFF';
      for (let star of stars) {
        ctx.fillRect(star.x, star.y, star.size, star.size);
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  })();
  