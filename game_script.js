//board
let board;
let boardW = 360;
let boardH = 576;
let context;

//ninja
let ninjaW = 46;
let ninjaH = 46;
let ninjaX = boardW/2 - ninjaW/2;
let ninjaY = boardH*(7/8) - ninjaH;
let rightImg;
let leftImg;

// physics
let velocityX = 0;

// platforms
let platformArray = [];
let platformW = 60;
let platformH = 18;
let platformImg;

let ninja = {
  img: null,
  x : ninjaX,
  y : ninjaY,
  width : ninjaW,
  height : ninjaH
}

window.onload = function() {
  board = document.getElementById("board");
  board.height = boardH;
  board.width = boardW;
  context = board.getContext("2d"); // used for drawing on the board

  // draw charecter
  // context.fillStyle = "green";
  // context.fillRect(ninja.x, ninja.y, ninja.width, ninja.height);

  // load images
  rightImg = new Image();
  rightImg.src = "./img/right.png";
  ninja.img = rightImg;
  rightImg.onload = function() {
    context.drawImage(ninja.img,ninja.x, ninja.y, ninja.width, ninja.height);
  }

  leftImg = new Image();
  leftImg.src = "./img/left.png";

  platformImg = new Image();
  platformImg.src = "./img/platform.png";

  // placePlatforms();
  requestAnimationFrame(update);
  document.addEventListener("keydown",moveninja);
}

function update(){
  requestAnimationFrame(update);
  context.clearRect(0,0,board.width,board.height);

  // ninja
  ninja.x += velocityX;
  if(ninja.x> boardW){
    ninja.x = 0;
  }
  else if (ninja.x + ninja.width < 0){
    ninja.x = boardW;
  }
  context.drawImage(ninja.img,ninja.x, ninja.y, ninja.width, ninja.height);

  // platforms
  for(let i=0; i<platformArray.length; i++){
    let platform = platformArray[i];
    context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
  }
}

function moveninja(e){
  if(e.code == "ArrowRight" || e.code == "KeyD"){ // move right
    velocityX = 5;
    ninja.img= rightImg;
  }
  else if(e.code == "ArrowLeft" || e.code == "KeyA"){ // move left
    velocityX = -5;
    ninja.img = leftImg;
  }
}


// function placePlateforms(){
//   platformArray = [];

//   // starting platforms
//   let platform = {
//     img : platformImg,
//     x : boardW/2,
//     y : boardH - 50,
//     width : platformW,
//     height : platformH 
//   }

//   platformArray.push(platform);

//   platform = {
//     img : platformImg,
//     x : boardW/2,
//     y : boardH - 150,
//     width : platformW,
//     height : platformH 
//   }

//   platformArray.push(platform);

// }