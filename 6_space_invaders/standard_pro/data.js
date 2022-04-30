//controllare l'aumento di livello
function levelUp(){
  level++;
  if(level === 11){ //Gli umani vincono
      showAlert('Human Wins');
      return;
  }
  levelDisplay.innerText = level + '/10';
  aliensKilled = []; //svuotare aliensKilled
  aliens = []; //svuotare aliens

  const row2 = width;
  const row3 = width * 2;
  const row4 = width * 3;

  switch(level){
      //livello 1
      case 1:
        for(let i = 0; i <= 5; i++){
          if(i % 2 === 0){
            aliens.push(i);
          }
        }
        break;
      //livello 2
      case 2:
          aliens = []; 
          //impostare gli alieni
          for(let i = 0; i <= 10; i++){
            if(i % 2 === 0){
              aliens.push(i);
            }else{
              aliens.push(row2 + i);
            }
          }
          laserSpeed = 150; //impostare la velocità del laser
          break;
      //livello 3
      case 3:
          aliens = [];
          for(let i = 0; i <= 11; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
            }
          }
          laserSpeed = 150; 
          break;
      //livello 4
      case 4:
          aliens = [];
          for(let i = 0; i <= 12; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
            }
          }
          laserSpeed = 150; 
          break;
      //livello 5
      case 5:
          aliens = [];
          for(let i = 0; i <= 12; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
              aliens.push(row4 + i);
            }
          }
          laserSpeed = 150; 
          break;
      //livello 6
      case 6:
          aliens = [];
          for(let i = 0; i <= 12; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
            }
          }
          laserSpeed = 150; 
          break;
      //livello 7
      case 7:
          aliens = [];
          for(let i = 0; i <= 12; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
            }
          }
          laserSpeed = 150; 
          break;
      //livello 8
      case 8:
          aliens = [];
          for(let i = 0; i <= 12; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
            }
          }
          laserSpeed = 250; 
          break;
      //livello 9
      case 9:
          aliens = [];
          for(let i = 0; i <= 12; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
            }
          }
          laserSpeed = 250; 
          break;
          //livello 10
      case 10:
          aliens = [];
          for(let i = 0; i <= 13; i++){
            if(i % 2 === 0){
              aliens.push(i);
              aliens.push(row3 + i);  
            }else{
              aliens.push(row2 + i);
              aliens.push(row4 + i);
            }
          }
          laserSpeed = 300; 
          break;
  }
  shootChance = (0.5 / aliens.length);//ridurre la probabilità all'aumentare degli alieni


  drawAliens();
  aliensMoveIntv = setInterval(moveAliens, speed);

  console.log('Level Up');
}
