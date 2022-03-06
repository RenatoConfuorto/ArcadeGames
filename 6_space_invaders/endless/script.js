// COSTANTI
// costanti griglia
const width = 21;
const height = 15;
const RxC = width * height;
// elementi del DOM 
const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const waweDisplay = document.getElementById('wawe');
const timerDisplay = document.getElementById('timer');

// array 
const cells = [];
let aliens = [0, 1, 2, 3, 4] //indici i partenzad alieni 

// movimento alieni 
let step = 1;
let direction = 'forward';
let speed = 500;
//punti
let score = 0;
scoreDisplay.innerText = score;
//ondata
let wawe = 1;
waweDisplay.innerText = wawe;
//tempo ondata
let timer = 5;
timerDisplay.innerText = timer;


let aliensMoveIntv = null;
let laserSpeed = 150;

//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // cell.innerText = i; //TOGLIERE
    cells.push(cell);
    grid.appendChild(cell);
}


//PROVARE A CONTROLLARE SE LA CELLA CONTIENE LA CLASSE ALIEN E SPACESHIP CONTEMPORANEAMENTE
//controllare se hanno vinto gli alieni
function checkForAlienWin(){
    for(let i = 0; i < aliens.length; i++){
        if(aliens[i] === spaceshipIdx){
            clearInterval(aliensMoveIntv);
            clearInterval(timerIntv);
            showAlert(`Game Over! Punti: ${score}`);
        }
    }
}
//SPAWN ALIENI
//funzione del timer
function timerSpawn(){
    timer--;
    timerDisplay.innerText = timer;
    if(timer === 0){
        wawe++;
        waweDisplay.innerText = wawe;
        timer = 5;
        timerDisplay.innerText = timer;
        if(speed > 100){
            speed = speed - 20;
        }else if(speed === 100 && laserSpeed > 200){
            laserSpeed = leserSpeed -50;
        }
        spawnAliens();
        clearInterval(aliensMoveIntv);
        aliensMoveIntv = setInterval(moveAliens, speed);

    }
}
//spawn degli alieni
function spawnAliens(){
    // console.log('Alieni in arrivo');
    const newAliens = (wawe * 2) + 5;
    for(let i = 0; i < newAliens; i++){
        aliens.push(i);
    }
}

timerIntv = setInterval(timerSpawn, 1000);

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
    /*
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
    */ 
    for(let i = 0; i < aliens.length; i++){
        aliens[i] = aliens[i] + step;
    }
    checkForAlienWin();
    drawAliens();
}

drawAliens();

aliensMoveIntv = setInterval(moveAliens, speed);


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
    if(event.repeat)return;
    //punto partenza del laser
    let laserIdx = spaceshipIdx;
    let laserIntv = null;
    // console.log(event);
    function moveLaser(){
        cells[laserIdx].classList.remove('laser');
        laserIdx = laserIdx - width;
        //il laser è uscito dalla griglia
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

            //rimuovere l'alieno dall'array aliens
            const killed = aliens.indexOf(laserIdx);
            aliens.splice(killed, 1);

            //+1 punto
            score++;
            scoreDisplay.innerText = score;
            return;
        }
        cells[laserIdx].classList.add('laser');
    }

    laserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', shoot);
