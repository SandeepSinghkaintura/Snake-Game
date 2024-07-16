
const board = document.getElementById("board");

let boxSize = 25;
let rows = 20;
let columns = 20;

let velocityY = 0;
let veloxityX =0;

let snakeX = boxSize * 5;
let snakeY = boxSize * 5;

let foodX;
let foodY;

let snakeBody =[];
let gameIsOver = false;

window.onload = function start() {


    board.height = rows*boxSize;
    board.width = columns*boxSize;
    board.style.border = "1px solid black";
    
    random();
    document.addEventListener("keyup",changeDirection);
    setInterval( gameBox,1000/10);
    
    
}



function gameBox(){
    if(gameIsOver){
        return;
    }
   
    let context = board.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,boxSize,boxSize);

     if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        random();
     }

     for(let i =snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
     }
     if(snakeBody){
        snakeBody[0] = [snakeX,snakeY];
     }

     context.fillStyle="green";
     snakeX += veloxityX * boxSize;
     snakeY += velocityY * boxSize; 
     context.fillRect(snakeX,snakeY,boxSize,boxSize);

     for(let i =0;i<snakeBody.length ;i++){
        context.fillRect(snakeBody[i][0] , snakeBody[i][1],boxSize,boxSize);
     }

     if(snakeX < 0 || snakeX > columns*boxSize || snakeY < 0 || snakeY > rows*boxSize  ){
        gameIsOver = true;
        alert("game over");
     }

     for(let i =1; i<snakeBody.length ;i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1] ){
            gameIsOver=true;
            alert("game over");
        }
     }
}


function random() {
foodX =  Math.floor(Math.random()*columns)*boxSize;
foodY =  Math.floor(Math.random()*rows)*boxSize;
}


function changeDirection(e) {
    if(e.code =="ArrowUp" && velocityY!=1){
        velocityY = -1;
        veloxityX =0;
    }
    else if(e.code =="ArrowDown" && velocityY!=-1){
        velocityY = 1;
        veloxityX =0;
    }
    else if(e.code =="ArrowRight"  && veloxityX!=-1){
        velocityY = 0;
        veloxityX =1;
    }
    else if(e.code =="ArrowLeft"  && veloxityX!=1){
        velocityY = 0;
        veloxityX =-1;
    }
    // console.log(e.code);
}