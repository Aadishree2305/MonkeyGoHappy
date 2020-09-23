var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

var ground;
var invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600, 200);

  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  //trex.addAnimation("collided", trex_collided);
  

  monkey.scale = 0.1;
  
  ground = createSprite(600,190,1200,10);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(300,195,600,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstacleGroup = new Group();
  bananaGroup = new Group();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
}


function draw(){
   background("yellow");
  //displaying survial time 
  text("Survial time: "+ score, 500,50);
     ground.velocityX = -(6 + 2* score/100)
  
     //scoring
     score = score + Math.round(getFrameRate()/60);
    
     if (ground.x < 0){
      ground.x = ground.width/2;
     }
    
     //jump when the space key is pressed
     if(keyDown("space")) {   
        monkey.velocityY = -12;
     }
  
     //add gravity
     monkey.velocityY = monkey.velocityY + 0.8;
  
    //scoring 
    if(bananaGroup.isTouching(monkey)){
       score=score+1;
       bananaGroup.destroyEach();
    }
    
     monkey.collide(invisibleGround);
      
     //spawn the clouds
     spawnBanana();
  
     //spawn obstacles on the ground
     spawnObstacles();
    
  
     drawSprites();
} 
 


function spawnBanana(){
  // spawning the banana
  if(frameCount % 100 === 0){
    var banana = createSprite(600,120,600,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
    if(frameCount % 80 === 0){
      var obstacle = createSprite(600,170,10,10);
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.1
      obstacle.velocityX = -(6+2*score/100);
      
      //assigning lifetime 
      obstacle.lifetime = 200;
      
      obstacleGroup.add(obstacle);
      
    }
  
}


