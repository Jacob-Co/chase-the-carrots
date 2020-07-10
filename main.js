/*

Extra Addons:
1. Put a start page
2. Put a timer
3. Put a results page
4. Change speed and sizes depending on screen size

*/


// setup canvas

const header1 = document.querySelector('h1');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor

function Shape(x, y, velX, velY) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = true;
}

function Ball(x, y, velX, velY, size, color) {
  Shape.call(this, x, y, velX, velY);
  this.color = color;
  this.size = size;
}

function CarrotBall(x, y) {
  Shape.call(this, x, y, 0, 0);
  this.color = 'orange';
  this.size = 10;
  this.exists = true;
}

CarrotBall.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

function EvilCircle(x, y) {
  Shape.call(this, x, y, 20, 20);
  this.color = 'white';
  this.size = 10;
  this.exist = true;
}

//increase EvilCircle speed

EvilCircle.prototype.increaseSpeed = function() {
  this.velX += 1.5;
  this.velY += 1.5;
  this.size += 1.5;
}

// Collision EvilCircle

EvilCircle.prototype.collisionDetect = function(ball) {
    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (ball instanceof CarrotBall) {
      if (distance < this.size + ball.size) {
        ball.exists = false;
      }
    } else {
      if (distance < this.size + ball.size / 2) {
        this.exists = false;
      }
    }
};


// Draw an EvilCircle

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


// Move EvilCircle

EvilCircle.prototype.setControls = function() {
  let _this = this;
  window.onkeydown = function(press) {
    switch(press.key.toLowerCase()) {
      case 'w':
        _this.y -= _this.velY;
        break;
      case 's':
        _this.y += _this.velY;
        break;
      case 'a':
        _this.x -= _this.velX;
        break;
      case 'd':
        _this.x += _this.velX;
        break;
    }
  }
};

// Check if EvilCircle hit the edge

EvilCircle.prototype.checkBounds = function() {
  if ((this.size + this.x) >= width) {
    this.x -= this.size + 20;
  }

  if ((this.x - this.size) <= 0) {
    this.x += this.size + 20;
  }

  if ((this.size + this.y) >= height) {
    this.y -= this.size + 20;
  }

  if ((this.y - this.size) <= 0) {
    this.y += this.size + 20;
  }
};

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
    }
  }
};

//function to determine random positions of balls not near the center

function randomBallPosition(vector, size, evilBall) {
  // let max = vector === 'y'? height : width;
  // let position = random(0 + size, max - size);
  // while(position >= max / 2 - 200 && position <= max / 2 + 200) {
  //   position = random(0 + size, max - size);
  // }
  let vectorIsY = vector === 'y'
  let max = vectorIsY ? height : width;
  let evilBallPosition = vectorIsY ? evilBall.y : evilBall.x;
  let position = random(0 + size, max - size);
  while(position >= evilBallPosition - 200 && position <= evilBallPosition + 200) {
    position = random(0 + size, max - size);
  }

  return position;
}

// define array to store balls and populate it

let balls = [];

// create evil circle

let evilBall

// Implement score counter
let scoreCounter;

// define a carrotBall
let carrotBall;

// define score

let score = 0;

function createBall(balls, evilBall) {
  const size = random(10,20);

  let ball = new Ball(
    randomBallPosition('x', size, evilBall),
    randomBallPosition('y', size, evilBall),
    random(-7, 7),
    random(-7, 7),
    size,
    'rgb(' + random(10,255) + ',' + random(10,255) + ',' + random(10,255) +')'
  );
  balls.push(ball);
}


function clearGame() {
  balls = [];
  evilBall = undefined;
  carrotBall = undefined;
  header1.removeChild(scoreCounter);
  score = 0;
}

function initializeGame() {

  evilBall = new EvilCircle(width / 2 - 10, height / 2 - 10);
  carrotBall = new CarrotBall(randomBallPosition('x', 10, evilBall), randomBallPosition('y', 10, evilBall));
  scoreCounter = document.createElement('p');

  while(balls.length < 3) {
    // const size = random(10,20);

    // let ball = new Ball(
    //   randomBallPosition('x', size),
    //   randomBallPosition('y', size),
    //   random(-7, 7),
    //   random(-7, 7),
    //   size,
    //   'rgb(' + random(10,255) + ',' + random(10,255) + ',' + random(10,255) +')'
    // );
    // balls.push(ball);
    createBall(balls, evilBall);
  }
}
// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  // update remaining balls
  balls = balls.filter((ball) => ball.exists);

  //update scoreCounter
  scoreCounter.textContent = `Carrots eaten: ${score}`;
  header1.appendChild(scoreCounter);

  if (evilBall.exists) {
    evilBall.setControls();
    evilBall.draw();
    evilBall.checkBounds();
  }

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
    evilBall.collisionDetect(balls[i]);
    evilBall.collisionDetect(carrotBall);
  }

  if (carrotBall.exists) {
    carrotBall.draw()
  } else {
    carrotBall = new CarrotBall(randomBallPosition('x', 10, evilBall), randomBallPosition('y', 10, evilBall));
    score += 1;
    evilBall.increaseSpeed();
    let rand = Math.floor(Math.random() * 3);
    console.log(rand);
    if (rand > 0)createBall(balls, evilBall);
    if (rand > 0)createBall(balls, evilBall);
  }

  let gameLoop = requestAnimationFrame(loop);
  if(!evilBall.exists) {
    cancelAnimationFrame(gameLoop);
    end(score);
  }
}

// loop();

