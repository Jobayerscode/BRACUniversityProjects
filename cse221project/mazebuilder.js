//Jobayer Bin Showkat
//ID:17301217
var cols, rows;
var sizew = 40;
var grid = [];
var current;
var stack = [];

function setup(){
     createCanvas(400,400);
     cols = floor(width/sizew);
     rows = floor(height/sizew);
     //frameRate(5);
     for(var j=0; j<rows; j++){
       for(var i=0; i<cols;i++){
         var cell = new Cell(i,j);
         grid.push(cell);
       }
     }
     current = grid[0];
}

function draw(){
      background(51);
      for(var i=0;i<grid.length;i++){
          grid[i].show();
        }
      current.visited = true;
      current.highlight();
      var next = current.checkNeighbours();
      if(next){
        next.visited = true;
        stack.push(current);
        removeWalls(current,next);
        current = next;
      }else if(stack.length>0){
        current = stack.pop();
      }
}

function index(i,j){
  if(i<0||j<0||i>cols-1||j>rows-1){
    return -1;
  }
    return i+j*cols;
}

function Cell(i,j){
    this.i=i;
    this.j=j;
    this.wall = [true,true,true,true];
    this.visited = false;

    this.highlight = function(){
      var x = this.i*sizew;
      var y = this.j*sizew;
      noStroke();
      fill(0,0,0,100);
      rect(x,y,sizew,sizew);

    }

    this.show = function(){
      var x = this.i*sizew;
      var y = this.j*sizew;
      stroke(225);

    this.checkNeighbours = function() {
      var neighbors =[];

      var top    = grid[index(i,j-1)];
      var right  = grid[index(i+1,j)];
      var bottom = grid[index(i,j+1)];
      var left   = grid[index(i-1,j)];

      if(top && !top.visited){
        neighbors.push(top);
      }
      if(right && !right.visited){
        neighbors.push(right);
      }
      if(bottom && !bottom.visited){
        neighbors.push(bottom);
      }
      if(left && !left.visited){
        neighbors.push(left);
      }

      if(neighbors.length>0){
        var r = floor(random(0,neighbors.length));
          return neighbors[r];
      }else{
          return undefined;
      }

    }

      //top
      if(this.wall[0]){
        line(x,y,x+sizew,y);
      }
      //right
      if(this.wall[1]){
        line(x+sizew,y,x+sizew,y+sizew);
      }
      //bottom
      if(this.wall[2]){
        line(x+sizew,y+sizew,x,y+sizew);
      }
      //left
      if(this.wall[3]){
        line(x,y+sizew,x,y);
      }

      if(this.visited){
        noStroke();
        fill(0,0,255,100);
        rect(x,y,sizew,sizew);
      }

    }

}

function removeWalls(a,b){
    var x = a.i - b.i;

    if(x===1){
      a.wall[3]=false;
      b.wall[1]=false;
    }else if(x===-1){
      a.wall[1]=false;
      b.wall[3]=false;
    }

    var y = a.j-b.j;

    if(y===1){
      a.wall[0]=false;
      b.wall[21]=false;
    }else if(y===-1){
      a.wall[2]=false;
      b.wall[0]=false;
    }
}
