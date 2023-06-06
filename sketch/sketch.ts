
enum GameState {
  MENU,
  PLAYING,
  PAUSED,
  GAMEOVER
}
interface Character {
  height: number;
  acceleration: number;
  dimensions: [number, number];
}
interface MapData {
  obstacles: [[number, number]];
  obstacleSpawnCooldown: number;
  gapDistance: number;
}
let mapData : MapData = {
  obstacles: [[100, 100]],
  obstacleSpawnCooldown: 0,
  gapDistance: 300
}
let character : Character = {
  height: 100.0,
  acceleration: 1.0,
  dimensions: [100, 100]
}

let score = 0;
const characterX = 100;


function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  createCanvas(windowWidth, windowHeight)
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

let update = () => {
  updateCharacter();
  updateMap();
  updateGame();

}

let updateCharacter = () => {
  //check for spacebar press 

  character.height += character.acceleration;
  character.acceleration += 0.5;
  if (character.height > windowHeight) {
    character.height = windowHeight;
    character.acceleration = 0;
  }
}

let updateMap = () => {
  //if the mapdata's length is less than 3, add a new obstacle
  if (mapData.obstacles.length < 3 && mapData.obstacleSpawnCooldown == 0) {
    //random gap height in the middle 70% of the screen

    let gapHeight = Math.floor(Math.random() * (windowHeight * 0.7 - mapData.gapDistance)) + mapData.gapDistance;

    mapData.obstacles.push([windowWidth, gapHeight]);
    mapData.obstacleSpawnCooldown = 150;
  }
  //for each obstacle, move it to the left
  //replace this with a for loop

  for (let i = 0; i < mapData.obstacles.length; i++) {
    mapData.obstacles[i][0] -= 7;
  }

  //if the first obstacle is off the screen, remove it
  for (let i = 0; i < mapData.obstacles.length; i++) {
    if (mapData.obstacles[i][0] < -100) {
      mapData.obstacles.splice(i, 1);
    }
  }
  //decrement the obstacle spawn cooldown
  if (mapData.obstacleSpawnCooldown > 0){
    mapData.obstacleSpawnCooldown--;  
  }
  
}


const drawCharacter = () => {
  ellipse(characterX, character.height, ...character.dimensions);
}

const drawMap = () => {
  //for each obstacle, draw a rectangle with a gap
  for (let i = 0; i < mapData.obstacles.length; i++) {
    rect(mapData.obstacles[i][0], 0, 100, mapData.obstacles[i][1]);
    rect(mapData.obstacles[i][0], mapData.obstacles[i][1] + mapData.gapDistance, 100, windowHeight - mapData.obstacles[i][1] - 200);
  } 
}

function keyPressed () {
  if (keyCode === 32) {
    character.acceleration = -10    ;
  }
}

function updateGame() {
  for (let i = 0; i < mapData.obstacles.length; i++){
    if (characterCollides(mapData, character)) {
      console.log("game over")
    }
    if (mapData.obstacles[i][0] < characterX && mapData.obstacles[i][0] > characterX - 7) {
      score++;
      console.log(score);
    }
  }
}

function characterCollides (mapData : MapData, character: Character) {
  return (mapData.obstacles[0][0] < characterX + 50 && mapData.obstacles[0][0] > characterX - 50 && (character.height < mapData.obstacles[0][1] 
    || character.height > mapData.obstacles[0][1] + mapData.gapDistance))
}

function renderScore () {
  textSize(100);
  fill(255);
  //increase font weight
  textStyle(BOLD);
  //center the text
  text(score, windowWidth / 2 - 25, 100);
  
} 