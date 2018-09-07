let r = 380;
let angle = -60;
let a = -30;
let rot = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);

}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  stroke(0);
  beginShape();
  arc(-r / 2, 0, 2 * r, 2 * r, -60, 0);
  arc(r / 2, 0, 2 * r, 2 * r, 180, 240);
  arc(r * cos(angle) - r / 2, r * sin(angle), 2 * r, 2 * r, 60, 120);
  endShape();
  rot++;
  strokeWeight(4);
  let py = r * sin(a);
  line(-r / 2, 0, 0, r * sin(a) / 2);
}
