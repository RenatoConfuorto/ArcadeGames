//ELEMENTI DEL DOM
const grid = document.getElementById('grid');
const health1Display = document.getElementById('health1');
const health2Display = document.getElementById('health2');
const bonus1Display = document.getElementById('bonus1');
const bonus2Display = document.getElementById('bonus2');

//dimensioni griglia
const width = 31;
const height = 19;
const RxC = width * height;

//indici di partenza giocatori
let whiteSpaceshipIdx = RxC - Math.floor(width/2) - 1;
let redSpaceshipIdx = Math.floor(width/2);

//ARRAY
const cells = [];
//alieni giocatore 1
let aliens1 = [];
//alieni giocatore 2
let aliens2 = [];
//array giocatori = [player, spaceshipIndex, classe navicella, classe laser, health, healthDisplay, bonus, bonusDisplay, aliensArray, avversario, moveLeftCode, moveRightCode, shootCode]
/*
const player1 = ['Player1', redSpaceshipIdx, 'red-spaceship', 'red-laser', 100, health1Display, 50, bonus1Display, aliens1, 'Player 2', 'KeyA', 'KeyD', 'Space'];
const player2 = ['Player2', whiteSpaceshipIdx, 'white-spaceship', 'green-laser', 100, health2Display, 50, bonus2Display, aliens2, 'Player 1', 'ArrowLeft', 'ArrowRight', 'ShiftRight']*/
const player1 = {
    player: 'Player1',
    position: redSpaceshipIdx,
    spaceshipClassName: 'red-spaceship',
    laserClassName: 'red-laser',
    health: 100,
    healthDisplay: health1Display,
    bonus: 50,
    bonusDisplay: bonus1Display,
    aliensArray: aliens1,
    enemy: 'Player 2',
    moveLeftCode: 'KeyA',
    moveRigthCode: 'KeyD',
    shootCode: 'Space'
}
const player2 = {
    player: 'Player2',
    position: whiteSpaceshipIdx,
    spaceshipClassName: 'white-spaceship',
    laserClassName: 'green-laser',
    health: 100,
    healthDisplay: health2Display,
    bonus: 50,
    bonusDisplay: bonus2Display,
    aliensArray: aliens2,
    enemy: 'Player 1',
    moveLeftCode: 'ArrowLeft',
    moveRigthCode: 'ArrowRight',
    shootCode: 'ShiftRight'
}





//movimento alieni e laser
let speed = 500;
let aliensMoveIntv;
let laserSpeed = 150;
let addAliensIntv = null;



//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    // cell.innerText = i;
    cell.classList.add('cell');
    cells.push(cell);
    grid.appendChild(cell);
}

//stampare salute e bonus di partenza
function startGame(currentPlayer){
    //inserire salute iniziale
    currentPlayer.healthDisplay.innerText = currentPlayer.health;
    //inserire uccisioni rimanenti per il bonus iniziali
    currentPlayer.bonusDisplay.innerText = currentPlayer.bonus;
    //inserire la navicella
    cells[currentPlayer.position].classList.add(currentPlayer.spaceshipClassName);
}
startGame(player1);
startGame(player2);

//MOVIMENTO ALIENI
function drawAliens(){
    for(let i = 0; i < aliens1.length; i++){
        cells[aliens1[i]].classList.add('alien');
    }

    for(let i = 0; i < aliens2.length; i++){
        cells[aliens2[i]].classList.add('alien');
    }
}

function removeAlien(){
    for(let i = 0; i < aliens1.length; i++){
        cells[aliens1[i]].classList.remove('alien');
    }

    for(let i = 0; i < aliens2.length; i++){
        cells[aliens2[i]].classList.remove('alien');
    }
}

//generare nuovi alieni
function addAliens(){
    const numb1 = Math.floor(Math.random() * RxC);
    const numb2 = Math.floor(Math.random() * RxC);

    //controllare se esiste già l'alieno
    if(numb1 > (width * 5 - 1) &&
        numb1 < RxC - (width * 5 - 1) &&
        !player1.aliensArray.includes(numb1) &&
        !player2.aliensArray.includes(numb1)){

            player1.aliensArray.push(numb1);
    }
    if(numb2 > (width * 5 - 1) &&
        numb2 < RxC - (width * 5 - 1) &&
        !player1.aliensArray.includes(numb2) &&
        !player2.aliensArray.includes(numb2)){
        player2.aliensArray.push(numb2);
    }

    
    player2.aliensArray.sort(function(a, b){return a-b});
    player1.aliensArray.sort(function(a, b){return a-b});
}

addAliensIntv = setInterval(addAliens, speed);

//constrollare se gli alieni si sono scontrati con la navicella
function checkForAlienCrash(currentPlayer){
    const currentArray = currentPlayer.aliensArray;
    for(let i = 0; i < currentArray.length; i++){
        if(currentArray[i] === currentPlayer.position){
            //l'alieno ha colpito la navicella
            currentArray.splice(i, 1);
            currentPlayer.health--;
            currentPlayer.healthDisplay.innerText = currentPlayer.health;
        }
    }
    checkPlayerHealth(currentPlayer);
}

//controllare lo stato di salute dei giocatori
function checkPlayerHealth(currentPlayer){
    //evidenziare salute bassa
    if(currentPlayer.health <= 25){
        currentPlayer.healthDisplay.classList.add('red-span');
    }else if(currentPlayer.health > 25 &&
        currentPlayer.healthDisplay.classList.contains('red-span')
        ){
            currentPlayer.healthDisplay.classList.remove('red-span');
        }

    //controllare la morte di un giocatore
    if(currentPlayer.health < 1){
        clearInterval(addAliensIntv);
        clearInterval(aliensMoveIntv);
        showAlert(`${currentPlayer.enemy} Wins`);
        return;
    }
}

//muovere gli alieni
function moveAliens(){
    
    removeAlien();

    //modificare gli indici degli alieni e rimuoverli dagli array se sono usciti dalla griglia
    for(let i = 0; i < aliens1.length; i++){
        if(aliens1[i] <= 0){
            aliens1.splice(i, 1);
        }else{
            aliens1[i] = aliens1[i] - 1;
        }
    }

    for(let i = 0; i < aliens2.length; i++){
        if(aliens2[i] >= RxC - 1){
            aliens2.splice(i, 1);
        }else{
            aliens2[i] = aliens2[i] + 1;
        }
    }

    //console.log(aliens2[aliens2.length - 1], aliens1[0]);

    checkForAlienCrash(player1);
    checkForAlienCrash(player2);
    drawAliens();
}


drawAliens();

aliensMoveIntv = setInterval(moveAliens, speed);



//MOVIMENTO DELLE NAVICELLE
function moveSpaceship(event, currentPlayer){
    const leftEdge = currentPlayer.position % width === 0;
    const rightEdge = currentPlayer.position % width === width - 1;

    //rimuovere la navicella
    cells[currentPlayer.position].classList.remove(currentPlayer.spaceshipClassName);

    if(event.code === currentPlayer.moveLeftCode && !leftEdge){
        //mi muovo a sinistra
        currentPlayer.position--;
    }else if(event.code === currentPlayer.moveRigthCode && !rightEdge){
        //mi muovo a destra
        currentPlayer.position++;
    }

    cells[currentPlayer.position].classList.add(currentPlayer.spaceshipClassName);
}

function moveSpaceshipWrapper(event){
    moveSpaceship(event, player1);
    moveSpaceship(event, player2);
}

document.addEventListener('keydown', moveSpaceshipWrapper);

//SPARO
function checkForBonus(currentPlayer){
    if(currentPlayer.bonus === 0){
        //dare 5 puntin salute al giocatore, o se ne ha 99 portarli a 100
        currentPlayer.bonus = 50;
        currentPlayer.bonusDisplay.innerText = currentPlayer.bonus;
        if(currentPlayer.health < 99){
            currentPlayer.health += 2;
            currentPlayer.healthDisplay.innerText = currentPlayer.health;
        }else{
            currentPlayer.health = 100;
            currentPlayer.healthDisplay.innerText = currentPlayer.health;
        }
        checkPlayerHealth(currentPlayer);
    }
}

function shoot(event, currentPlayer, otherPlayer){
    // console.log(event);
    if(event.code !== currentPlayer.shootCode)return;
    if(event.repeat)return;
    
    //punto di partenza laser 
    let laserIdx = currentPlayer.position;
    let laserIntv = null;

    let laserStep;
    if(currentPlayer.player === 'Player2'){
        laserStep = -width;
    }else if(currentPlayer.player === 'Player1'){
        laserStep = width;
    }

    function moveLaser(){
        cells[laserIdx].classList.remove(currentPlayer.laserClassName);
        laserIdx = laserIdx + laserStep;

        //controllare se il laser è uscito dalla griglia
        if(laserIdx < 0 || laserIdx >RxC){
            clearInterval(laserIntv);
            return;
        }

        //controllare se abbiamo colpito qualcosa

        //controllare se abbiamo colpito un alieno
        if(cells[laserIdx].classList.contains('alien')){
            //abbiamo colpito l'alieno
            clearInterval(laserIntv);

            //ripulire la cella e effetto esplosione
            cells[laserIdx].classList.remove('alien', currentPlayer.laser);
            cells[laserIdx].classList.add('boom');
            setTimeout(function(){
                cells[laserIdx].classList.remove('boom');
            }, 200);

            //aggiornare il bonus
            currentPlayer.bonus--;
            currentPlayer.bonusDisplay.innerText = currentPlayer.bonus;
            checkForBonus(currentPlayer);

            //trovare l'array dell'alieno e rimuoverlo

            if(currentPlayer.aliensArray.includes(laserIdx)){
                const killed = currentPlayer.aliensArray.indexOf(laserIdx);
                currentPlayer.aliensArray.splice(killed, 1);
            }else{
                const killed = otherPlayer.aliensArray.indexOf(laserIdx);
                otherPlayer.aliensArray.splice(killed, 1);
            }
            return;

        }else if(cells[laserIdx].classList.contains(otherPlayer.spaceshipClassName)){
            //abbiamo colpito l'avversario
            clearInterval(laserIntv);

            //aumentare la salute di current player
            if(currentPlayer.health < 100){
                currentPlayer.health++,
                currentPlayer.healthDisplay.innerText = currentPlayer.health;
            }

            //ridurre la salute dell'avversario
            otherPlayer.health -= 5;
            otherPlayer.healthDisplay.innerText = otherPlayer.health;
            checkPlayerHealth(otherPlayer);
            return;
        }
        
        cells[laserIdx].classList.add(currentPlayer.laserClassName);
    }
    
    laserIntv = setInterval(moveLaser, laserSpeed);
}

function shootWrapper(event){
    shoot(event, player1, player2);
    shoot(event, player2, player1);
}


document.addEventListener('keydown', shootWrapper);
