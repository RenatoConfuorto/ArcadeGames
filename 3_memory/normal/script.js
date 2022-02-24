// prendo le carte
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tictak'];
const grid = document.querySelector('#grid');
const deck = [...cards,...cards,...cards,...cards];
const errorDisplay = document.getElementById('errors_display');

let errors = 0;
let pick = [];

deck.sort(function(){
    return 0.5 - Math.random();
})
console.table(deck);

//stampo le celle
for(let i = 0; i < deck.length; i++){
    const card = document.createElement('div');
    const cardName = deck[i];
    card.classList.add('card');
    card.setAttribute('data-name', cardName);
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
    
}

errorDisplay.innerText = errors;

function flipCard(){
    const card = event.target;
    if(card.classList.contains('flipped')){
        return;
    }
    console.log('ciao');
    card.classList.add(card.getAttribute('data-name'), 'flipped');
    pick.push(card);
    if(pick.length === 2){
        //controlla il match
        checkForMatch();
    }
}

function checkForMatch(){
    const card1 = pick[0];
    const card2 = pick[1];
    const card1Name = card1.getAttribute('data-name');
    const card2Name = card2.getAttribute('data-name');

    if(card1Name === card2Name){
        console.log('hai fatto match');
        checkForWin();
    }else{
        setTimeout(function(){
            card1.classList.remove(card1Name, 'flipped');
            card2.classList.remove(card2Name, 'flipped');
            errors++;
            errorDisplay.innerText = errors;
            if(errors === 15){
                showAlert('Hai perso');
            }
        }, 250)
    }

    pick = [];
}

function checkForWin(){
    const flippedCards = document.querySelectorAll('.flipped');
    if(flippedCards.length === deck.length){
        showAlert('Hai vinto');
    }
}