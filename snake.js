function Snake(player) {
  this.dir = [];
  this.score = 0;
  this.grow = 0;
  this.speed = 0;
  this.live = true;
  this.cells = [];
  //reset
  if (player === 1) {
    this.headColor = color(0, 0, 255); //blue
    this.bodyColor = color(255, 255, 0);
    this.cells = [new Cell(w - 1, 0), new Cell(w - 1, 1), new Cell(w - 1, 2), new Cell(w - 1, 3)];
    this.dir = [3];
  } else if (player === 2) {
    this.headColor = color(0, 255, 0); //green
    this.bodyColor = color(0, 255, 255);
    this.cells = [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(0, 3)];
    this.dir = [1];
  }
}

Snake.prototype.show = function() {
  for (var i = 1; i < this.cells.length; i++) {
    this.cells[i].show(this.bodyColor);
  }
  this.cells[0].show(this.headColor);
}

Snake.prototype.update = function() {
  var prev = this.cells[0];
  if (this.grow > 0) {
    this.grow--;
  } else {
    this.cells.pop();
  }

  if (this.dir.length > 1) {
    this.dir.shift();
  }

  var x, y;
  x = prev.x + dx[this.dir[0]];
  y = prev.y + dy[this.dir[0]];

  if (noWallMode) {
    x = (x + w) % w;
    y = (y + h) % h;
  }
  current = new Cell(x, y);


  if (current.x === food.x && current.y === food.y) {
    this.eat();
  }

  this.cells.unshift(current);
  this.speed = 3 + this.cells.length / 10;

  for (var v = 0; v < this.cells.length; v++) {
    this.cells[v].resetEdges();
  }

  for (var v = 0; v < this.cells.length - 1; v++) {
    removeEdges(this.cells[v], this.cells[v + 1]);
  }

  if (!check(this)) {
    this.live = false;
  }
  this.speed = 4 + this.cells.length / 10;
}

Snake.prototype.eat = function() {
  summonFood();
  this.score += 10;
  this.grow += 3;
}

function check(snake) {
  if (current.x < 0 || current.x >= w || current.y < 0 || current.y >= h) {
    return false;
  }

  return !isOverlap(snake.cells[0], snakes[0]) && !isOverlap(snake.cells[0], snakes[1]);
}

function isOverlap(cell, snake) {
  for (var v = 1; v < snake.cells.length; v++) {
    if (cell.x === snake.cells[v].x && cell.y === snake.cells[v].y) {
      return true;
    }
  }
  return false;
}
