const grid = document.getElementById('grid');
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tictak'];
const deck = [...cards,...cards,...cards,...cards,...cards,...cards,...cards,...cards,...cards,...cards];

const player1ScoreDisplay = document.getElementById('score_1');
const player2ScoreDisplay = document.getElementById('score_2');
//per lo switch di player
const player1 = document.querySelector('.player_1');
const player2 = document.querySelector('.player_2');

let error = 0;
let score1 = 0;
let score2 = 0;
let currentPlayer = player1;
let currentPlayerScoreDisplay = player1ScoreDisplay;
// let currentPlayerScore = score1;

player1ScoreDisplay.innerText = score1;
player2ScoreDisplay.innerText = score2;

currentPlayer.classList.add('current_player');

deck.sort(function(){
    return 0.5 - Math.random();
})

let pick = [];

for(let i = 0; i < deck.length; i++){
    const card = document.createElement('div');
    card.classList.add('card');
    cardName = deck[i];
    card.setAttribute('data-name', cardName);

    card.addEventListener('click', flipCard);
    grid.appendChild(card);
}

function flipCard(event){
    const card = event.target;
    if(card.classList.contains('flipped')){
        console.log('già cliccata');
        return;
    }
    card.classList.add(card.getAttribute('data-name'), 'flipped');

    pick.push(card);

    if(pick.length === 2){
        checkForMatch();
    }
}

function checkForMatch(){
    const card1 = pick[0];
    const card2 = pick[1];
    const card1Name = pick[0].getAttribute('data-name');
    const card2Name = pick[1].getAttribute('data-name');

    if(card1Name === card2Name){
        //fatto match
        console.log('Match');
        currentPlayerScore++;
        //salvare i progressi punteggio in score1 e score2
        if(error % 2 === 0){
            score1 === currentPlayerScore;
        }else{
            score2 === currentPlayerScore
        }
        currentPlayerScoreDisplay.innerText = currentPlayerScore;
        checkForVictory();
    }else{
        setTimeout(function(){
            card1.classList.remove(card1Name, 'flipped');
            card2.classList.remove(card2Name, 'flipped');
            error++;
            switchPlayer();
        }, 250);
    }

    pick = [];
}
//switch giocatori
function switchPlayer(){
    currentPlayer.classList.remove('current_player');
    if(error % 2 === 0){
        currentPlayer = player1;
        currentPlayerScore = score1;
        currentPlayerScoreDisplay = player1ScoreDisplay;
    }else{
        currentPlayer = player2;
        currentPlayerScore = score2;
        currentPlayerScoreDisplay = player2ScoreDisplay;
    }

    currentPlayer.classList.add('current_player');
}
//sistemare che non cambia giocatore

function checkForVictory(){
    const flippedCards = document.querySelectorAll('.flipped');

    if(flippedCards.length === deck.length){
        if(score1 > score2){
            showAlert('Giocatore 1 vince');
        }else if(score1 < score2){
            showAlert('Giocatore 2 vince');
        }else if(score1 === score2){
            showAlert('Pareggio');
        }
    }
}


console.table(deck);