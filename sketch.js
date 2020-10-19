/* eslint-disable no-undef, no-unused-vars */

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

let value = 0;
let destroyed = 0;
let started = 0;
let aX = 0;
let aY = 0;
let rectWidth = 50;
let count = 0;

function draw() {
  stroke(50);
  background(255);

  if (destroyed) {
    count++;
    aX = random(0, width);
    aY = 0;
    destroyed = 0;
  } else {
    aY = aY + 5;
  }

  if (aY > height) {
    aY = 0;
    aX = random(0, width);
  }

  rect(aX, aY, rectWidth, rectWidth);
  scope();

  destroyedText();
}

function mouseClicked() {
  // console.log("mX " + mouseX);
  // console.log("mY " + mouseY);
  // console.log("aX " + aX);
  // console.log("aY " + aY);

  let inX = mouseX > aX - rectWidth && mouseX < aX + rectWidth;
  let inY = mouseY > aY - rectWidth && mouseY < aY + rectWidth;

  // console.log("inX " + inX);
  // console.log("inY " + inY);
  if (inX && inY) {
    // console.log("clicked! ");
    background(255);
    // value = 255;
    destroyed = 1;
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};

function scope() {
  fill(0, 0, 0, 10);
  strokeWeight(4);
  // Sqaure
  let diameter = 40;
  rect(mouseX - diameter, mouseY - diameter, diameter * 2, diameter * 2);
  // Corner lines
  line(0, height, mouseX, mouseY);
  line(width, height, mouseX, mouseY);
  // Center cross
  let dashWidth = 10;
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