function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1)
    }
  }
}


let cols = 5;
let rows = 5;
let grid = new Array(cols)

let openSet = []
let closedSet = []
let start;
let end;
let w, h;

function Spot(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.show = function(col) {
    fill(col)
    noStroke();
    rect(this.x * w, this.y * h, w - 1, h - 1)
  }
}

function setup() {
  createCanvas(400, 400);
  console.log("A*");

  w = width / cols
  h = height / rows

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1]

  openSet.push(start)

  console.log(grid);
}

function draw() {

  if (openSet.length > 0) {

    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i
      }
    }

    let current = openSet[winner];


    if (current === end) {
      console.log("DONE");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

  } else {
    // no solution
  }
  background(0)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0))
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0))

  }
}