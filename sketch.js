tiles = []
balls = []
objectIDnumber = [] //arrays can be added, but they can't be removed. library and archive of objects
//tiles can check to see if the object idnumber they hold still axists (maybe use dictionary

let idleTiles; //how can I let tileRange function only check tiles that store object IDs, rather than tiles that don't (idle tiles)?

// 16:9 aspect ratio: 640x360, 1280×720, 1366×768, 1600×900, 1920×1080, 2560×1440, 3840×2160, 5120×2880, 7680×4320

canvasSizeX = 800 //resolution should be equal to numbers of rows
canvasSizeY = 800  

// I think I need to seperate numOfTilesRow into mapTilesRow and canvasTilsRow.
// Click and drag not working, also mouse to tiles interactions is not accurate 
// once canvas has panned accross the tilemap.

//theres a few ways to do tiles, weather to keep them 16:9 ratio or make sure column = row = canvas x & y


let numOfTilesRow = 20; //number of tiles on the x:y should equal to canvas height and width
let numOfTilesColumn = numOfTilesRow; 

let numOfTilesTotal;

let tileSize = canvasSizeX/numOfTilesRow; //tile size should be equal to 16:9 ratio (I think)
let fps;


function setup() {
  createCanvas(canvasSizeX, canvasSizeY); //x & y of canvas needs to be equal to tile size
  TileSetup();
  //noStroke();
  player = new Player()
  ball = new Ball(tile_to_pos(4),tile_to_pos(7), 9, -9)
  ball2 = new Ball(tile_to_pos(15),tile_to_pos(11), -9, 9)
  
}

function TileSetup(){
  numOfTilesTotal = numOfTilesRow * numOfTilesColumn;
  
  xPosGive = 0;
  yPosGive = 0;
  let block = false
  for (i = 0; i < numOfTilesTotal; i++){  //creating and mapping the tiles
    tile = new Tile(xPosGive, yPosGive, i, block)
    block = false
    if(i >= 21 && i <=36){
      block = true
    }
    if(i >= 67 && i <= 374 && (i % numOfTilesRow) == (numOfTilesRow / 2) - 1){
      block = true
      
    }
    tiles.push(tile)
    xPosGive = xPosGive + tileSize
    if (xPosGive >= canvasSizeX){
      xPosGive = 0;
      yPosGive = yPosGive + tileSize;
    } 
  } 
}




function draw() {
  background(220); 
  fps = frameRate();
  player.tileRange(mouseX,mouseY)
  ball.tileRange()
  ball2.tileRange()
  for(let tile of tiles){
    tile.wipe()
    tile.tileShow()
  }
  ball.show();
  ball.movement()
  ball2.show();
  ball2.movement()
  // for(let ball of balls){
  //   ball.direction()
  //   ball.movement()
  //   ball.tileComs()
  // }
}




class Tile {
  constructor (xP, yP, ID, bo) {
    this.ID = ID
    this.xPixel = xP
    this.yPixel = yP 
    this.onTimer = 0
    this.on = false
    this.objects = [];
    this.blockObjects = bo
  }
  wipe(){
    this.objects = []
  }
  turnOn(){
    this.on = true
    this.onTimer = 0
  }
  tileShow(){
    let x = this.xPixel
    let y = this.yPixel
    noFill();
    //noStroke();
    if (this.blockObjects == true){
      fill(100)
    }
    if (this.on == true){
      fill(255,100,0)
      this.onTimer++
      if (this.onTimer >= 1){
        this.on = false
        this.onTimer = 0
      }
    }
    rect(x, y, tileSize) 
    fill(0)
    text(this.ID, x + 5, y + 15)
    text('' + tileX(this.ID) + ' ' + tileY(this.ID), x + 5, y + 30)
  } 
  checkIDholds() { 
    //can classes store whole class arrays?
    //this.IDhold = ball[1] 
    //can other objects pull this variable from this tile?
  }
}




class Player {
  constructor(){
    this.x = mouseX;
    this.y = mouseY;
    this.tileNeighbors = []
  }
  tileComs(){
    
  }
  tileRange(x,y){  
    let currentTile = findTileArray(x,y)
    this.tileNeighbors = findNeighbors(currentTile) //find the neighboring tiles of the mouse location
    for (let tile of this.tileNeighbors){  //eventually change it to run through active tiles only
      tiles[tile].turnOn()
    }
  }
}




class Ball {
  constructor(x, y, dirX, dirY, bo){
    this.x = x
    this.y = y
    this.speed = 1
    this.objectEncounter = []  //found in tiles neighbors
    this.tileNeighbors = []
    this.onTile = 0
    this.dirX = dirX
    this.dirY = dirY
    this.directionOptions = {up: 0, down: 0, left: 0, right: 0}
    
  }
  show(){
    fill(50)
    ellipse(this.x,this.y,tileSize/2)
    
    
    
  }
  tileRange(){  //get tilerange before moving, reacting, or directing
    this.onTile = findTileArray(this.x,this.y)
    this.tileNeighbors = findNeighbors(this.onTile) //find the neighboring tiles of the ball location
    this.directionOptions = returnDirectionOptions(this.onTile, this.tileNeighbors, this.directionOptions)
    for (let tile of this.tileNeighbors){  
      tiles[tile].turnOn()
    }
  }
  direction(){
    
    //if range of the direction its going is != difX/difY than its time to bounce off wall or chnage direction
    //change direction if neighbors function tells direction function to move forward 0
    
    
    
  }
  movement(){

    
    //do something with the range array: move or stop according to rang tiles. if there is no range on left then stop. if the range tile returns as a wall, dont move to that tile
    //this.dirX = checkBoundaryX(this.onTile, this.dirX)
    if(directionCheckX(this.dirX, this.directionOptions) == false){
      this.dirX = -this.dirX
    }
    if(directionCheckY(this.dirY, this.directionOptions) == false){
      this.dirY = -this.dirY
    }
    let moveX = objectSpeed(this.speed) * this.dirX
    let moveY = objectSpeed(this.speed) * this.dirY
    this.x = this.x + moveX
    this.y = this.y + moveY
    
  }

  reactToTileRange(){
    
    
    
    
  }
}

//vvvvv if the object bounces long enough, they go off the tile map

// vvvvv check to see if the tile that the object is headed towards is available or not
function directionCheckX(dirX, options){
  if(dirX < 0 && options.left == 0){
    return false
  }
  if(dirX > 0 && options.right == 0){
    return false
  }
  return true
}

function directionCheckY(dirY, options){ 
  if(dirY < 0 && options.up == 0){
    return false
  }
  if(dirY > 0 && options.down == 0){
    return false
  }
  return true
}
// ^^^^^ check to see if the tile that the object is headed towards is available or not



// vvvvv change left, down, up, right directions according to neighboring tiles vvvvv
function returnDirectionOptions (ct, tileNeighbors, options){
  if (tileNeighbors.includes(ct - 1) == true && tiles[ct - 1].blockObjects == false){
    options.left = 1
  } else {
    options.left = 0
  }  
  if (tileNeighbors.includes(ct + 1) == true && tiles[ct + 1].blockObjects == false){
    options.right = 1
  } else {
    options.right = 0  
  }  
  if (tileNeighbors.includes(ct - numOfTilesRow) == true && tiles[ct - numOfTilesRow].blockObjects == false){
    options.up = 1
  } else {
    options.up = 0  
  }  
  if (tileNeighbors.includes(ct + numOfTilesRow) == true && tiles[ct + numOfTilesRow].blockObjects == false){
    options.down = 1
  } else {
    options.down = 0    
  }  
  return options  
}
// ^^^^^ change left, down, up, right directions according to neighboring tiles ^^^^^



// vvvvv Find tiles array according to given canvas x and y vvvvv
function findTileArray (x,y){
  x = findXtile(x)
  y = findYtile(y)
  let i = x + y 
  return i  
}

function findXtile (x) {  
  x = x/tileSize
  x = Math.floor(x)
  if (x >= numOfTilesRow){ x = numOfTilesRow -1}
  else if (x < 0){ x = 0}
  return x
  return x
}

function findYtile (y) {
  y = y/tileSize
  y = Math.floor(y)
  if (y >= numOfTilesColumn){ y = numOfTilesColumn -1}
  else if (y < 0){ y = 0}
  y = y * numOfTilesRow
  return y
}
// ^^^^^ Find tiles array according to given canvas x and y ^^^^^
  


// vvvvv turns tilex or tiley into canvas pos vvvvv
function tile_to_pos(i){  //probably need to seperate into x and y when i create a sidescroller function
  pos = (i * tileSize) - (tileSize / 2)  //maybe allow this function to accept arrayTile and X/Y Tile parameters
  return pos
}
// ^^^^^ turns tilex or tiley into canvas pos ^^^^^



// vvvvv find position according to array tile vvvvv
function array_posX(i){ 
  let x = tileX(i)
  x = tile_to_pos(x)
  return x
}

function array_posY(i){
  let y = tileY(i)
  y = tile_to_pos(y)
  return y
}
// ^^^^^ find position according to array tile ^^^^^



// vvvvv Find and return tile neighbors according to given tile array vvvvv
function findNeighbors(currentTile){ //find neighboring tiles of given tile array
  let range = 1  //this function doesnt work with more than 1 number yet (border issues) 
  let start = currentTile - range - numOfTilesRow    
  let end = currentTile + range + numOfTilesRow
  start = rangeTileOutBoundsCorrection(currentTile, start, range) //correct the start range tile if out of bounds
  end = rangeTileOutBoundsCorrection(currentTile, end, range) //correct the end range tile if out of bounds
  let xDiameter = tileX(end - start)
  let yDiameter = tileY(end - start)
  let identifiedTiles = []
  for(i = 0; i <= yDiameter; i++){
    let y = start + (numOfTilesRow * i)
    for(x = 0; x <= xDiameter; x++){
      let numP = x + y
      if (numP >= 0 && numP < tiles.length){
        identifiedTiles.push(numP)  //maybe create a active tiles array/library? or check if tile is active
      } else {
        console.log("oops")
      }
    }
  }
  return identifiedTiles
}
// ^^^^^ Find and return tile neighbors according to given tile array ^^^^^
  


// vvvvv check and correct the distance between center tile and range tile vvvvv
function rangeTileOutBoundsCorrection(ct, rt, ra){ //make sure the range tile stays in bounds! 
  if (rt < 0){rt++} 
  dX = difX(ct,rt)
  if(abs(dX) != ra || rt < 0 || rt > tiles.length){
    if(dX > 0 && abs(dX) != ra){
      rt = rt - 1
      if(rt < 0){
        rt = rt + numOfTilesRow
      }else if(rt > tiles.length){
        rt = rt - numOfTilesRow 
      }     
    }else if(dX < 0 && abs(dX) != ra){
      rt = rt + 1 
      if(rt < 0){
        rt = rt + numOfTilesRow
      }else if(rt > tiles.length){
        rt = rt - numOfTilesRow 
      }  
    }else if(rt < 0){
        rt = rt + numOfTilesRow
    }else if(rt > tiles.length){
        rt = rt - numOfTilesRow 
    }
  }  
  return rt
}
// ^^^^^ check and correct the distance between center tile and range tile ^^^^^



// vvvvv figure out what is the x or y coordinance of tile array vvvvv
function tileX (tile){
  let tileX = tile % numOfTilesRow
  return tileX
}

function tileY (tile){
  let tileX = tile % numOfTilesRow
  let tileY = (tile - tileX) / numOfTilesRow
  return tileY
}
// ^^^^^ figure out what is the x or y coordinance of tile array ^^^^^



// vvvvv figure out the x or y coordinance difference between two tiles vvvvv
function difX (tile1, tile2){
  let tile1X = tileX(tile1)
  let tile2X = tileX(tile2)
  let difX = tile1X - tile2X
  return difX
}

function difY (tile1, tile2){
  let tile1Y = tileY(tile1)
  let tile2Y = tileY(tile2)
  let difY = tile1Y - tile2Y
  return difY
}
// ^^^^^ figure out the x or y coordinance difference between two tiles ^^^^^



// vvvvv object movement stuff
function objectSpeed(tilesAsecond){
  tilesAsecond = (tileSize * tilesAsecond) / fps 
  return tilesAsecond
  
}