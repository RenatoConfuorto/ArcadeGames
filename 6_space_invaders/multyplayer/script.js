//elementi del DOM
const grid = document.getElementById('grid');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const levelDisplay = document.getElementById('level');

//ARRAY
const cells = [];

//dimensioni griglia
const width = 35;
const height = 25;
const RxC = width * height;

//stampare le celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.innerText = i;
    cell.classList.add('cell');
    cells.push(cell);
    grid.appendChild(cell);
}