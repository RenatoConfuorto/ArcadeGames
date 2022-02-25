const grid = document.getElementById('grid');
const timerDisplay = document.getElementById('timer_display');
const scoreDisplay = document.getElementById('score_display');
const levelDisplay = document.getElementById('level_display');

const size = 4;
const RxC = size * size;
let speed = 800;
let timer = 30;
let score = 0;
let level = 1;
let levelUp = 15;


timerDisplay.innerText = timer;
scoreDisplay.innerText = score;
levelDisplay.innerText = level;
//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');



//movimento casuale del bug
function randomBug(){
    removeBug();

    const randomNumber = Math.floor( Math.random() * cells.length);
    const cell = cells[randomNumber];
    cell.classList.add('bug');
}

const bugMovement = setInterval(randomBug, speed);

//bisogna eliminare il bug
function removeBug(){
    for(let i = 0; i < cells.length; i++){
        const cellToClean = cells[i];
        cellToClean.classList.remove('bug');
    }
}

//colpire il bug
for(let i = 0; i < cells.length; i++){
    const cell = cells[i];
    cell.addEventListener('click', function(){

        //punteggio

        if(cell.classList.contains('bug')){
            score++;
            scoreDisplay.innerText = score;
            if(score === levelUp){
                level++;
                levelDisplay.innerText = level;
                timer = timer + 15;
                levelUp = levelUp + (15 + level);
                if(speed > 300){
                    speed = speed - 150;
                }
            }
            // /punteggio
            cell.classList.remove('bug');
            cell.classList.add('splat');
            setTimeout( function(){
                cell.classList.remove('splat');
            }, 200);
        }
    });
}

//Timer
function countDown(){
    timer--;

    if(timer <= 10){ //il timer diventa rosso sotto i dieci secondi
        timerDisplay.classList.add('ten-seconds-left');
    }else if(timer > 10 && timerDisplay.classList.contains('ten-seconds-left')){
        timerDisplay.classList.remove('ten-seconds-left');
    }
    timerDisplay.innerText = timer;

    if(timer === 0){
        clearInterval(bugMovement);
        clearInterval(timeLeft);
        removeBug();
        showAlert(`Tempo scaduto! Punti : ${score}`);
    }
}

const timeLeft = setInterval(countDown, 1000);