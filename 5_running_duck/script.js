const road = document.querySelectorAll('#grid > div');

// posizionare la papera
const duckIdx = 1;
const duck = road[duckIdx];
duck.classList.add('duck');
// /posizionare la papera7

let speed = 200;
//aggiungere la pianta
function addPlant(){
    let currentPlantIdx = road.length - 1;
    road[currentPlantIdx].classList.add('plant');

    const plantIntVal = setInterval (function(){
        road[currentPlantIdx].classList.remove('plant');
        currentPlantIdx--

        if(currentPlantIdx < 0){
            clearInterval(plantIntVal);
            addPlant();
            return;
        }

        road[currentPlantIdx].classList.add('plant');


    }, speed)
}

addPlant();
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