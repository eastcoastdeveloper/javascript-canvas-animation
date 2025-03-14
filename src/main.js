import './style.css'

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.speedZ = Math.random() * 3 - 1.5;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = ['#0080ff', '#007acc', '#f7df1e', '#1e1e1e'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.z += this.speedZ;

    if (this.x > canvas.width || this.x < 0) {
      this.x = Math.random() * canvas.width;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.y = Math.random() * canvas.height;
    }
    if (this.z > 1000 || this.z < -1000) {
      this.z = Math.random() * 2000 - 1000;
    }
  }

  draw() {
    const scale = 1 / (1 + Math.abs(this.z) / 500);
    const scaledSize = this.size * scale;
    const scaledX = (this.x - canvas.width / 2) * scale + canvas.width / 2;
    const scaledY = (this.y - canvas.height / 2) * scale + canvas.height / 2;

    // Ensure the radius is always positive and not too small
    if (scaledSize > 0.5) {
      ctx.beginPath();
      ctx.arc(scaledX, scaledY, scaledSize, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

// Array to hold particles
const particlesArray = [];

// Function to create particles
function createParticles() {
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const z = Math.random() * 2000 - 1000;
    particlesArray.push(new Particle(x, y, z));
  }
}

// Function to handle animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animate);
}

// Event listeners for resizing the canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray.length = 0;
  createParticles();
});

// Initialize particles and start animation
createParticles();
animate();

// Text animation
const textContainer = document.querySelector('.text-container');
const texts = document.querySelectorAll('.text');
let currentIndex = 0;

function showText(index) {
  texts.forEach((text, i) => {
    if (i === index) {
      text.style.opacity = 1;
      text.style.zIndex = 1;
    } else {
      text.style.opacity = 0;
      text.style.zIndex = -1;
    }
  });
}

function animateText() {
  showText(currentIndex);
  currentIndex = (currentIndex + 1) % texts.length;
  setTimeout(animateText, 3000); // Change text every 3 seconds
}

// Start text animation
animateText();
