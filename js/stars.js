const starsContainer = document.getElementById('stars');
let stars = [];
let score = 0;
const scoreDisplay = document.getElementById('score');
const cursor = document.querySelector('.cursor-paw');
const numInitialStars = 80;

// Sterne erstellen (mit zufälliger Helligkeit und Tiefe)
function createStar(sizeRange = [10, 25]) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
  s.style.width = size + 'px';
  s.style.height = size + 'px';

  // Position & Bewegung
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  s.dataset.x = x;
  s.dataset.y = y;
  s.dataset.dx = (Math.random() * 2 - 1) * 0.3;
  s.dataset.dy = Math.random() * 1 + 0.5;
  s.style.left = x + 'px';
  s.style.top = y + 'px';

  // Tiefeneffekt
  const zIndex = Math.floor(Math.random() * 3) + 1;
  s.style.zIndex = zIndex;
  s.style.opacity = 0.4 + Math.random() * 0.5;

  starsContainer.appendChild(s);
  stars.push(s);
}

// Initiale Sterne
for (let i = 0; i < numInitialStars; i++) createStar();

// Kollisionserkennung
function checkCollision(clientX, clientY) {
  stars.forEach((star, index) => {
    const sx = parseFloat(star.dataset.x);
    const sy = parseFloat(star.dataset.y);
    const starSize = parseFloat(star.style.width);
    const dist = Math.sqrt((clientX - sx) ** 2 + (clientY - sy) ** 2);
    if (dist < starSize / 2) {
      star.remove();
      stars.splice(index, 1);
      score++;
      scoreDisplay.textContent = score;
      scoreDisplay.parentElement.style.textShadow = "0 0 15px #ffd75c";
      setTimeout(() => {
        scoreDisplay.parentElement.style.textShadow = "0 0 5px #ffd75c";
      }, 200);
      createStar(); // Neuer Stern
    }
  });
}

// Mausbewegung
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  checkCollision(e.clientX, e.clientY);
});

// Touch
document.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  cursor.style.left = touch.clientX + 'px';
  cursor.style.top = touch.clientY + 'px';
  checkCollision(touch.clientX, touch.clientY);
});

// Sterne animieren
function animateStars() {
  stars.forEach(star => {
    let x = parseFloat(star.dataset.x);
    let y = parseFloat(star.dataset.y);
    let dx = parseFloat(star.dataset.dx);
    let dy = parseFloat(star.dataset.dy);

    x += dx;
    y -= dy;
    if (y < 0) y = window.innerHeight;
    if (x < 0) dx = Math.abs(dx);
    if (x > window.innerWidth) dx = -Math.abs(dx);

    star.dataset.x = x;
    star.dataset.y = y;
    star.style.left = x + 'px';
    star.style.top = y + 'px';
  });
  requestAnimationFrame(animateStars);
}
animateStars();
