// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Elic(x, y, velX, velY, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.size = size;
  this.image = new Image();
  this.image.src = 'image/floating Elic.png';
}


Elic.prototype.draw = function() {
  ctx.drawImage(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
}

Elic.prototype.update = function() {
  this.x += this.velX;
  this.y += this.velY;

  if (this.x + this.size >= width) {
    this.x = width - this.size;
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.x = this.size;
    this.velX = -this.velX;
  }
  
  if (this.y + this.size >= height) {
    this.y = height - this.size;
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.y = this.size;
    this.velY = -this.velY;
  }
}

let elics = [];

while (elics.length < 25) {
  let size = random(10, 20);
  let ball = new Elic(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7,7),
    random(-7,7),
    size
  );

  elics.push(ball);
}

Elic.prototype.collisionDetect = function() {
  for (let j = 0; j < Elic.length; j++) {
    if (!(this === elics[j])) {
      const dx = this.x - elics[j].x;
      const dy = this.y - elics[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
    }
  }
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0,25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < elics.length; i++) {
    elics[i].draw();
    elics[i].update();
    elics[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
