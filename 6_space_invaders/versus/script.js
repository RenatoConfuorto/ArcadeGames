//ELEMENTI DEL DOM
const grid = document.getElementById('grid');
const health1Display = document.getElementById('health1');
const health2Display = document.getElementById('health2');
const bonus1Display = document.getElementById('bonus1');
const bonus2Display = document.getElementById('bonus2');

//ARRAY
const cells = [];

//dimensioni griglia
const width = 31;
const height = 19;
const RxC = width * height;

//movimento laser e navicelle
let laserSpeed = 150;
let whiteSpaceshipIdx = RxC - Math.floor(width/2) - 1;
let redSpaceshipIdx = Math.floor(width/2);

//salute giocatori
let health1 = 100;
let health2 = 100;
health1Display.innerText = health1;
health2Display.innerText = health2;

//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.innerText = i;
    cell.classList.add('cell');
    cells.push(cell);
    grid.appendChild(cell);
}

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

//controllare lo stato di salute dei giocatori
function checkPlayerDeath(){
    //evidenziare salute bassa
    if(health1 < 25){
        health1Display.classList.add('red-span');
    }else if(health1 > 25 &&
        health1Display.classList.contains('red-span')
        ){
            health1Display.classList.remove('red-span');
        }

    if(health2 < 25){
        health2Display.classList.add('red-span');
    }else if(health2 > 25 &&
        health2Display.classList.contains('red-span')
        ){
            health2Display.classList.remove('red-span');
        }

    //controllare la morte di un giocatore
    if(health1 < 1){
        showAlert('Player 2 Wins');
        return;
    }else if(health2 < 1){
        showAlert('Player 1 Wins');
        return;
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


            return;
        }else if(cells[greenLaserIdx].classList.contains('red-spaceship')){
            //abbiamo colpito l'avversario
            clearInterval(greenLaserIntv);

            // bonus1--;
            // bonus1Display.innerText = bonus1;

            //bonus salute
            if(health2 < 100){
                health2++;
                health2Display.innerText = health2;
            }
            //ridurre la salute dell'avversario
            health1 = health1 - 5;
            health1Display.innerText = health1;
            checkPlayerDeath()
            return
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
        redLaserIdx = redLaserIdx + width;
        //il laser è uscito dalla griglia
        if(redLaserIdx > RxC){
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

            return;
        }else if(cells[redLaserIdx].classList.contains('white-spaceship')){
            //abbiamo colpito l'avversario
            clearInterval(redLaserIntv);

            // bonus1--;
            // bonus1Display.innerText = bonus1;

            //bonus salute
            if(health1 < 100){
                health1++;
                health1Display.innerText = health1;
            }
            //ridurre la salute dell'avversario
            health2 = health2 - 5;
            health2Display.innerText = health2;
            checkPlayerDeath()
            return;
        }
        cells[redLaserIdx].classList.add('red-laser');
    }

    redLaserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', redShoot);
