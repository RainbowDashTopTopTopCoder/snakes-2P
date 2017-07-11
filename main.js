var w;
var h;
var snakes;
var dx = [0, 1, 0, -1];
var dy = [-1, 0, 1, 0];
var food;
var l_score1;
var l_score2;
var noWallMode;
var che;
var fc;

function reset() {
  c = color(random(100, 200), random(100, 200), random(100, 200));
  fc = color(random(200, 255), random(200, 255), random(200, 255));
  size = 20;
  w = floor(width / size);
  h = floor(height / size);
  snakes = [new Snake(1), new Snake(2)];
  grow = 0;
  death = false;
  noWallMode = che.checked();
  summonFood();
}

function setup() {
  createCanvas(800, 600);
  createP('');
  l_score1 = createElement('label', '');
  createP('');
  l_score2 = createElement('label', '');
  che = createCheckbox('No Wall Mode');
  reset();
}

function draw() {
  frameRate(10);
  background(10);

  if(!snakes[0].live || !snakes[1].live) {
    gameover();
  }else{
    snakes[0].update();
    snakes[1].update();
  }

  food.show(fc);

  //console.log('draw');
  snakes[0].show();
  snakes[1].show();


  l_score1.html('Score: ' + snakes[0].score);
  l_score2.html('Score: ' + snakes[1].score);
}


function keyPressed() {
  var l = snakes[0].dir.length - 1;
  var l2 = snakes[1].dir.length - 1;
  if(keyCode === UP_ARROW && snakes[0].dir[l] !== 2 && snakes[0].dir[l] !== 0) {
    snakes[0].dir.push(0);
  }else if(keyCode === RIGHT_ARROW && snakes[0].dir[l] !== 3 && snakes[0].dir[l] !== 1) {
    snakes[0].dir.push(1);
  }else if(keyCode === DOWN_ARROW && snakes[0].dir[l] !== 0 && snakes[0].dir[l] !== 2) {
    snakes[0].dir.push(2);
  }else if(keyCode === LEFT_ARROW && snakes[0].dir[l] !== 1 && snakes[0].dir[l] !== 3) {
    snakes[0].dir.push(3);
  }else if(keyCode == 87 && snakes[1].dir[l2] !== 2 && snakes[1].dir[l2] !== 0) {
    snakes[1].dir.push(0);
  }else if(keyCode == 68 && snakes[1].dir[l2] !== 3 && snakes[1].dir[l2] !== 1) {
    snakes[1].dir.push(1);
  }else if(keyCode == 83 && snakes[1].dir[l2] !== 0 && snakes[1].dir[l2] !== 2) {
    snakes[1].dir.push(2);
  }else if(keyCode == 65 && snakes[1].dir[l2] !== 1 && snakes[1].dir[l2] !== 3) {
    snakes[1].dir.push(3);
  }else if(keyCode === 32) {
    reset();
  }
  //console.log(dir);
}

function gameover() {
  console.log('gameover');
  noStroke();
  fill(255,0,0);
  textSize(72);
  text('GAME OVER', 200, height / 2);
  textSize(24);
  text('Press spacebar to restart', 300, height / 2 + 50);
}

function summonFood() {
  var x, y, c;
  while(!c || isOverlap(c, snakes[0]) || isOverlap(c, snakes[1])) {
    x = floor(random(w));
    y = floor(random(h));
    c = new Cell(x, y);
  }
  food = c;
}
