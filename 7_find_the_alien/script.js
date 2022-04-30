const grid = document.getElementById('grid');

const cells = [];

//stampare le celle
const width = 25;
const height = 40;
const RxC = width * height;

for(let i = 0; i < RxC; i++){
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.innerText = i; //TOGLIERE
  cells.push(cell);
  grid.appendChild(cell);
  //aggiungere l'event listener
}