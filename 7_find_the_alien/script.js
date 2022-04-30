const grid = document.getElementById('grid');
const aliensLeftDisplay = document.getElementById('aliens-left');

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
  //click sulla cella
  cell.addEventListener('click', leftClickCell);
  cell.oncontextmenu = function(event){
    rightClick(this);
    return false;
  };
}

function rightClick(element){
  console.log('rightClick', cells.indexOf(element));
  //inserire la bandiera
  const index = cells.indexOf(element);
  //aggiornare il contatore degli alieni rimanenti
  if(cells[index].classList.contains('flag')){
    aliensLeftNumber++;
    aliensLeftDisplay.innerText = aliensLeftNumber;
  }else{
    aliensLeftNumber--;
    aliensLeftDisplay.innerText = aliensLeftNumber;
  }
  // mettere\togliere la bandiera
  cells[index].classList.toggle('flag');
}

function leftClickCell(event){
  const index = cells.indexOf(this);
  //impedire il click se c'è la bandiera
  if(cells[index].classList.contains('flag'))return;
  console.log('leftClick', cells.indexOf(this));

  //controllare se nella casella c'è un alieno
  if(aliens.includes(index)){
    //cliccato sull'alieno
    alienClicked();
    showAlert('Game Over');
    return;
  }else{
    //la casella è libera ---> mostrare il numero
    const number = findAlienNumber(this);
    let numberClass;

    switch(number){
      case 0:
        numberClass = 'empty';
        console.log('Mostrare le celle adiacenti');
      break;

      case 1 :
        numberClass = 'white';
      break;

      case 2:
        numberClass = 'green';
      break;

      case 3:
        numberClass = 'red';
      break;
      
      case 4:
        numberClass = 'darkblue';
      break;

      case 5:
        numberClass = 'darkred';
      break;

      case 6:
        numberClass = 'pink';
      break;

      case 7:
        numberClass = 'black';
      break;

      case 8:
        numberClass = 'yellow';
      break;
    }

    cells[index].innerText = number;
    cells[index].classList.add('pointer-none', numberClass);
  }
}

function alienClicked(){
  //mostrare tutti gli alieni con uno sfondo rosso
  for(let i = 0; i < aliens.length; i++){
    cells[aliens[i]].classList.add('alien', 'end-game');
  }
}

function findAlienNumber(element){
  //DEVE RESTITUIRE IL NUMERO DEGLI ALIENI
  //l'indice dell'elemento su cui si va a lavorare
  const index = cells.indexOf(element);

  const leftEdge = index % width === 0;
  const rightEdge = index % width === width - 1;
  const topEdge = index < width;
  const bottomEdge = index >= RxC - width;
  const topLeftCorner = topEdge && leftEdge;
  const bottomLeftCorner = bottomEdge && leftEdge;
  const topRightCorner = topEdge && rightEdge;
  const bottomRightCorner = bottomEdge && rightEdge;

  //numero di bombe nelle celle adiacenti
  let sum = 0;

  //fare una funzione per ogni caso
  if(topLeftCorner)sum = topLeftCornerCount(element);
  else if(topRightCorner)sum = topRightCornerCount(element);
  else if(bottomLeftCorner)sum = bottomLeftCornerCount(element);
  else if(bottomRightCorner)sum = bottomRightCornerCount(element);
  else if(leftEdge)sum = leftEdgeCount(element);
  else if(rightEdge)sum = rightEdgeCount(element);
  else if(topEdge)sum = topEdgeCount(element);
  else if(bottomEdge)sum = bottomEdgeCount(element);
  else{
    sum = centerCellCount(element);
  }

  return sum;
}

//FUNZIONI PER IL CONTEGGIO DEGLI ALIENI

function topLeftCornerCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index + 1))count++;
  if(aliens.includes(index + width))count++;
  if(aliens.includes(index + width + 1))count++;
  return count;
}

function topRightCornerCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index - 1))count++;
  if(aliens.includes(index + width))count++;
  if(aliens.includes(index + width - 1))count++;
  return count;
}

function bottomLeftCornerCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index + 1))count++;
  if(aliens.includes(index - width))count++;
  if(aliens.includes(index - width + 1))count++;
  return count;
}

function bottomRightCornerCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index - 1))count++;
  if(aliens.includes(index - width))count++;
  if(aliens.includes(index - width - 1))count++;
  return count;
}

function leftEdgeCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index + 1))count++;
  if(aliens.includes(index + width))count++;
  if(aliens.includes(index + width + 1))count++;
  if(aliens.includes(index - width))count++;
  if(aliens.includes(index - width + 1))count++;
  return count;
}

function rightEdgeCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index - 1))count++;
  if(aliens.includes(index - width))count++;
  if(aliens.includes(index - width - 1))count++;
  if(aliens.includes(index + width))count++;
  if(aliens.includes(index + width - 1))count++;
  return count;
}
 
function topEdgeCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index + 1))count++;
  if(aliens.includes(index - 1))count++;
  if(aliens.includes(index + width))count++;
  if(aliens.includes(index + width + 1))count++;
  if(aliens.includes(index + width - 1))count++;
  return count;
}

function bottomEdgeCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index + 1))count++;
  if(aliens.includes(index - 1))count++;
  if(aliens.includes(index - width))count++;
  if(aliens.includes(index - width + 1))count++;
  if(aliens.includes(index - width - 1))count++;
  return count;
}

function centerCellCount(element){
  const index = cells.indexOf(element);
  let count = 0;
  if(aliens.includes(index + 1))count++;
  if(aliens.includes(index - 1))count++;
  if(aliens.includes(index + width))count++;
  if(aliens.includes(index + width + 1))count++;
  if(aliens.includes(index + width - 1))count++;
  if(aliens.includes(index - width))count++;
  if(aliens.includes(index - width + 1))count++;
  if(aliens.includes(index - width - 1))count++;
  return count;
}

//generare gli alieni
const aliensCount = 100;

let aliensLeftNumber = aliensCount;
aliensLeftDisplay.innerText = aliensLeftNumber;

const aliens = [];

while(aliens.length < aliensCount){
  const randomNumber = Math.floor(Math.random() * RxC + 1);
  if(!aliens.includes(randomNumber)){
    aliens.push(randomNumber);
  }
}


for (let i = 0; i < aliens.length; i++) {
  const cell = cells[aliens[i]];
  cell.classList.add('alien');
}







//MANIPOLARE IL CLICK DESTRO
/*
grid.oncontextmenu = function ()
{
    showCustomMenu();
    return false;     // cancel default menu
}

function showCustomMenu(){
  console.log('right click');
}
*/

/*

const alienCell = 410;

cells[alienCell].classList.add('alien');

cells[alienCell + 1].classList.add('red');
cells[alienCell - 1].classList.add('red');
cells[alienCell + width].classList.add('red');
cells[alienCell - width].classList.add('red');
cells[alienCell + width + 1].classList.add('red');
cells[alienCell - width + 1].classList.add('red');
cells[alienCell + width - 1].classList.add('red');
cells[alienCell - width - 1].classList.add('red');

*/