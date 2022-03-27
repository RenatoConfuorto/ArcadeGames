//elementi del DOM
const grid = document.getElementById('grid');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const levelDisplay = document.getElementById('level');

//ARRAY
const cells = [];
let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let aliensKilled = [];

//dimensioni griglia
const width = 29;
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

//livello
let level = 1;
levelDisplay.innerText = level + '/10';

//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.innerText = i;
    cell.classList.add('cell');
    cells.push(cell);
    grid.appendChild(cell);
}

//controllare l'aumento di livello
function levelUp(){
    level++;
    if(level === 11){ //Gli umani vincono
        showAlert('Humans Wins');
        return;
    }
    levelDisplay.innerText = level + '/10';
    aliensKilled = []; //svuotare aliensKilled
    aliens = []; //svuotare aliens

    //stampare i nuovi alieni
const row2 = width;
const row3 = width * 2;
const row4 = width * 3;
const row5 = width * 4;
const row6 = width * 5;
const row7 = width * 6;

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
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
            ];
            speed = 450;
            laserSpeed = 150; 
            break;
        //livello 4
        case 4:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            speed = 450;
            laserSpeed = 150; 
            break;
        //livello 5
        case 5:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
                63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75
            ];
            speed = 450;
            laserSpeed = 150; 
            break;
        //livello 6
        case 6:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
            ];
            speed = 350;
            laserSpeed = 150; 
            break;
        //livello 7
        case 7:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            speed = 350;
            laserSpeed = 150; 
            break;
        //livello 8
        case 8:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            speed = 350;
            laserSpeed = 250; 
            break;
        //livello 9
        case 9:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            speed = 300;
            laserSpeed = 250; 
            break;
            //livello 10
        case 10:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
                63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
            ];
            speed = 300;
            laserSpeed = 300; 
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
            score1++;
            score1Display.innerText = score1;
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
            score2++;
            score2Display.innerText = score2;
            checkForLevelUp();
            return;
        }
        cells[redLaserIdx].classList.add('red-laser');
    }

    redLaserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', redShoot);