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
//array giocatori = [player, spaceshipIndex, classe navicella, classe laser, health, healthDisplay, bonus, bonusDisplay, aliensArray, avversario]
const player1 = ['Player 1', redSpaceshipIdx, 'red-spaceship', 'red-laser', 100, health1Display, 25, bonus1Display, aliens1, 'Player 2'];
const player2 = ['Player 2', whiteSpaceshipIdx, 'white-spaceship', 'green-laser', 100, health2Display, 25, bonus2Display, aliens2, 'Player 1']



//movimento alieni e laser
let speed = 500;
let aliensMoveIntv;
let laserSpeed = 150;
let addAliensIntv = null;



//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.innerText = i;
    cell.classList.add('cell');
    cells.push(cell);
    grid.appendChild(cell);
}

//stampare salute e bonus di partenza
function startGame(currentPlayer){
    //inserire salute iniziale
    currentPlayer[5].innerText = currentPlayer[4];
    //inserire uccisioni rimanenti per il bonus iniziali
    currentPlayer[7].innerText = currentPlayer[5];
    //inserire la navicella
    cells[currentPlayer[1]].classList.add(currentPlayer[2]);
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
        !player1[8].includes(numb1) &&
        !player2[8].includes(numb1)){

            player1[8].push(numb1);
    }
    if(numb2 > (width * 5 - 1) &&
        numb2 < RxC - (width * 5 - 1) &&
        !player1[8].includes(numb2) &&
        !player2[8].includes(numb2)){
        player2[8].push(numb2);
    }

    
    player2[8].sort(function(a, b){return a-b});
    player1[8].sort(function(a, b){return a-b});
}

addAliensIntv = setInterval(addAliens, 500);

//constrollare se gli alieni si sono scontrati con la navicella
function checkForAlienCrash(currentPlayer){
    const currentArray = currentPlayer[8];
    for(let i = 0; i < currentArray.length; i++){
        if(currentArray[i] === currentPlayer[1]){
            //l'alieno ha colpito la navicella
            currentArray.splice(i, 1);
            currentPlayer[4]--;
            currentPlayer[5].innerText = currentPlayer[4];
        }
    }
    checkPlayerDeath(currentPlayer);
}

//controllare lo stato di salute dei giocatori
function checkPlayerDeath(currentPlayer){
    //evidenziare salute bassa
    if(currentPlayer[4] <= 25){
        currentPlayer[5].classList.add('red-span');
    }else if(currentPlayer[4] > 25 &&
        currentPlayer[5].classList.contains('red-span')
        ){
            currentPlayer[5].classList.remove('red-span');
        }

    //controllare la morte di un giocatore
    if(currentPlayer[4] < 1){
        clearInterval(addAliensIntv);
        clearInterval(aliensMoveIntv);
        showAlert(`${currentPlayer[9]} Wins`);
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