//board
let board;
let boardW = 360;
let boardH = 600;
let context;

//ninja
let ninjaW = 40;
let ninjaH = 46;
let ninjaX = boardW/2 - ninjaW/2;
let ninjaY = boardH*(7/8) - ninjaH;
let rightImg;
let leftImg;

// physics
let velocityX = 0;
let velocityY = 0; //ninja jump speed
let initialVelpcityY = -7; // starting velocity
let gravity = 0.4;

// platforms
let platformArray = [];
let platformW = 50;
let platformH = 18 ;
let platformImg;
let gameOver= false;
var jump = document.getElementById("jumpSound");
        
// score
let score = 0;
let maxScore = 0;
let highScore = 0 ;

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
  rightImg.src = "./img/rightSide.png";
  ninja.img = rightImg;
  rightImg.onload = function() {
    context.drawImage(ninja.img,ninja.x, ninja.y, ninja.width, ninja.height);
  }

  leftImg = new Image();
  leftImg.src = "./img/leftSide.png";

  platformImg = new Image();
  platformImg.src = "./img/wood-1.png";
  velocityY = initialVelpcityY;
  placePlatforms();
  requestAnimationFrame(update);
  document.addEventListener("keydown",moveninja);
}

function update(){
  requestAnimationFrame(update);
  if(score>5000){
    initialVelpcityY++;
    // gravity += 0.1;
  }
  if(gameOver){
    if(score>5000){
      initialVelpcityY--;
      // gravity -= 0.1;
    }
    return;
  }
  context.clearRect(0,0,board.width,board.height);

  // ninja
  ninja.x += velocityX;
  if(ninja.x> boardW){
    ninja.x = 0;
  }
  else if (ninja.x + ninja.width < 0){
    ninja.x = boardW;
  }
  velocityY += gravity;
  ninja.y += velocityY;
  context.drawImage(ninja.img,ninja.x, ninja.y, ninja.width, ninja.height);
  if(ninja.y > boardH){
    gameOver = true;
  }
  // platforms
  for(let i = 0; i < platformArray.length; i++){
    let platform = platformArray[i];
    if(velocityY<0 && ninja.y < boardH*3/4){
      platform.y -= initialVelpcityY;
    }

    
    if(detectCollision(ninja,platform) && velocityY >= 0){
      velocityY = initialVelpcityY; //jump
      jumpSound.play();
    }
    context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
  }

  // clear platforms and add new platforms
  while(platformArray.length > 0 && platformArray[0].y>=boardH){
    platformArray.shift(); // removes first element from array
    newPlatform(); //replace with new platform on the top
  }

  // update score
  updateScore();
  context.fillStyle = "black";
  context.font = "16px sans-serif";
  // context.fillText(score,5,20);
  document.getElementById("current-score").innerHTML = score;
  

  if(gameOver){
    if(score>highScore)
      {highScore = score;}
    document.getElementById("high-score").innerHTML = highScore;
    context.fillStyle = 'White';
    context.fillText("Game Over\nPress 'Space' to Restart",boardW/7,boardH*7/8);
    maxScore = score;
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
  else if(e.code == "Space" && gameOver){
    // reset
    ninja = {
      img: rightImg,
      x : ninjaX,
      y : ninjaY,
      width : ninjaW,
      height : ninjaH
    }
    velocityX = 0;
    velocityY = initialVelpcityY;
    score=0;
    maxScore=0;
    gameOver = false;
    placePlatforms();
  }
}

function placePlatforms(){
  platformArray = [];

  // starting platforms
  let platform = {
    img : platformImg,
    x : boardW/2,
    y : boardH-50,
    width : platformW,
    height : platformH 
  }

  platformArray.push(platform);

  // platform = {
  //   img : platformImg,
  //   x : boardW/2,
  //   y : boardH - 150,
  //   width : platformW,
  //   height : platformH 
  // }

  // platformArray.push(platform);
  for ( let i = 0; i<6; i++){
    let randomX = Math.floor(Math.random()* boardW*3/4); //(0-1)* boardW*3/4
    let platform = {
      img : platformImg,
      x : randomX,
      y : boardH - 75*i -150,
      width : platformW,
      height : platformH 
    }
  
    platformArray.push(platform);
  }
}

function newPlatform(){
  let randomX = Math.floor(Math.random()* boardW*3/4); //(0-1)* boardW*3/4
  let platform = {
    img : platformImg,
    x : randomX,
    y : -platformH,
    width : platformW,
    height : platformH 
  }
  platformArray.push(platform);
}

function detectCollision(a,b){
  return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && // a's top right corner passes b's top left corner
    a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y; // a's bottom left corner passes b's top left corner
}

function updateScore(){
  let points = Math.floor(50*Math.random()); //(0-1)*50 --> (0-50)
  if(velocityY < 0 ){  //going up
    maxScore += points;
    if(score < maxScore){
      score = maxScore;
    }
  }
  else if(velocityY >= 0){
    maxScore -= points;
  }
}