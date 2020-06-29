//Global Variables
var trex_ye,trex,count,score,gameState,bananaGroup,stonesGroup


function preload(){
  trex_ye=loadAnimation(" Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png", "Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stones=loadImage("stone.png")
  bananas=loadImage("Banana.png")
  
}


function setup() {
  createCanvas(400,400);
  count=0;
  score=0;
  gameState="play";
  bananaGroup=new Group();
  trex=createSprite(60,350,20,20);
  trex.addAnimation("ye",trex_ye);
  stonesGroup=new Group();
  trex.scale=0.1
}


function draw(){
background(255);
  textSize(25);
  text("time gone: "+ Math.round(count), 200, 100);
  text("score:"+ Math.round(score), 50, 100);
  if (gameState==="play") {
    if (keyDown("space")&&trex.y>=370) {
      
      trex.velocityY=-12; 
      
    }
    
    count=count+0.04;
    if (trex.isTouching(bananaGroup)) {
      
    bananaGroup.destroyEach();
    score=score+1;
      
    }
    
    trex.velocityY=trex.velocityY+0.8;
    
    
    spawnstones();
    spawnbanana();
  }


  if (trex.isTouching(stonesGroup)) {
    
    gameState="end";
    
  }
  if (gameState==="end") {
    
    stonesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    stonesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    trex.velocityY=0;

    
  }
  Edges = createEdgeSprites();
  trex.collide(Edges[3]);
  
  drawSprites();
}

function spawnstones(){
  if (World.frameCount % 80 === 0) {
    
    var stone=createSprite(450,380);
    stone.addImage(stones)
    stone.scale=0.1;
    stone.velocityX=-10;
    stone.lifetime=50;
    stonesGroup.add(stone);
    
  }
}

function spawnbanana(){
  if (World.frameCount % 175 === 0) {
   
    var banana=createSprite(450,310);
    banana.addImage(bananas);
    banana.velocityX=-10;
    banana.scale=0.05;
    banana.lifetime=60;
    bananaGroup.add(banana);
  }
}
