const grid = document.getElementById('grid');
//const width = 7;     inserito in winn_comb
//const height = 6;     inserito in win_comb
const RxC = width * height;
const speed = 100;
const cells = [];
const cellColors = [];
let turn = 0;

//creazione celle
for(let i = 0; i < RxC; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // cell.innerText = i;
    grid.appendChild(cell)
    cells[i]=cell;
}
//aggiungere il cursor pointer alla prima riga di caselle
for(let i = 0; i < width; i++){
    cells[i].classList.add('clickable');
}
//Event Listener, click sulle celle
for(let i = 0; i < width; i++){
    const cell = cells[i];
    cell.addEventListener('click', function(){
        const row = [
            i,
            i + width,
            i + (width * 2),
            i + (width * 3),
            i + (width * 4),
            i + (width * 5),
        ]
        if(cellColors[i]){
            return;
        }

        turn++;
        let color;
        //alternanza colori
        if(turn % 2 === 0){
            color = 'Rosso';
        }else{
            color = 'Nero';
        }
        cell.classList.add(color);
        //EFFETTO DELLA GRAVITA'
        if(!cellColors[row[5]]){//controllo sesta riga
            let r = 0;
            const Int_r_5 = setInterval(function(){
                cells[row[r]].classList.remove(color);
                cells[row[r + 1]].classList.add(color);
                r++

                if(r === 5){
                    clearInterval(Int_r_5);
                    cellColors[row[5]] = color;
                }
            }, speed);
            
        }else if(!cellColors[row[4]]){//controllo quinta riga
            let r = 0;
            const Int_r_4 = setInterval(function(){
                cells[row[r]].classList.remove(color);
                cells[row[r + 1]].classList.add(color);
                r++

                if(r === 4){
                    clearInterval(Int_r_4);
                    cellColors[row[4]] = color;
                }
            }, speed);
            
        }else if(!cellColors[row[3]]){//controllo quarta riga
            let r = 0;
            const Int_r_3 = setInterval(function(){
                cells[row[r]].classList.remove(color);
                cells[row[r + 1]].classList.add(color);
                r++

                if(r === 3){
                    clearInterval(Int_r_3);
                    cellColors[row[3]] = color;
                }
            }, speed);
            
        }else if(!cellColors[row[2]]){//controllo terza riga
            let r = 0;
            const Int_r_2 = setInterval(function(){
                cells[row[r]].classList.remove(color);
                cells[row[r + 1]].classList.add(color);
                r++

                if(r === 2){
                    clearInterval(Int_r_2);
                    cellColors[row[2]] = color;
                }
            }, speed);
            
        }else if(!cellColors[row[1]]){//controllo seconda riga
            let r = 0;
            const Int_r_1 = setInterval(function(){
                cells[row[r]].classList.remove(color);
                cells[row[r + 1]].classList.add(color);
                r++

                if(r === 1){
                    clearInterval(Int_r_1);
                    cellColors[row[1]] = color;
                }
            }, speed);
            
        }else{
            cellColors[row] = color;
        }
        console.table(cellColors);
        
        //FINE EFFETTO GRAVITA'
        setTimeout(function(){
            let hasWon = checkVictory();
            if(hasWon){
                showAlert(`${color} HA VINTO`);
            }else if(turn === 49){
                showAlert('PAREGGIO');
            }
        }, 1000);
        //inserire il controllo della vittoria in un setTimeout perchè l'array cellColors non si aggiorna all'instante.
    })
    
}


