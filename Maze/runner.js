function Runner(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.visitedCount = 0;

    this.index = this.i + this.j * cols

    this.checkPossibleDirections = function() {
        // up,right,down,left
        var directions = [];

        var up = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var down = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (grid[this.index].walls[0]) {
            directions.push(false);
        } else {
            directions.push(true);
        }

        if (grid[this.index].walls[1]) {
            directions.push(false);
        } else {
            directions.push(true);
        }

        if (grid[this.index].walls[2]) {
            directions.push(false);
        } else {
            directions.push(true);
        }

        if (grid[this.index].walls[3]) {
            directions.push(false);
        } else {
            directions.push(true);
        }
        return directions
    }

    this.goTo = function(directionToGo) {
        if (directionToGo == 'Up') {
            return [runnerPath[index(i, j - 1)], grid[index(i, j - 1)]];
        } else if (directionToGo == 'Right') {
            return [runnerPath[index(i + 1, j)], grid[index(i + 1, j)]];
        } else if (directionToGo == 'Down') {
            return [runnerPath[index(i, j + 1)], grid[index(i, j + 1)]];
        } else if (directionToGo == 'Left') {
            return [runnerPath[index(i - 1, j)], grid[index(i - 1, j)]];
        } else {
            return undefined;
        }
    }
    this.highlight = function() {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(221, 22, 0);
        rect(x, y, w, w);
    }

    this.show = function() {
        var x = this.i * w;
        var y = this.j * w;

        if (this.visited) {
            if (this.visitedCount < 5) {
                noStroke();
                fill(107, 203, 255, 85 * this.visitedCount);
                rect(x, y, w, w);
            } else {
                noStroke();
                fill(107, 203, 255, 255);
                rect(x, y, w, w);
            }
        }
    }


}