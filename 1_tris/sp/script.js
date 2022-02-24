const cells = document.querySelectorAll('.cell');

let turn = 0;
let sign;

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

const cellSigns = [];

for(let i = 0; i < cells.length; i++){
    const cell = cells[i];
    cell.addEventListener('click', function(){
        //controllo cella
        if(cellSigns[i]){
            console.log('casella già cliccata');
            return;
        }            
        //inserimento X
        sign = 'X';
        cell.innerText = sign;
        cellSigns[i] = sign;
        turn++;
        console.log(`turno ${turn}`);
        let hasWon = checkVictory();
        if(hasWon){
            //dici che ha vinto
            console.log(`${sign} ha vinto`);
            showAlert(`${sign} ha vinto`);
            return;
        }else if(turn === 9){
            //dici che ha pareggiato
            console.log('pareggio');
            showAlert('Pareggio');
            return;
        }
        //non inserire la funzione altrimenti il codice continua a eseguirsi anche se è finita
        //controllare dopo la X se è vittoria o pareggio altrimenti avvia il setTimeout e dà errore
        setTimeout(computerSign, 500);

        //console.table(cellSigns);

    })
    
    
    }


function checkVictory() {

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



function computerSign(){
    const casualNbr = Math.floor(Math.random() * cells.length);
    sign = 'O';
    for(let i = 0; i < winningCombinations.length; i++){
        const combination = winningCombinations[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        //controllo primo caso
        if(
            cellSigns[a] &&
            cellSigns[a] === cellSigns[b] &&
            !cellSigns[c]
        ){
            cells[c].innerText = sign;
            cellSigns[c] = sign;
            turn++;
            afterComputerSign();

            return;
            //return necessario altrimenti mette più segni
        }else if(
            cellSigns[b] &&
            cellSigns[b] === cellSigns[c] &&
            !cellSigns[a]
        ){
            cells[a].innerText = sign;
            cellSigns[a] = sign;
            turn++;
            afterComputerSign();

            return;
        }else if(
            cellSigns[a] &&
            cellSigns[a] === cellSigns[c] &&
            !cellSigns[b]
        ){
            cells[b].innerText = sign;
            cellSigns[b] = sign;
            turn++;
            afterComputerSign();

            return;
        }
    }

    casualSign();

    //Segno Casuale se non c'è nessuna combinazione quasi vincente
    
    afterComputerSign();
    
}
//a causa del return bisogna far controllare in ogni if la vittoria o il pareggio
function afterComputerSign(){
    let hasWon = checkVictory();
    if(hasWon){
        //dici che ha vinto
        console.log(`${sign} ha vinto`);
        showAlert(`${sign} ha vinto`);
        return;
    }else if(turn === 9){
        //dici che ha pareggiato
        console.log('pareggio');
        showAlert('Pareggio');
        return;
    }
    console.log(`turno ${turn}`);
}

function casualSign(){
    const casualNbr = Math.floor(Math.random() * cells.length);
    if(cellSigns[casualNbr]){
        casualSign();
    }else{
        sign = 'O';
        cells[casualNbr].innerText = sign;
        cellSigns[casualNbr] = sign;

        turn++;

    }
    afterComputerSign();
    
}