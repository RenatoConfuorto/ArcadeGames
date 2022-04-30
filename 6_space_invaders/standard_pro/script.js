// COSTANTI
// costanti griglia
const width = 21;
const height = 15;
const RxC = width * height;
// elementi del DOM 
const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

// array 
const cells = [];
let aliens = [] //indici i partenzad nemici 
let aliensKilled = [];

// movimento nemici 
let step = 1;
let direction = 'forward';
let speed = 500;
let shootChance;

//punti
let score = 0;
scoreDisplay.innerText = score;
//livello
let level = 0;
levelDisplay.innerText = level + '/10';

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
        if(!aliensKilled.includes(i) && aliens[i] === spaceshipIdx){
            clearInterval(aliensMoveIntv);
            showAlert('Aliens Win');
        }
    }
}

//MOVIMENTO ALIENI
function drawAliens(){
    for(let i = 0; i < aliens.length; i++){
        if(!aliensKilled.includes(i)){
            cells[aliens[i]].classList.add('red-spaceship');
        }
    }
}

function removeAlien(){
    for(let i = 0; i < aliens.length; i++){
        cells[aliens[i]].classList.remove('red-spaceship');
    }
}

function alienShoot(alien){
    //controllare se l'alieno non è stato già colpito
    const index = aliens.indexOf(alien);
    if(aliensKilled.includes(index))return;

    //punto partenza del laser
    let laserIdx = alien;
    let laserIntv = null;

    function moveAlienLaser(){
        cells[laserIdx].classList.remove('laser-red');
        laserIdx = laserIdx + width;
        //il laser è uscito dalla griglia
        if(laserIdx >= RxC){
            clearInterval(laserIntv);
            return;
        }
        //controllare se abbiamo colpito l'umano
        if(cells[laserIdx].classList.contains('white-spaceship')){
            //abbiamo colpito l'alieno
            clearInterval(laserIntv);

            //ripulire la cella
            cells[laserIdx].classList.remove('white-spaceship', 'laser-red');
            cells[laserIdx].classList.add('boom');
            setTimeout(function(){
                cells[laserIdx].classList.remove('boom');
            }, 200);

            //hanno vinto gli alieni
            clearInterval(aliensMoveIntv);
            showAlert('AliensWin');
            return;
        }
        cells[laserIdx].classList.add('laser-red');
    }

    laserIntv =  setInterval(moveAlienLaser, 250);
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

    //modificare gli indici degli alieni e farli sparare
    for(let i = 0; i < aliens.length; i++){
        aliens[i] = aliens[i] + step;
        //stabilire casualmente se sparare
        const casualNbr = Math.random();
        if(casualNbr < shootChance){
            alienShoot(aliens[i]);
        }
    }

    checkForAlienWin();
    drawAliens();
}

//far partire il gioco
levelUp();

drawAliens();

aliensMoveIntv = setInterval(moveAliens, speed);

// NAVICELLA
let spaceshipIdx = RxC - Math.floor(width/2) - 1;
cells[spaceshipIdx].classList.add('white-spaceship');
//movimento navicella
function moveSpaceship(event){
    const leftEdge = spaceshipIdx % width === 0;
    const rightEdge = spaceshipIdx % width === width - 1;
    cells[spaceshipIdx].classList.remove('white-spaceship');
    // console.log(event);
    if(event.code === 'ArrowLeft' && !leftEdge){
        //mi muovo a sinistra
        spaceshipIdx--;
    }else if(event.code === 'ArrowRight' && !rightEdge){
        //mi muovo a destra
        spaceshipIdx++;
    }
    cells[spaceshipIdx].classList.add('white-spaceship');
}

//SPARO
document.addEventListener('keydown',moveSpaceship);

function shoot(event){
    if(event.code !=='Space')return;
    if(event.repeat)return;
    //punto partenza del laser
    let laserIdx = spaceshipIdx;
    let laserIntv = null;

    function moveLaser(){
        cells[laserIdx].classList.remove('laser-green');
        laserIdx = laserIdx - width;
        //il laser è uscito dalla griglia
        if(laserIdx < 0){
            clearInterval(laserIntv);
            return;
        }
        //controllare se abbiamo colpito l'alieno
        if(cells[laserIdx].classList.contains('red-spaceship')){
            //abbiamo colpito l'alieno
            clearInterval(laserIntv);

            //ripulire la cella
            cells[laserIdx].classList.remove('red-spaceship', 'laser');
            cells[laserIdx].classList.add('boom');
            setTimeout(function(){
                cells[laserIdx].classList.remove('boom');
            }, 200);

            //salviamo quali alieni abbiamo ucciso
            const killed = aliens.indexOf(laserIdx);
            aliensKilled.push(killed);
            //ricalcolare la possibilità dello sparo
            shootChance = (0.5 / (aliens.length - aliensKilled.length));

            //+1 punto
            score++;
            scoreDisplay.innerText = score;
            checkForLevelUp();
            return;
        }
        cells[laserIdx].classList.add('laser-green');
    }

    laserIntv =  setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', shoot);



/*
impostare vuoto l array aliens
impostare un livello 
10 livelli
provare a impostare le caratteristiche dei vari livelli con uno switch
creare una funzione checkLevel() da sostituire a checkForHumanWin()

COME FARE IL PASSAGGIO DI LIVELLO
aumentare il livello (level++)
usare un if per contrallare che non sia finito il livello 10
salvare lo switch in una funzione
function levelUp(){
    switch

    levelDisplay.innerText = level
    drawAliens()
}

impostare un else{
    showAlert('Human Wins')
}

checkLevel(){
    clearInterval(alienMovIntv);
    level++;
    if(level <= 10){
        levelUp();
    }else{
        showAlert('HumanWin');
    }
}
*/