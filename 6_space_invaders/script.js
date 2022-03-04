const grid = document.getElementById('grid');
const cells = [];

const width = 15;
const height = 15;
const RxC = width * height;
//CONSTANTI RIGUARDANTI GLI ALIENI
//indici i partenzad alieni 
aliens = [0, 1, 2, 3, 4, 5]
let step = 1;
let direction = 'forward';
const speed = 500;

let aliensKilled = [];
let laserSpeed = 150;

//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = i; //TOGLIERE
    cells.push(cell);
    grid.appendChild(cell);
}

//MOVIMENTO ALIENI
function drawAliens(){
    for(let i = 0; i < aliens.length; i++){
        cells[aliens[i]].classList.add('alien');
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

    drawAliens();
}

drawAliens();
setInterval(moveAliens, speed);

// NAVICELLA
let spaceshipIdx = RxC - Math.floor(width/2) - 1;
cells[spaceshipIdx].classList.add('spaceship');
//movimento navicella
function moveSpaceship(event){
    const leftEdge = spaceshipIdx % width === 0;
    const rightEdge = spaceshipIdx % width === width - 1;
    cells[spaceshipIdx].classList.remove('spaceship');
    // console.log(event);
    if(event.code === 'ArrowLeft' && !leftEdge){
        //mi muovo a sinistra
        spaceshipIdx--;
    }else if(event.code === 'ArrowRight' && !rightEdge){
        //mi muovo a destra
        spaceshipIdx++;
    }
    cells[spaceshipIdx].classList.add('spaceship');
}

//SPARO
document.addEventListener('keydown',moveSpaceship);

function shoot(event){
    if(event.code !=='Space')return;
    //punto partenza del laser
    let laserIdx = spaceshipIdx;
    let laserIntv;
    function moveLaser(){
        cells[laserIdx].classList.remove('laser');
        laserIdx = laserIdx - width;
        if(laserIdx < 0){
            clearInterval(laserIntv);
            return;
        }
        //controllare se abbiamo colpito l'alieno
        if(cells[laserIdx].classList.contains('alien')){
            //abbiamo colpito l'alieno
            clearInterval(laserIntv);

            //ripulire la cella
            cells[laserIdx].classList.remove('alien', 'laser');
            cells[laserIdx].classList.add('boom');
            setTimeout(function(){
                cells[laserIdx].classList.remove('boom');
            }, 200);

            //salviamo quali alieni abbiamo ucciso
            const killed = aliens.indexOf(laserIdx);
            aliensKilled.push = killed;

            return;
        }
        cells[laserIdx].classList.add('laser');
    }

    laserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', shoot);

