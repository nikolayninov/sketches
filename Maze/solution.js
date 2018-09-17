function step(up, right, down, left, from) {
    let directions = ["Down", "Right", "Up", "Left"];
    let possibleDirs = {
        "Up": up,
        "Right": right,
        "Down": down,
        "Left": left,
    }
    let countOfPossibilities = 0;
    for (const poss in possibleDirs) {
        if (possibleDirs[poss]) {
            countOfPossibilities++;
        }
    }
    if (countOfPossibilities > 1) {

        possibleDirs[from] = false;
    }
    let r;
    let index = directions.indexOf(from);
    while (!possibleDirs[directions[index % 4]]) {
        index++;
        if (index > 10) {
            noLoop()
            break;
        }
    }

    r = directions[index % 4]
    return r;
}
