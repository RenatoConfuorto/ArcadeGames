const road = document.querySelectorAll('#grid > div');

//posizionare la papera
const duckIdx = 1;
const duck = road[duckIdx];
duck.classList.add('duck');

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