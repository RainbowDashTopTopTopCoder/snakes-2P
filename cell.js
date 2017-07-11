var size;
var c;

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.edges = [true, true, true, true];

}

Cell.prototype.show = function(color) {
  var u, v;
  u = this.x * size;
  v = this.y * size;

  fill(color);
  noStroke();
  rect(u, v, size, size);

  stroke(0, 0, 200);
  if(this.edges[0]){
    line(u, v, u + size, v);
  }
  if(this.edges[1]){
    line(u + size, v, u + size, v + size);
  }
  if(this.edges[2]){
    line(u, v + size, u + size, v + size);
  }
  if(this.edges[3]){
    line(u, v, u, v + size);
  }
}

Cell.prototype.resetEdges = function() {
  this.edges = [true, true, true, true];
}

function removeEdges(a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;
  
  if (x === -1) {
    a.edges[1] = false;
    b.edges[3] = false;
  } else if (y === 1) {
    a.edges[0] = false;
    b.edges[2] = false;
  } else if (x === 1) {
    a.edges[3] = false;
    b.edges[1] = false;
  } else if (y === -1) {
    a.edges[2] = false;
    b.edges[0] = false;
  }
}
