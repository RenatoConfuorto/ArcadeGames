const cells = document.querySelectorAll('.cell');

let turn = 0;
const cellSigns = [];

for(let i = 0; i < cells.length; i++){
    const cell = cells[i];
    cell.addEventListener('click', function(){
        if(cellSigns[i]){
            console.log('casella già cliccata');
            return;
        }

        turn++
        let sign;
        if(turn % 2 === 0){
            sign = 'O';
        }else{
            sign = 'X';
        }
        

        cell.innerText = sign;
        cellSigns[i] = sign;
        console.table(cellSigns);
        let hasWon = checkVictory();
        if(hasWon){
            //dici che ha vinto
            console.log(`${sign} ha vinto`);
            showAlert(`${sign} ha vinto`);
        }else if(turn === 9){
            //dici che ha pareggiato
            console.log('pareggio');
            showAlert('Pareggio');
        }

    })

}

function checkVictory() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for(let i = 0; i < winningCombinations.length; i++){
        const combination = winningCombinations[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if(
            cellSigns[a] &&
            cellSigns[a] === cellSigns[b] &&
            cellSigns[b] === cellSigns[c]
        ){
            return true;
        }
    }
    return false;

}