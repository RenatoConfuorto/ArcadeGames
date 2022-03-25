// ELEMENTI DEL DOM 
const grid = document.getElementById('grid');
const scoreDisaply = document.getElementById('score');
const ammoDisaply = document.getElementById('ammo');
//DIMENSIONI GRIGLIA
const width = 15;
const height = 15;
const RxC = width * height;
//ARRAY
const cells = [];
let aliens = [0, 1, 2, 3];

//movimento degli alieni
let step = 1;
let direction = 'forward';
let speed = 500;

let spaceShipIdx = RxC - Math.floor(width/2) - 1;
let laserSpeed = 150;
let aliensMoveIntv = null;


//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = i;
    cells.push(cell);
    grid.appendChild(cell);
}

//MOVIMENTO ALIENI
function drawAliens(){
    for(let i = 0; i < aliens.length; i++){
        cells[aliens[i]].classList.add('alien');
    }
}
function removeAliens(){
    for(let i = 0; i < aliens.length; i++){
        cells[aliens[i]].classList.remove('alien');
    }
}

function moveAliens(){
    removeAliens();
    const leftEdge = aliens[0] % width === 0;
    const rightEdge = aliens[aliens.length - 1] % width === width - 1;
    if(rightEdge && direction === 'forward'){
        //arrivato al bordo destro
        direction = 'backward';
        step = -1;
        for(let i = 0; i < aliens.length; i++){
            aliens[i] = aliens[i] + width + 1;
        }
    }
    if(leftEdge && direction === 'backward'){
        //arrivato al bordo sinistro
        direction = 'forward';
        step = 1;
        for(let i = 0; i < aliens.length; i++){
            aliens[i] = aliens[i] + width - 1;
        }
    }

    for(let i = 0; i < aliens.length; i++){
        aliens[i] = aliens[i] + step;
    }
    drawAliens();
}

drawAliens();

aliensMoveIntv = setInterval(moveAliens, speed);

//NAVICELLA

cells[spaceShipIdx].classList.add('spaceship');

//movimento navicella
function moveSpaceship(event){
    // console.log(event);
    const rightEdge = spaceShipIdx % width === width - 1;
    const leftEdge = spaceShipIdx % width === 0;
    cells[spaceShipIdx].classList.remove('spaceship');
    if(event.code === 'ArrowLeft' && !leftEdge){
        //mi muovo a sinistra
        spaceShipIdx--;
    }else if(event.code === 'ArrowRight' && !rightEdge){
        //mi muovo a destra
        spaceShipIdx++;
    }
    cells[spaceShipIdx].classList.add('spaceship');
}

document.addEventListener('keydown', moveSpaceship);

//SPARO
function shoot(event){
    if(event.code !== 'Space')return;
    if(event.repeat)return; 
    console.log('sparo');

    let laserIdx = spaceShipIdx;
    let laserIntv = null;

    function moveLaser(){
        cells[laserIdx].classList.remove('laser');
        laserIdx = laserIdx - width;
        //il laser esce dalla griglia
        if(laserIdx < 0){
            clearInterval(laserIntv)
            return;
        }
        //controllare se abbiamo colpito l'alieno
        if(cells[laserIdx].classList.contains('alien')){
            //abbiamo colpito l'alieno
            clearInterval(laserIntv);

            //ripulire la cella ed esplosione
            cells[laserIdx].classList.remove('alien', 'laser');
            cells[laserIdx].classList.add('boom');
            setTimeout(function(){
                cells[laserIdx].classList.remove('boom');
            }, 200);

            //rimuovere l'alieno dall'array
            const killed = aliens.indexOf(laserIdx);
            aliens.splice(killed, 1);

            return;
        }
        cells[laserIdx].classList.add('laser');
    }

    laserIntv = setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', shoot);