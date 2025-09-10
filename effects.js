const effectsContainer = document.querySelector('.hero-effects');
const fwColors = ['#e85f30', '#00cfc1', '#ffcc00'];
const balloonColors = ['#e85f30', '#00cfc1', '#ffcc00', '#ff66b3'];

// 🔊 Sound setup
let soundOn = true;
const popSound = new Audio("assets/sounds/pop.mp3");
const fireworkSound = new Audio("assets/sounds/firework.mp3");
function playSound(audio) {
  if (!soundOn) return;
  const sound = audio.cloneNode();
  sound.volume = 0.5;
  sound.play().catch(() => {});
}
document.getElementById("sound-toggle").addEventListener("click", e => {
  soundOn = !soundOn;
  e.target.textContent = soundOn ? "🔊 Sound On" : "🔇 Sound Off";
});

// Firework burst
function createBurst(x, y) {
  playSound(fireworkSound);
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = fwColors[Math.floor(Math.random() * fwColors.length)];
    effectsContainer.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80 + 30;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.animate(
      [{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }],
      { duration: 1200, easing: 'ease-out' }
    );
    setTimeout(() => particle.remove(), 1200);
  }
}

// Launch balloons
function launchBalloon() {
  const balloonWrapper = document.createElement('div');
  balloonWrapper.className = 'balloon';
  balloonWrapper.style.left = `${Math.random() * 90 + 5}%`;

  const scale = (Math.random() * 0.6 + 0.7).toFixed(2);
  const floatDuration = Math.floor(Math.random() * 6) + 12;
  balloonWrapper.style.animation = `floatUp ${floatDuration}s linear forwards, sway 4s ease-in-out infinite`;
  balloonWrapper.style.transform = `scale(${scale})`;

  const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  const uniqueId = `shine-${Date.now()}-${Math.random()}`;

  balloonWrapper.innerHTML = `
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${uniqueId}" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="40" rx="25" ry="35" fill="url(#${uniqueId})" stroke="#222" stroke-width="1"/>
      <polygon points="25,70 35,70 30,80" fill="${color}" />
      <line x1="30" y1="80" x2="30" y2="95" stroke="#aaa" stroke-width="2"/>
    </svg>
  `;

  effectsContainer.appendChild(balloonWrapper);

  // Sparkle trails
  let sparkleInterval = setInterval(() => {
    if (!document.body.contains(balloonWrapper)) return;
    const rect = balloonWrapper.getBoundingClientRect();
    const sparkle = document.createElement('div');
    sparkle.className = 'trail';
    sparkle.style.background = fwColors[Math.floor(Math.random() * fwColors.length)];
    sparkle.style.left = `${rect.left + Math.random() * 40}px`;
    sparkle.style.top = `${rect.top + 40 + Math.random() * 20}px`;
    effectsContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }, 300 + Math.random() * 300);

  setTimeout(() => {
    clearInterval(sparkleInterval);
    if (Math.random() > 0.5) {
      const rect = balloonWrapper.getBoundingClientRect();
      playSound(popSound);
      createBurst(rect.left + 30, rect.top);
    }
    balloonWrapper.remove();
  }, floatDuration * 1000);
}

setInterval(launchBalloon, 2500);
