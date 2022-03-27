//elementi del DOM
const grid = document.getElementById('grid');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const levelDisplay = document.getElementById('level');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

//ARRAY
const cells = [];
let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let aliensKilled = [];

//dimensioni griglia
const width = 31;
const height = 19;
const RxC = width * height;

//movimento laser e navicelle
let laserSpeed = 150;
let whiteSpaceshipIdx = RxC - Math.floor(width/2) - 1;
let redSpaceshipIdx = RxC - Math.floor(width/2) - width - 1;

//movimento degli alieni
let step = 1;
let direction = 'forward';
let speed = 500;

//punti
let score1 = 0;
score1Display.innerText = score1;
let score2 = 0;
score2Display.innerText = score2;
player1.classList.add('red-span');

//livello
let level = 1;
levelDisplay.innerText = level + '/15';

//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    // cell.innerText = i;
    cell.classList.add('cell');
    cells.push(cell);
    grid.appendChild(cell);
}

//controllare l'aumento di livello
function levelUp(){
    level++;
    if(level === 16){ //Gli umani vincono
        showAlert('Humans Wins');
        return;
    }
    levelDisplay.innerText = level + '/15';
    aliensKilled = []; //svuotare aliensKilled
    aliens = []; //svuotare aliens

    //stampare i nuovi alieni
const row2 = width;
const row3 = width * 2;
const row4 = width * 3;
const row5 = width * 4;
const row6 = width * 5;
const row7 = width * 6;
const row8 = width * 7;

    switch(level){
        //livello 2
        case 2:
            for(let i = 0; i < 13; i++){
                aliens.push(i);
                aliens.push(row2 + i);
            }
            speed = 500; //impostare la velocità degli alieni
            laserSpeed = 150; //impostare la velocità del laser
            break;
        //livello 3
        case 3:
            for(let i = 0; i < 14; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
            }
            speed = 450;
            laserSpeed = 150; 
            break;
        //livello 4
        case 4:
            for(let i = 0; i < 14; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
            }
            speed = 450;
            laserSpeed = 150; 
            break;
        //livello 5
        case 5:
            for(let i = 0; i < 15; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
            }
            speed = 450;
            laserSpeed = 150; 
            break;
        //livello 6
        case 6:
            for(let i = 0; i < 15; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
                aliens.push(row6 + i);
            }
            speed = 350;
            laserSpeed = 150; 
            break;
        //livello 7
        case 7:
            for(let i = 0; i < 15; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
                aliens.push(row6 + i);
                aliens.push(row7 + i);
            }
            speed = 350;
            laserSpeed = 150; 
            break;
        //livello 8
        case 8:
            for(let i = 0; i < 18; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
            }
            speed = 350;
            laserSpeed = 250; 
            break;
        //livello 9
        case 9:
            for(let i = 0; i < 18; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
            }
            speed = 350;
            laserSpeed = 250; 
            break;
            //livello 10
        case 10:
            for(let i = 0; i < 18; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
            }
            speed = 350;
            laserSpeed = 300; 
            break;
            
        case 11:
            for(let i = 0; i < 18; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
                aliens.push(row6 + i);
            }
            speed = 350;
            break;

        case 12:
            for(let i = 0; i < 18; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
                aliens.push(row6 + i);
                aliens.push(row7 + i);
            }
            speed = 350;
            break;

        case 13:
            for(let i = 0; i < 18; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
                aliens.push(row6 + i);
                aliens.push(row7 + i);
            }
            speed = 350;
            laserSpeed = 350;
            break;

        case 14:
            for(let i = 0; i < 19; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
                aliens.push(row6 + i);
                aliens.push(row7 + i);
            }
            speed = 350;
            break;

        case 15:
            for(let i = 0; i < 19; i++){
                aliens.push(i);
                aliens.push(row2 + i);
                aliens.push(row3 + i);
                aliens.push(row4 + i);
                aliens.push(row5 + i);
                aliens.push(row6 + i);
                aliens.push(row7 + i);
                aliens.push(row8 + i);
            }
            speed = 350;
            break;
    }

    drawAliens();
    aliensMoveIntv = setInterval(moveAliens, speed);

    console.log('Level Up');
}


//controllare se hanno vinto gli umani
function checkForLevelUp(){
    if(aliensKilled.length === aliens.length){
        clearInterval(aliensMoveIntv);
        levelUp();
    }
}


//controllare se hanno vinto gli alieni
function checkForAlienWin(){
    for(let i = 0; i < aliens.length; i++){
        if(!aliensKilled.includes(aliens[i]) &&
            aliens[i] === whiteSpaceshipIdx){

            clearInterval(aliensMoveIntv);
            showAlert('Aliens Win');
        }else if(!aliensKilled.includes(aliens[i]) &&
            aliens[i] === redSpaceshipIdx){

            clearInterval(aliensMoveIntv);
            showAlert('Aliens Win');
        }
    }
}

//MOVIMENTO ALIENI
function drawAliens(){
    for(let i = 0; i < aliens.length; i++){
        if(!aliensKilled.includes(i)){
            cells[aliens[i]].classList.add('alien');
        }
    }
}

function removeAlien(){
    for(let i = 0; i < aliens.length; i++){
        cells[aliens[i]].classList.remove('alien');
    }
}

function moveAliens(){
    removeAlien();
    const leftEdge = aliens[0] % width === 0;
    const rightEdge = aliens[aliens.length - 1] % width === width - 1;
    //arrivato al bordo destro
    if(direction === 'forward' && rightEdge){
        //cambiare direzione
        direction = 'backward';
        //invertire il passo
        step = -1;
        //spostare gli alieni alla riga sotto
        for(let i = 0; i < aliens.length; i++){
            aliens[i] = aliens[i] + width + 1;
        }
    }
    //arrivato al bordo sinistro
    if(direction === 'backward' && leftEdge){
        //cambiare direzione
        direction = 'forward';
        //invertire il passo
        step = 1;
        //spostare gli alieni alla riga sotto
        for(let i = 0; i < aliens.length; i++){
            aliens[i] = aliens[i] + width - 1;
        }
    }

    for(let i = 0; i < aliens.length; i++){
        aliens[i] = aliens[i] + step;
    }
    checkForAlienWin();
    drawAliens();
}

drawAliens();

aliensMoveIntv = setInterval(moveAliens, speed);

//NAVICELLA
cells[whiteSpaceshipIdx].classList.add('white-spaceship');
cells[redSpaceshipIdx].classList.add('red-spaceship');

//navicella bianca
function moveWhiteSpaceship(event){
    const leftEdge = whiteSpaceshipIdx % width === 0;
    const rightEdge = whiteSpaceshipIdx % width === width - 1;
    cells[whiteSpaceshipIdx].classList.remove('white-spaceship');
    // console.log(event);
    if(event.code === 'ArrowLeft' && !leftEdge){
        //mi muovo a sinistra
        whiteSpaceshipIdx--;
    }else if(event.code === 'ArrowRight' && !rightEdge){
        //mi muovo a destra
        whiteSpaceshipIdx++;
    }
    cells[whiteSpaceshipIdx].classList.add('white-spaceship');
}

addEventListener('keydown', moveWhiteSpaceship);

//navicella rossa
function moveRedSpaceship(event){
    const leftEdge = redSpaceshipIdx % width === 0;
    const rightEdge = redSpaceshipIdx % width === width - 1;
    cells[redSpaceshipIdx].classList.remove('red-spaceship');
    // console.log(event);
    if(event.code === 'KeyA' && !leftEdge){
        //mi muovo a sinistra
        redSpaceshipIdx--;
    }else if(event.code === 'KeyD' && !rightEdge){
        //mi muovo a destra
        redSpaceshipIdx++;
    }
    cells[redSpaceshipIdx].classList.add('red-spaceship');
}

addEventListener('keydown', moveRedSpaceship);

//SPARO

function checkHighScore(){
    if(score1 > score2){
        player1.classList.add('red-span');
        player2.classList.remove('red-span');
    }else if(score1 < score2){
        player1.classList.remove('red-span');
        player2.classList.add('red-span');
    }
}

//sparo navicella bianca laser verde
function greenShoot(event){
    if(event.code !=='ShiftRight')return;
    if(event.repeat)return;
    // console.log(event);
    //punto partenza del laser
    let greenLaserIdx = whiteSpaceshipIdx;
    let greenLaserIntv = null;

    function moveLaser(){
        cells[greenLaserIdx].classList.remove('green-laser');
        greenLaserIdx = greenLaserIdx - width;
        //il laser è uscito dalla griglia
        if(greenLaserIdx < 0){
            clearInterval(greenLaserIntv);
            return;
        }
        //controllare se abbiamo colpito l'alieno
        if(cells[greenLaserIdx].classList.contains('alien')){
            //abbiamo colpito l'alieno
            clearInterval(greenLaserIntv);

            //ripulire la cella
            cells[greenLaserIdx].classList.remove('alien', 'green-laser');
            cells[greenLaserIdx].classList.add('boom');
            setTimeout(function(){
                cells[greenLaserIdx].classList.remove('boom');
            }, 200);

            //salviamo quali alieni abbiamo ucciso
            const killed = aliens.indexOf(greenLaserIdx);
            aliensKilled.push(killed);

            //+1 punto
            score2++;
            score2Display.innerText = score2;
            checkHighScore()
            checkForLevelUp();
            return;
        }
        cells[greenLaserIdx].classList.add('green-laser');
    }

    greenLaserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', greenShoot);

//sparo navicella rossa laser rosso
function redShoot(event){
    if(event.code !=='Space')return;
    if(event.repeat)return;
    //punto partenza del laser
    let redLaserIdx = redSpaceshipIdx;
    let redLaserIntv = null;

    function moveLaser(){
        cells[redLaserIdx].classList.remove('red-laser');
        redLaserIdx = redLaserIdx - width;
        //il laser è uscito dalla griglia
        if(redLaserIdx < 0){
            clearInterval(redLaserIntv);
            return;
        }
        //controllare se abbiamo colpito l'alieno
        if(cells[redLaserIdx].classList.contains('alien')){
            //abbiamo colpito l'alieno
            clearInterval(redLaserIntv);

            //ripulire la cella
            cells[redLaserIdx].classList.remove('alien', 'red-laser');
            cells[redLaserIdx].classList.add('boom');
            setTimeout(function(){
                cells[redLaserIdx].classList.remove('boom');
            }, 200);

            //salviamo quali alieni abbiamo ucciso
            const killed = aliens.indexOf(redLaserIdx);
            aliensKilled.push(killed);

            //+1 punto
            score1++;
            score1Display.innerText = score1;
            checkHighScore()
            checkForLevelUp();
            return;
        }
        cells[redLaserIdx].classList.add('red-laser');
    }

    redLaserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', redShoot);