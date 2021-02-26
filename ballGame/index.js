const ball= document.querySelector("#ball");
const container = document.getElementsByClassName("container")[0];
const startButton= document.querySelector("#start");
const restartButton= document.querySelector("#restart");
let holes = [];
let gameStart=false;
let score = 0;
let speedX = 0;
let speedY = 0;
let positionX = 20;
let positionY = 20;

ball.hidden=true;

const counter = document.createElement('span');

class Actions {
    randomGood(i){                              
        let goodHole = Math.floor(Math.random()*holes.length);
        if(goodHole ==i&&i<holes.length){i++;}               
        else{i--;}
        holes[goodHole].classList.remove("hole");
        holes[goodHole].classList.add("goodHole")
    }

    start(){    
        gameStart=true;
        ball.hidden=false;
        spawnHoles();  
        moveABall();          
        startButton.hidden=true;
        counter.classList.add("counter");
        counter.innerHTML="Score: "+score;
        container.appendChild(counter);
    }

    restart(){                   
        gameStart=true;
        for(i=container.childElementCount;i>0;i--){  
            if(container.childNodes[i].nodeName=="DIV"){
                if(container.childNodes[i].id!=="ball"){
                    container.removeChild(container.childNodes[i])
                }
            }
        }
        score = 0;
        counter.innerHTML="Score: "+score;  
        positionX = 20, positionY = 20;
        spawnHoles();                 
        moveABall();       
        restartButton.hidden=true;
    }

    positionChange(e) {
        speedX=e.gamma/45
        speedY=e.beta/45
    }
}

const actions = new Actions();

function moveABall(){             
    if(positionX+speedX<window.innerWidth-50 && positionX+speedX>0){
        positionX+=speedX;
        ball.style.left=positionX+'px';        
    }
    if(positionY+speedY<window.innerHeight-50 && positionY+speedY>0){
        positionY+=speedY;
        ball.style.top=positionY+'px';        
    }
    for(i=0;i<holes.length;i++) {
        if(positionY<Math.floor(holes[i].style.top.slice(0,-2))+50&&positionY>holes[i].style.top.slice(0,-2)){
            if(positionX>holes[i].style.left.slice(0,-2)&&positionX<Math.floor(holes[i].style.left.slice(0,-2))+50){
                if(holes[i].classList.contains("goodHole")){
                    holes[i].classList.remove("goodHole");
                    score++
                    counter.innerHTML="Score: "+score;
                    actions.randomGood(i);
                }
                else if(holes[i].classList.contains("hole")){    
                gameStart=false;
                window.alert("Your score is  "+score+" !");
                restartButton.hidden=false;
            }
        }
    }
    };
    if(gameStart==true){
        window.requestAnimationFrame(moveABall);
    }
}
function spawnHoles(){                                  
    for(i=2;i<(window.innerWidth/100);i++){
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight-95)/2+'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    for(i=2;i<(window.innerWidth/100);i++){
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight)/2+window.innerHeight/2-100+'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    checkHoles();
    actions.randomGood(1);
}

function checkHoles(){                                      
    for(i=0;i<holes.length-1;i++){                       
        for(j=i+1;j<holes.length;j++){
            if(holes[j].style.left.slice(0,-2)>holes[i].style.left.slice(0,-2)+75
            &&holes[j].style.top.slice(0,-2)>holes[i].style.top.slice(0,-2)+75){
                holes[j].style.top=holes[j].style.top.slice(0,-2)+50+'px';
                holes[j].style.left=holes[j].style.left.slice(0,-2)+50+'px';
            }
        }
    }
}

window.addEventListener('deviceorientation', actions.positionChange)
startButton.addEventListener('click', actions.start);
restartButton.addEventListener('click', actions.restart);
