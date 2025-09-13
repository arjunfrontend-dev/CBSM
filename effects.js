// --- Reveal Sections on Scroll ---
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{ threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));

// --- Festive Particles ---
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".hero").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedY = 0.3 + Math.random() * 0.7;
    this.color = ["#e85f30", "#00cfc1", "#ffd700"][Math.floor(Math.random()*3)];
    this.alpha = 0.4 + Math.random() * 0.6;
  }
  update() {
    this.y += this.speedY;
    if(this.y > canvas.height) { this.y = -10; this.x = Math.random()*canvas.width; }
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
const particles = Array.from({length:70},()=>new Particle());

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();