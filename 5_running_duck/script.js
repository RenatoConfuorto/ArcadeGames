const road = document.querySelectorAll('#grid > div');

// posizionare la papera
const duckIdx = 1;  //la papera si trava sopra road[1]
const duck = document.getElementById('c_h');
// duck.classList.add('duck');
// /posizionare la papera

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