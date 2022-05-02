const grid = document.getElementById('grid');
const timerDisplay = document.getElementById('timer-display');
const countdownBanner = document.getElementById('countdown-banner');
const countdownTimerDisplay = document.getElementById('timer-countdown');
const actionBtn = document.getElementById('action-btn');

const RxC = 25;

//creare 25 numeri in ordine casuale
const numbers = [];

while(numbers.length < RxC){
  // console.log('while');
  const casualInteger = Math.floor(Math.random() * RxC + 1);
  if(!numbers.includes(casualInteger)){
    numbers.push(casualInteger);
  }
}

const cells = [];

//stampare le celle
for(let i = 0; i < RxC; i++){
  const cell = document.createElement('input');
  cell.setAttribute('type', 'number');
  cell.setAttribute('disabled', '');
  cell.classList.add('cell');
  cells.push(cell);
  grid.appendChild(cell);
}

//avviare il gioco in ritardo
let startTimer = 5;//5
countdownTimerDisplay.innerText = startTimer;

let countDownIntv = null;
countDownIntv = setInterval(countdownGame, 1000);

function countdownGame(){
  startTimer--,
  countdownTimerDisplay.innerText = startTimer;

  if(startTimer === 0){
    //avviare il gioco
    countdownBanner.style.display = 'none';
    clearInterval(countDownIntv);
    startGame();
  }
}

function updateTimer(number, element){
  //number = total time in seconds
  const seconds = number % 60;
  const minutes = Math.floor(number / 60);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

  element.innerText = formattedTime;
}

let gameTimerIntv;
let secondPhaseIntv;
let time = 120;//120
let secondTime = 120;//120

function startGame(){
  //avviare il timer di due minuti
  
  updateTimer(time, timerDisplay);
  gameTimerIntv = setInterval(gameTimer, 1000)
  //inserire i numeri nelle celle
  innerNumbers();
  actionBtn.addEventListener('click', startGameNow);
}

function startGameNow(){
  time = 0;
  clearInterval(gameTimerIntv);
  startAfterGame();
  actionBtn.setAttribute('disabled', '');
}

function gameTimer(){
  time--
  
  updateTimer(time, timerDisplay);

  if(time === 0){
    clearInterval(gameTimerIntv);
    //avviare la seconda fase del gioco
    startAfterGame();
  }
}

function innerNumbers(){

  cells.forEach( (element, index) => {
    element.value = numbers[index];
  } );

}

//SECONDA FASE DEL GIOCO
function startAfterGame(){
  //rende vuote e cliccabili le caselle
  cells.forEach( element => {
    element.value = null;
    element.removeAttribute('disabled', '');
  });
  cells.forEach(element => {
    element.addEventListener('keydown', sendValue);
  });


  updateTimer(secondTime, timerDisplay);
  //impostare un timer per la seconda fase
  secondPhaseIntv = setInterval(secondPhaseTimer, 1000);
}

let correctGuesses = 0;

function secondPhaseTimer(){
  secondTime--;
  updateTimer(secondTime, timerDisplay);
  if(secondTime === 0){
    clearInterval(secondPhaseIntv);
    //mostrare quanti numeri corretti sono stati inseriti
    showAlert(`Indovinate: ${correctGuesses}`);
  }
}

function sendValue(event){

  let value = this.value;

  if(event.code !== 'Enter')return;

  if(value === '' || value > 25){
    //la cella è vuota o è stato inserito un carattere speciale o il numero non è valido
    this.value = '';
    return;
  }
  //recuparare l'indice della cella
  const index = cells.indexOf(this);
  //controllare che il numero sia corretto
  if(numbers[index] == value){
    //il numero è corretto
    correctGuesses++;
  }else{
    //il numero è errato
    this.value = numbers[index];
    this.classList.add('wrong');
  }

  this.setAttribute('disabled', '');

  checkForEndGame();
}

function checkForEndGame(){
  let count = 0;
  cells.forEach( element => {
    if(element.hasAttribute('disabled', ''))count++;
  });

  if(count === 25){
    clearInterval(secondPhaseIntv);
    //mostrare quanti numeri corretti sono stati inseriti
    showAlert(`Indovinate: ${correctGuesses}`);
  }
}



