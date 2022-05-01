const grid = document.getElementById('grid');
const timerDisplay = document.getElementById('timer-display');
const countdown = document.getElementById('countdown');
const countdownTimerDisplay = document.getElementById('timer-countdown');

//creare 25 numeri in ordine casuale
const numbers = [];

while(numbers.length < RxC){
  // console.log('while');
  const casualInteger = Math.floor(Math.random() * RxC + 1);
  if(!numbers.includes(casualInteger)){
    numbers.push(casualInteger);
  }
}

const RxC = 25;
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
let startTimer = 5;
countdownTimerDisplay.innerText = startTimer;

let countDownIntv = null;
countDownIntv = setInterval(countdownGame, 1000);

function countdownGame(){
  startTimer--,
  countdownTimerDisplay.innerText = startTimer;

  if(startTimer === 0){
    //avviare il gioco
  }
}

