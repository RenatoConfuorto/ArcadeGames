//ELEMENTI DEL DOM
const grid = document.getElementById('grid');
const health1 = document.getElementById('health1');
const health2 = document.getElementById('health2');
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