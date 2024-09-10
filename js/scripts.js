const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let balls = [];
const numBalls = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
class Ball {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = getRandomColor();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      this.color = getRandomColor(); // Change color on horizontal collision
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
      this.color = getRandomColor(); // Change color on vertical collision
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function init() {
  balls = [];
  for (let i = 0; i < numBalls; i++) {
    let radius = Math.random() * 10 + 5;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    balls.push(new Ball(x, y, radius, dx, dy));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => ball.update());
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", () => {
  resizeCanvas();
  init();
  animate();
});
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("typing-text");
  const text = textElement.textContent;
  textElement.textContent = ""; // Clear the text content

  let index = 0;

  function type() {
    if (index < text.length) {
      textElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100); // Adjust the speed here (in milliseconds)
    }
  }

  type();
});
window.onload = function () {
  const scrollWrapper = document.querySelector(".tech-stack-scroll");
  const logos = document.querySelectorAll(".tech-logo");

  // Clone logos to create an infinite loop effect
  logos.forEach((logo) => {
    let clone = logo.cloneNode(true);
    scrollWrapper.appendChild(clone);
  });
};
