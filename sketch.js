/* eslint-disable no-undef, no-unused-vars */
let value = 0;
let destroyed = 0;
let started = 0;
let aX = 0;
let aY = 0;
let rectWidth = 50;
let count = 0;
var squareSize;
let direction, spin, of1, of2, of3, of4;
let lastClickX = 0;
let lastClickY = 0;

function setup() {
  let width = windowWidth * 0.9;
  let height = width > windowHeight ? windowHeight * 0.9 : width;

  createCanvas(width, height);

  lastClickX = width / 2;
  lastClickY = height / 2;

  randomise();
  rectMode(CENTER);
}

function draw() {
  stroke(50);
  background(49, 111, 63);

  asteroidDestroyed();
  scope();
  destroyedText();
  asteroid();
}

function mouseClicked() {
  lastClickX = mouseX;
  lastClickY = mouseY;

  let inX = lastClickX > aX - rectWidth && lastClickX < aX + rectWidth;
  let inY = lastClickY > aY - rectWidth && lastClickY < aY + rectWidth;

  if (inX && inY) {
    destroyed = 1;
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};

function asteroidDestroyed() {
  if (destroyed) {
    count++;
  }

  let ood = aX > width || aY < 0 || aY > width;
  if (destroyed || ood) {
    randomise();
    reset();
  } else {
    // move
    aX += 5;
    aY += direction;
  }

  if (destroyed) {
    destroyed = 0;
  }
}

function randomise() {
  direction = random(-5, 5);
  spin = random(-3, 3);
  of1 = random(0, 10);
  of2 = random(5, 15);
  of3 = random(10, 20);
  of4 = random(10, 20);
}

function asteroid() {
  translate(aX, aY);
  rotate(radians(frameCount * spin));
  fill(1);
  noStroke();
  rect(0, 0, 50, 50, 5);
  rotate(5);
  rect(of1, of2, 40, 40, 5);
  rotate(3);
  rect(of3, of4, 30, 30, 5);
}

function reset() {
  aY = random(0, width);
  aX = 0;
}

function scope() {
  strokeWeight(6);

  // Corner lines
  stroke(34, 109, 70);
  line(0, height, lastClickX, lastClickY);
  line(width, height, lastClickX, lastClickY);

  stroke(22, 72, 47);
  // Sqaure
  fill(0, 0, 0, 10);
  let diameter = 40;
  let dashWidth = diameter / 4;
  rect(lastClickX, lastClickY, diameter * 2, diameter * 2);
  // Center cross
  line(lastClickX - dashWidth, lastClickY, lastClickX + dashWidth, lastClickY);
  line(lastClickX, lastClickY - dashWidth, lastClickX, lastClickY + dashWidth);
  // dashes on square
  line(
    lastClickX - diameter - dashWidth,
    lastClickY,
    lastClickX - diameter + dashWidth,
    lastClickY
  );
  line(
    lastClickX + diameter - dashWidth,
    lastClickY,
    lastClickX + diameter + dashWidth,
    lastClickY
  );
  line(
    lastClickX,
    lastClickY - diameter - dashWidth,
    lastClickX,
    lastClickY - diameter + dashWidth
  );
  line(
    lastClickX,
    lastClickY + diameter - dashWidth,
    lastClickX,
    lastClickY + diameter + dashWidth
  );
  fill(1);
  strokeWeight(1);
}

function destroyedText() {
  textSize(50);
  text("Destroyed: " + count, width * 0.3, height * 0.95);
}
