/* eslint-disable no-undef, no-unused-vars */
let value = 0;
let destroyed = 0;
let started = 0;
let aX = 0;
let aY = 0;
let rectWidth = 50;
let count = 0;
let direction, spin, of1, of2, of3, of4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  randomise();
  rectMode(CENTER);
}

function draw() {
  stroke(50);
  background(255);

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

  scope();

  destroyedText();
  asteroid();
}

function mouseClicked() {
  let inX = mouseX > aX - rectWidth && mouseX < aX + rectWidth;
  let inY = mouseY > aY - rectWidth && mouseY < aY + rectWidth;

  if (inX && inY) {
    destroyed = 1;
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};

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
  fill(0, 0, 0, 10);
  strokeWeight(4);
  // Sqaure
  let diameter = 40;
  let dashWidth = diameter / 4;
  rect(mouseX, mouseY, diameter * 2, diameter * 2);
  // Corner lines
  line(0, height, mouseX, mouseY);
  line(width, height, mouseX, mouseY);
  // Center cross
  line(mouseX - dashWidth, mouseY, mouseX + dashWidth, mouseY);
  line(mouseX, mouseY - dashWidth, mouseX, mouseY + dashWidth);
  // dashes on square
  line(
    mouseX - diameter - dashWidth,
    mouseY,
    mouseX - diameter + dashWidth,
    mouseY
  );
  line(
    mouseX + diameter - dashWidth,
    mouseY,
    mouseX + diameter + dashWidth,
    mouseY
  );
  line(
    mouseX,
    mouseY - diameter - dashWidth,
    mouseX,
    mouseY - diameter + dashWidth
  );
  line(
    mouseX,
    mouseY + diameter - dashWidth,
    mouseX,
    mouseY + diameter + dashWidth
  );
  strokeWeight(1);
}

function destroyedText() {
  textSize(50);
  text("Destroyed: " + count, width * 0.3, height * 0.95);
}
