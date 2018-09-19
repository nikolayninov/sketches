var cols, rows;
var w = 40;
var grid = [];
let runnerPath = [];

var current;
let currRunner;

var stack = [];
let comingFrom;
let failed = false;

function stopRunner() {
    noLoop()
}

function startRunner() {
    loop()
}

function step(up, right, down, left, from) {
    let directions = ["Down", "Right", "Up", "Left"];
    let possibleDirs = {
        "Up": up,
        "Right": right,
        "Down": down,
        "Left": left,
    }
    let index = directions.indexOf(from) + 1;
    while (!possibleDirs[directions[index % 4]]) {
        index++;
    }

    r = directions[index % 4]
    return r;
}



function setup() {
    createCanvas(1600, 800);
    resetSketch();
}

function resetSketch() {
    runnerPath = [];
    grid = [];
    stack = [];
    cols = floor(width / w);
    rows = floor(height / w);
    //frameRate(5);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    grid[grid.length - 1].finish = true;

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var run_path = new Runner(i, j);
            runnerPath.push(run_path);
        }
    }

    current = grid[0];
    currRunner = runnerPath[0];
}

function draw() {
    background(51);


    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
        if (grid[i].finish) {
            fill(249, 229, 0)
            noStroke()
            rect(grid[i].i * w, grid[i].j * w, w, w);
        }
    }
    for (var i = 0; i < grid.length; i++) {
        runnerPath[i].show();
    }
    let counter = 0;
    for (const cl of grid) {
        if (cl.visited) {
            counter++;
        }
    }
    if (counter == grid.length) {
        // frameRate(15)

        if (failed) {
            alert("YOU HIT A WALL!")
            noLoop()
        } else {
            if (grid[currRunner.index].finish) {
                alert("DONE!")
                noLoop()
            }
            currRunner.visited = true;
            currRunner.visitedCount++;
            currRunner.show()
            currRunner.highlight()
            let possibleDirs = currRunner.checkPossibleDirections();
            let nextRunner;
            let dir = step(possibleDirs[0], possibleDirs[1], possibleDirs[2], possibleDirs[3], comingFrom)

            nextRunner = currRunner.goTo(dir)[0]
            let nextCell = currRunner.goTo(dir)[1]
            comingFrom = getOppositeDir(dir);

            if (nextRunner) {
                nextRunner.visited = true;


                currRunner = nextRunner;
            }
            switch (dir) {
                case "Up":
                    if (nextCell.walls[2]) {
                        failed = true;
                    }
                    break;
                case "Right":
                    if (nextCell.walls[3]) {
                        failed = true;
                    }
                    break;
                case "Down":
                    if (nextCell.walls[0]) {
                        failed = true;
                    }
                    break;
                case "Left":
                    if (nextCell.walls[1]) {
                        failed = true;
                    }
                    break;
            }
        }

    } else {
        current.visited = true;
        current.highlight();
        // STEP 1
        var next = current.checkNeighbors();
        if (next) {
            next.visited = true;

            // STEP 2
            stack.push(current);

            // STEP 3
            removeWalls(current, next);

            // STEP 4
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
        let counter = 0;
        for (const cl of grid) {
            if (cl.visited) {
                counter++;
            }
        }
        if (counter == grid.length) {

            console.log("DONE");
            if (grid[0].walls[1]) {
                comingFrom = "Up"
            } else {
                comingFrom = "Left"
            }
        }
    }


}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}


function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function getOppositeDir(fr) {
    switch (fr) {
        case "Up":
            return "Down";
        case "Right":
            return "Left";
        case "Down":
            return "Up";
        case "Left":
            return "Right";
    }
}