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
    return directions[index % 4];
}