// ELEMENTI DEL DOM 
const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const ammoDisplay = document.getElementById('ammo');
const bonusDisplay = document.getElementById('bonus-ammo');

//DIMENSIONI GRIGLIA
const width = 21;
const height = 15;
const RxC = width * height;
//ARRAY
const cells = [];
let aliens = [0, 1, 2, 3, 4, 5, 6];

//punti, munizioni e livello
let level = 0;

//movimento degli alieni
let step = 1;
let direction = 'forward';
let speed = 500;

//movimento laser e navicella
let spaceShipIdx = RxC - Math.floor(width/2) - 1;
let laserSpeed = 150;
let aliensMoveIntv = null;

//munizioni
let ammo = 200;
ammoDisplay.innerText = ammo;

//punti
let score = 0;
scoreDisplay.innerText = score;

//bonus munizioni
let bonus = 15;
bonusDisplay.innerText = bonus;

//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // cell.innerText = i;
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
//controllare se gli alieni hanno vinto
function checkForAlienWin (){
    for(let i = 0; i < aliens.length; i++){
        if(aliens[i] === spaceShipIdx){
            clearInterval(aliensMoveIntv);
            showAlert('Aliens Win');
        }
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
    checkForAlienWin();
    drawAliens();
}

drawAliens();

aliensMoveIntv = setInterval(moveAliens, speed);

function addAliens(){
    aliens = [];
    direction = 'forward';
    step = 1;
    level++;

    if(level === 11){ //si ripete l'ultimo livello
        level = 10;
        if(speed > 150){
            speed = speed - 50;
        }
    }
    
    switch(level){
        //livello 1
        case 1:
            aliens = [
                0, 1, 2, 3, 4, 5, 6,
                21, 22, 23, 24, 25, 26, 27
            ]; //impostare gli alieni
            ammo = ammo + 30;
            break;
        //livello 2
        case 2:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
            ]; //impostare gli alieni
            ammo = ammo + 30;
            break;
        //livello 3
        case 3:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
            ];
            ammo = ammo + 50;
            break;
        //livello 4
        case 4:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            ammo = ammo + 50;
            break;
        //livello 5
        case 5:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
                63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75
            ];
            ammo = ammo + 50;
            break;
        //livello 6
        case 6:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
            ];
            ammo = ammo + 50;
            break;
        //livello 7
        case 7:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            ammo = ammo + 50;
            break;
        //livello 8
        case 8:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            ammo = ammo + 50;
            break;
        //livello 9
        case 9:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
            ];
            ammo = ammo + 50;
            break;
            //livello 10
        case 10:
            aliens = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
                63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
            ];
            ammo = ammo + 50;
            break;
    }
    ammoDisplay.innerText = ammo;
    drawAliens();
    aliensMoveIntv = setInterval(moveAliens, speed);

    console.log('Level Up');
}

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
    //non far partire un altro setTimeout se le munizioni sono a 0
    if(ammo === 0)return;
    console.log('sparo');

    let laserIdx = spaceShipIdx;
    let laserIntv = null;

    //uso munizioni
    ammo--;
    //display rosso se le munizioni sono basse
    if(ammo < 50){
        ammoDisplay.classList.add('red-span');
    }else if(
        ammo > 50 &&
        ammoDisplay.classList.contains('red-span')
    ){
        ammoDisplay.classList.remove('red-span');
    }
    ammoDisplay.innerText = ammo;

    //bloccare il gioco se finiscono le munizioni
    if(ammo === 0){
        setTimeout(function(){
            if(ammo === 0){ //vedere se l'ultimo laser colpisce
                clearInterval(aliensMoveIntv);
                showAlert('Out of ammo');
            }
        }, 3000);
    }


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

            //controllare se sono finiti gli alieni
            if(aliens.length === 0){
                clearInterval(aliensMoveIntv);
                
                addAliens();
            }

            //punteggio;
            score++;
            scoreDisplay.innerText = score;
            //aggiungere munizioni ogni tot punti
            bonus--
            if(bonus === 0){
                bonus = 15;
                ammo = ammo + 5;
                ammoDisplay.innerText = ammo;
            }
            bonusDisplay.innerText = bonus;

            return;
        }
        cells[laserIdx].classList.add('laser');
    }

    laserIntv = setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', shoot);