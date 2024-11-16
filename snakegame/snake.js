const gameboard=document.getElementById('gameboard')
const context=gameboard.getContext('2d');
const WIDTH=gameboard.width;
const HEIGHT=gameboard.height;
const UNIT =10;
const scoretxt=document.getElementById('scorevalue')

let foodx;
let foody;
let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT*1,y:0},
    {x:UNIT*0,y:0}
]
let xval=10;
let yval=0;
let score=0;
let active= true;
let started=false;

window.addEventListener('keydown',keypress);



startgame();


function startgame(){
    context.fillStyle='black';
    context.fillRect(0,0,WIDTH,HEIGHT)
    createfood();
    displayfood();
    drawsnake();



}

function createfood(){
    foodx=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    foody=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    


}
function clrboard()
{
    context.fillStyle='black';
    context.fillRect(0,0,WIDTH,HEIGHT)

}

function displayfood(){
    context.fillStyle='red';
    context.fillRect(foodx,foody,UNIT,UNIT);

}
function drawsnake(){
    context.fillStyle='#02fe38';
    context.strokeStyle='black';

    snake.forEach((snakepart) =>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)


    })


}
function movesnake(){
    const head={x:snake[0].x+xval,
               y:snake[0].y+yval}
   snake.unshift(head)
   if(snake[0].x==foodx && snake[0].y==foody){
        score+=1;
        scoretxt.textContent=score;
         createfood();
    
   }
   else{
   snake.pop()
   }

   


}
function next(){
    if(active){
      setTimeout(() =>{
        clrboard();
        displayfood();
        movesnake();
        drawsnake();
        check();
        next();
      },100);
    }
    else{
        clrboard();
        context.font='bold 50px serif';
        context.fillStyle='white';
        context.textAlign='center';
        
        context.fillText("Game Over!",WIDTH/2,HEIGHT/2);
    }
}

function keypress(event){
  
    if(!started){
        started=true;
        next();
    }
    const LEFT =37
    const RIGHT=39 

    const UP=38
    const DOWN=40

    switch(true){
        case(event.keyCode==LEFT && xval!=UNIT):
             xval=-UNIT;
             yval=0;
             break;
        case(event.keyCode==RIGHT && xval!=-UNIT):
             xval=UNIT;
             yval=0;
             break;
        case(event.keyCode==UP &&yval!=UNIT):
             xval=0;
             yval=-UNIT;
             break;
        case(event.keyCode==DOWN &&yval!=-UNIT):
             xval=0;
             yval=UNIT;
             break;
    }    
    
}
function check(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y>=HEIGHT):
        case(snake[0].y<0):
            active=false;
            break;
    }
}
