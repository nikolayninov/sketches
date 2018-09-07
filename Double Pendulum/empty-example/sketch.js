let r1 = Number(document.getElementById('r1').value);
let r2 = Number(document.getElementById('r2').value);
let m1 = Number(document.getElementById('m1').value);
let m2 = Number(document.getElementById('m2').value);
let a1 = 40/ Number(document.getElementById('m1').value) * Math.PI;
let a2 = 40 / Number(document.getElementById('m1').value) * Math.PI;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0;
let a2_a = 0;
let g = 1;
let px2 = -1;
let py2 = -1;

let canvas;

function reset() {
  canvas.clear();
  r1 = Number(document.getElementById('r1').value);
  r2 = Number(document.getElementById('r2').value);
  m1 = Number(document.getElementById('m1').value);
  m2 = Number(document.getElementById('m2').value);
  a1 = Number(document.getElementById('a1').value) / 8 * Math.PI;
  a2 = Number(document.getElementById('a2').value) / 8 * Math.PI;
  a1_v = 0;
  a2_v = 0;
  a1_a = 0;
  a2_a = 0;
  g = 1;

}

function setup() {
  createCanvas(window.innerWidth, (window.innerHeight >= 1000 ? window.innerHeight : 1000));
  canvas = createGraphics(window.innerWidth, (window.innerHeight >= 1000 ? window.innerHeight : 1000));

  canvas.beginShape();
  canvas.background(255);
  canvas.pixelDensity(1);
  canvas.translate(width / 2, height / 2);
  canvas.endShape();
}


function draw() {
  background(255);
  let num1 = -g * (2 * m1 + m2) * sin(a1) - m2 * g * sin(a1 - 2 * a2) - 2 * sin(a1 - a2) * m2 * (a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2));
  let den1 = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  let num2 = 2 * sin(a1 - a2) * (a1_v * a1_v * r1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + a2_v * a2_v * r2 * m2 * cos(a1 - a2));
  let den2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  a1_a = num1 / den1;
  a2_a = num2 / den2;

  image(canvas, 0, 0);
  stroke(0);
  strokeWeight(2);

  translate(width / 2, height / 2);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);


  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, m2, m2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  a1_v *= 0.999;
  a2_v *= 0.999;

  canvas.beginShape();
  canvas.strokeWeight(1);
  canvas.stroke(0);
  canvas.fill(0);
  if (frameCount > 1) {
    canvas.line(px2, py2, x2, y2);

  }
  canvas.endShape();

  px2 = x2;
  py2 = y2;

}
