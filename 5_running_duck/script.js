const road = document.querySelectorAll('#grid > div');

// posizionare la papera
const duckIdx = 1;  //la papera si trava sopra road[1]
const duck = document.getElementById('c_h');
// /posizionare la papera

//sistema di punteggio
const scoreDisplay = document.getElementById('score');
let currentScore = 0;
scoreDisplay.innerText = currentScore;

//sistema aumento livello
const levelDisplay = document.getElementById('level');
let speed = 200;
let level = 1;
levelDisplay.innerText = level;

let levelUp = 5;

//aggiungere la pianta
function addPlant(){
    let currentPlantIdx = road.length - 1;
    road[currentPlantIdx].classList.add('plant');

    const plantIntVal = setInterval (function(){
        road[currentPlantIdx].classList.remove('plant');
        currentPlantIdx--

        if(currentPlantIdx < 0){
            clearInterval(plantIntVal);
            currentScore++; //aumento punteggio se la pianta non si è scontrata con la papera

            //controllo aumento livello
            if (currentScore === levelUp) {
                levelUp = levelUp + (5 + (2 * level));
                if (speed > 100) {
                    speed = speed - 50;
                }else{
                    speed = 75;
                }
                level++;
                levelDisplay.innerText = level;
            }
            // /controllo aumento livello

            scoreDisplay.innerText = currentScore;
            addPlant();
            return;
        }

        if(currentPlantIdx === duckIdx &&
            !duck.classList.contains('jump')
            ){
                showAlert('CRASH');
                clearInterval(plantIntVal);
                duck.classList.remove('duck');
                road[currentPlantIdx].classList.remove('plant');
                return;
        }
        road[currentPlantIdx].classList.add('plant');


    }, speed)
}

//partenza ritardata del gioco
const timerDisplay = document.getElementById('timer');
let time = 5;
timerDisplay.innerText = time;
const countDown = document.querySelector('.count-down');

const startGame = setInterval(function(){
    time--;
    timerDisplay.innerText = time;

    if(time === 0){
        clearInterval(startGame);
        countDown.style.display = 'none';
        addPlant();
    }
}, 1000)

// /aggiungere la pianta

//salto della papera
function jump(event){
    if(event.code === 'Space' && !event.repeat){
        // console.log('Salto');
        duck.classList.add('jump');
        setTimeout(function(){
            duck.classList.remove('jump');
        }, 300)
    }
    
}

document.addEventListener('keydown', jump);
// /salto della papera