
//loads everything when the window is loaded
window.onload = function() {
//REUSED MOUSE AND KEYBOARD EVENT HANDLER
//EDITED AND MADE CHANGES TO LOCAL STORAGE FUNCTION 	
//get the canvas
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var x = 150;//position of ball in x axis
var y = 150;//position of ball in y axis
var ballSpeedX = 2;// speed of ball in x axis
var ballSpeedY = 4;//speed of ball in y axis

var ctx;// context variable store context
var WIDTH; //width variable store width
var HEIGHT; //height variable store height

var paddlePl; // player paddle
var paddleHeight; // paddle height
var paddleWidth; // paddle width

var intervalId = 0; // interval of game is set to 0

var score = 0;// score is set to 0

var rightPressed = false;// right key press is set to false
var leftPressed = false; // left key press is set to false

var gameMenu = true;
var Started = false;
var Endgame = false;

var audio = new Audio('audio/wallhit.mp3');// audio for wallhit game

var  click = new Audio('audio/start.mp3');// audio for the start

var  over = new Audio('audio/gameover.mp3');

var highscore = localStorage.getItem("highscore") || 0;

//creates circle 
function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = "#B20000";
  ctx.fill();
}
//creates paddle
function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fillStyle = "#000000";
  ctx.fill();
}
//clears everything
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
//score of the ball that hits the paddle
function score(){
	document.getElementById('score').innerHTML = "Score: " + score;
}

// initialising the canvas
function init() {
  canvas = document.getElementById("game");
   WIDTH = canvas.width//height of canvas
 HEIGHT = canvas.height//width
 ctx = canvas.getContext("2d");
 intervalId = setInterval(draw, 10);//setting the interval of the canvas for fps
}

//initialising paddle
function init_paddle() {
  paddlePl = WIDTH / 2;
  paddleHeight = 10;
  paddleWidth = 100;
}

//collision detection function
function collision(){

 rect(paddlePl, HEIGHT-paddleHeight, paddleWidth, paddleHeight);
 
  if (x + ballSpeedX > WIDTH || x + ballSpeedX < 0)
    ballSpeedX = -ballSpeedX;// if the ball reaches either right or left side then bounce i off

  if (y + ballSpeedY < 0){
    ballSpeedY = -ballSpeedY;//if the ball reaches the top bounce it off from the top
   audio.play();
  }
  else if (y + ballSpeedY > HEIGHT) {
    if (x > paddlePl && x < paddlePl + paddleWidth){
      ballSpeedY = -ballSpeedY-0.2;
      //if the ball collides with paddle then bounce it off 
      //and speed the speed of ball by 0.2
      score++;//increment the score when ball touches the top 

                           } 
    else
      //game over move the ball bosition to stated with no speed of the ball so it resets and not goes all the way down
      { 
        
        Endgame = true;
      Started = false;
    x = 90;
      y = 60;
      ballSpeedX = 0;
      ballSpeedY = 0;
       over.play();
      printScore();

       }
      }
             x += ballSpeedX;
  y += ballSpeedY;


}
//score for ingame real time
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#00000";
    ctx.fillText("Score: "+score, 8, 20);
}

//printing after the end of the game
function printScore() {

if(highscore == null)//checking if there s previous highscore
 {
  localStorage.setItem("highscore", score );
      ctx.font = "30px Arial"; 
 ctx.fillStyle = "#00000"; 
   ctx.fillText("Your Final Score is "+ score, 210, 200);
 ctx.fillText("Current highscore is "+ highscore, 210, 300); 
    ctx.fillText("Click to Restart", 250,400) 
  
}
  if (score > highscore) //score is higher than current highscore then print the new highscore
  { 
    localStorage.setItem("highscore", score );
   ctx.font = "30px Arial"; ctx.fillStyle = "#00000";
    ctx.fillText("Your Final Score is "+ score, 210, 200); 
 ctx.fillText("Current highscore is "+ highscore, 210, 300);
  ctx.fillText("Click to Restart" , 250,400) 
}
else//else print current score
{ 
 ctx.font = "30px Arial"; ctx.fillStyle = "#00000";
   ctx.fillText("Your Final Score is "+ score, 210, 200); 
 ctx.fillText("Current highscore is "+ highscore, 210, 300); 
ctx.fillText("Click to Restart", 250,400)  } 
    return;
}


//event listener for mouse and keyboard controls

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseClickHandler, false);



//mouse control
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddlePl = relativeX - paddleWidth/2;
    }
}

//keyboard control if left key is not pressed 
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}


//keyboard control if right key is not pressed
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//move the keys according to the keys pressed left and right
function keys(){
if(rightPressed && paddlePl < canvas.width-paddleWidth) {
        paddlePl += 7;
    }
    else if(leftPressed && paddlePl > 0) {
        paddlePl -= 7;
    }

}

//when the user clicks to play the game and when they finish the game 
//to reload the game again

function mouseClickHandler(e){
   if (gameMenu) {
    gameMenu = false;
    Started = true;
    click.play();
  } else if (Endgame) {
  Endgame = false;
  Started = false;
  click.play();
  window.location.reload();
  }
}

//start game screen 
function startGame(){
 ctx.font = "50px Arial";
    ctx.fillStyle = "#00000";
    ctx.fillText("Arcade Squash ", 160,200);

    ctx.fillText("Click to Play ", 200,300);
    fill();
    }

    //font for start game
function fill(){
ctx.font = "20px Arial";
ctx.fillText("Use either Mouse or Keyboard Controls", 160,500);

}

//main function
function draw() {
if (gameMenu){//if game menu is true
 startGame();//start the game screen

      }else if(Endgame){//if it ends
printScore();//print score
      }
     else{
      Started = true;//if its started do this 
clear();//clear function
circle(x, y, 10);//ball
keys();//key control
collision();//collision
drawScore();//score
}
}


 init();//initial paddle
init_paddle()//initial paddle
}
