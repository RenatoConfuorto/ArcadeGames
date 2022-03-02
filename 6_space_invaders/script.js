const size = 15;
const RxC = size * size;
const grid = document.getElementById('grid');
//stampare le celle

for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = i;
    grid.appendChild(cell);

}
