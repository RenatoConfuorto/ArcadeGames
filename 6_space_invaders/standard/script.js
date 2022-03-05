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
let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //indici i partenzad alieni 
let aliensKilled = [];

// movimento alieni 
let step = 1;
let direction = 'forward';
let speed = 500;
//punti
let score = 0;
scoreDisplay.innerText = score;
//livello
let level = 1;
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
//controllare l'aumetno di livello
function levelUp(){
    level++;
    if(level === 11){ //Gli umani vincono
        showAlert('Human Wins');
        return;
    }
    levelDisplay.innerText = level + '/10';
    aliensKilled = []; //svuotare aliensKilled
    aliens = []; //svuotare aliens
    switch(level){
        //livello 2
        case 2:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
            ]; //impostare gli alieni
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
        if(!aliensKilled.includes(aliens[i]) && aliens[i] === spaceshipIdx){
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
    let laserIntv = null;

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

            //salviamo quali alieni abbiamo ucciso
            const killed = aliens.indexOf(laserIdx);
            aliensKilled.push(killed);

            //+1 punto
            score++;
            scoreDisplay.innerText = score;
            checkForLevelUp();
            return;
        }
        cells[laserIdx].classList.add('laser');
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