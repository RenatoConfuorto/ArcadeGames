//elementi del DOM
const grid = document.getElementById('grid');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const levelDisplay = document.getElementById('level');

//ARRAY
const cells = [];
let aliens = [];
let aliensKilled = [];

//dimensioni griglia
const width = 35;
const height = 25;
const RxC = width * height;

//movimento laser e navicelle
let laserSpeed = 150;
let whiteSpaceshipIdx = RxC - Math.floor(width/2) - 1;
let redSpaceshipIdx = RxC - Math.floor(width/2) - width - 1;

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
            // checkForLevelUp();
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
            // checkForLevelUp();
            return;
        }
        cells[redLaserIdx].classList.add('red-laser');
    }

    redLaserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', redShoot);