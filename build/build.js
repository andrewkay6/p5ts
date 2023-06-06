var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var GameState;
(function (GameState) {
    GameState[GameState["MENU"] = 0] = "MENU";
    GameState[GameState["PLAYING"] = 1] = "PLAYING";
    GameState[GameState["PAUSED"] = 2] = "PAUSED";
    GameState[GameState["GAMEOVER"] = 3] = "GAMEOVER";
})(GameState || (GameState = {}));
var mapData = {
    obstacles: [[100, 100]],
    obstacleSpawnCooldown: 0,
    gapDistance: 300
};
var character = {
    height: 100.0,
    acceleration: 1.0,
    dimensions: [100, 100]
};
var score = 0;
var characterX = 100;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    update();
    background(0);
    drawCharacter();
    drawMap();
    renderScore();
}
var update = function () {
    updateCharacter();
    updateMap();
    updateGame();
};
var updateCharacter = function () {
    character.height += character.acceleration;
    character.acceleration += 0.5;
    if (character.height > windowHeight) {
        character.height = windowHeight;
        character.acceleration = 0;
    }
};
var updateMap = function () {
    if (mapData.obstacles.length < 3 && mapData.obstacleSpawnCooldown == 0) {
        var gapHeight = Math.floor(Math.random() * (windowHeight * 0.7 - mapData.gapDistance)) + mapData.gapDistance;
        mapData.obstacles.push([windowWidth, gapHeight]);
        mapData.obstacleSpawnCooldown = 150;
    }
    for (var i = 0; i < mapData.obstacles.length; i++) {
        mapData.obstacles[i][0] -= 7;
    }
    for (var i = 0; i < mapData.obstacles.length; i++) {
        if (mapData.obstacles[i][0] < -100) {
            mapData.obstacles.splice(i, 1);
        }
    }
    if (mapData.obstacleSpawnCooldown > 0) {
        mapData.obstacleSpawnCooldown--;
    }
};
var drawCharacter = function () {
    ellipse.apply(void 0, __spreadArrays([characterX, character.height], character.dimensions));
};
var drawMap = function () {
    for (var i = 0; i < mapData.obstacles.length; i++) {
        rect(mapData.obstacles[i][0], 0, 100, mapData.obstacles[i][1]);
        rect(mapData.obstacles[i][0], mapData.obstacles[i][1] + mapData.gapDistance, 100, windowHeight - mapData.obstacles[i][1] - 200);
    }
};
function keyPressed() {
    if (keyCode === 32) {
        character.acceleration = -10;
    }
}
function updateGame() {
    for (var i = 0; i < mapData.obstacles.length; i++) {
        if (characterCollides(mapData, character)) {
            console.log("game over");
        }
        if (mapData.obstacles[i][0] < characterX && mapData.obstacles[i][0] > characterX - 7) {
            score++;
            console.log(score);
        }
    }
}
function characterCollides(mapData, character) {
    return (mapData.obstacles[0][0] < characterX + 50 && mapData.obstacles[0][0] > characterX - 50 && (character.height < mapData.obstacles[0][1]
        || character.height > mapData.obstacles[0][1] + mapData.gapDistance));
}
function renderScore() {
    textSize(100);
    fill(255);
    textStyle(BOLD);
    text(score, windowWidth / 2 - 25, 100);
}
//# sourceMappingURL=build.js.map