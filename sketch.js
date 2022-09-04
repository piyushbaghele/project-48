var astronaut_running,astronaut
var scene_image,scene
var obstacle_1 ,obstacle_2 ,obstacle_3 ,obstacle_4,obstacle_5;
var gem_1;
var score = 0;
var gameState = 1
var deathCount = 0
var hasTouched = true


function preload(){
  astronaut_running = loadAnimation("imagess/running-4.png","imagess/running-5.png","imagess/running-6.png")  
  scene_Image = loadImage("imagess/img8.jpg");
  
  obstacle_1 = loadImage("imagess/obstacle-1.png")
  obstacle_2 = loadImage("imagess/obstacle-2.png")
  obstacle_3 = loadImage("imagess/obstacle-3.png")
  obstacle_4 = loadImage("imagess/obstacle-4.png")
  obstacle_5 = loadImage("imagess/obstacle-5.png")
  sadAstronaut = loadImage("imagess/sad_astronaut.png")
  restart_img = loadImage("imagess/restart.png")
  gameOver_img = loadImage("imagess/game_over.png")

  spaceCraft = loadImage("imagess/rocket.png")
  gem_1 = loadImage("imagess/gem-1.png")

  heart_img = loadImage("imagess/heart-1.png")
  arrow_img = loadImage("imagess/right_arrow.png")

  space = loadImage("imagess/bg-space.jpg")

}

function setup() {
  createCanvas(1600, 720);

 scene = createSprite(1400,height/2,1000,800); 
 scene.addImage("background",scene_Image);
 
 scene.scale=2
 
 astronaut = createSprite(150,height-155);
 astronaut.addAnimation("running",astronaut_running);
 astronaut.addAnimation("sad",sadAstronaut)
 astronaut.addAnimation("happy",spaceCraft)
 astronaut.scale = 0.6;
 astronaut.debug = true
 astronaut.setCollider("rectangle",0,0,180,360)

 gameOver = createSprite(width/2, height/2 - 180)
 gameOver.addImage(gameOver_img)
 gameOver.scale = 0.5

 restart = createSprite(width/2,height/2) 
 restart.addImage(restart_img)
 restart.scale = 0.25

 heart_1 = createSprite(150,100)
 heart_1.addImage(heart_img)
 heart_1.scale = 0.01

 heart_2 = createSprite(200,100)
 heart_2.addImage(heart_img)
 heart_2.scale = 0.01

 heart_3 = createSprite(250,100)
 heart_3.addImage(heart_img)
 heart_3.scale = 0.01

 obstaclesGroup = createGroup();
 gemsGroup = createGroup()

 invisibleGround = createSprite(200,height - 50,400,10);
 invisibleGround.visible = true

 score = 0;
}

function draw() {
  background(0);
  
  if(gameState == 1){
    astronaut.visible = true
    gameOver.visible = false
    restart.visible = false

    scene.velocityX = -5

  if (scene.x < 200){
     scene.x = 1300; 
    }

   //console.log(astronaut.y)
    if(keyDown("space")&& astronaut.y >= 545) {
      astronaut.velocityY = -16;
  }
    
  astronaut.velocityY = astronaut.velocityY + 0.3

 if(gemsGroup.isTouching(astronaut)){
    gemsGroup.destroyEach();
    score = score + 5;
 } 

 spawnObstacles();
 spawnGem();

  astronaut.collide(invisibleGround);

  //gameOver 
  if(obstaclesGroup.isTouching(astronaut)){
    hasTouched = true
    scene.velocityX = 0

    if(hasTouched == true){
    deathCount = deathCount + 1
    hasTouched = false
   }

     //gameState = 2;
     console.log(deathCount)
    
  }

  if(deathCount > 3 ){
    gameState = 2
  }

  //game won
  if(score >= 2){
    scene.visible = false;
    
    gameState = 3
  }

    }

    if(gameState == 2){
      astronaut.x = width/2
      astronaut.y = height - 150 
      astronaut.velocityY=0  
      astronaut.changeAnimation("sad")

      gameOver.visible = true
      restart.visible = true

      obstaclesGroup.setLifetimeEach(-1)
      gemsGroup.setLifetimeEach(-1)

      gemsGroup.setVelocityXEach(0)
      obstaclesGroup.setVelocityXEach(0)

      if(mousePressedOver(restart)){
        reset();
      }

    }

    if(gameState == 3){
      astronaut.changeAnimation("happy")
      astronaut.velocityY = 0
      obstaclesGroup.destroyEach()
      gemsGroup.destroyEach()
      astronaut.x = width/2
      astronaut.y = height/2 -150

      arrow = createSprite(width/2,height - 150)
      arrow.addImage(arrow_img)
      arrow.scale = 0.25

      textSize(50)
      fill("blue")
      text("Hurray!! to home Earth.",width/2 -200,60)

      fill("green")
      text("Click on this arrow to move to another level-2",width/2-380,500)
    }

  drawSprites();

  textSize(30);
  fill("black");
  text("If you score more than 30 then astronaut will get the spacecraft to Earth his home.",width/2 -500 ,50)
  text("Score: "+ score, width/2,90);

  text("Life: ",70,110)
  
  
}

function spawnObstacles(){
if(frameCount % 150 === 0){
  var obstacle = createSprite(width+50,600)
  obstacle.velocityX = -5


var rand = Math.round(random(1,5));
switch(rand) {
  case 1:
     obstacle.addImage(obstacle_1);
     obstacle.scale = 0.5;
          break;
  case 2:
     obstacle.addImage(obstacle_2);
     obstacle.scale = 0.5;
          break;
  case 3:
     obstacle.addImage(obstacle_3);
     obstacle.scale = 0.5;
          break;
  case 4:
     obstacle.addImage(obstacle_4);
          obstacle.scale = 0.3;
          break;
  case 5:
     obstacle.addImage(obstacle_5);
     obstacle.scale = 0.5;
      break;
  default:
     break;

}

    obstacle.lifetime = 400;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
    }

function spawnGem(){
  if(frameCount % 180 === 0){
    var rand = Math.round(random(height/2,height/2 + 200))
    var gem = createSprite(width+50,rand)
    gem.addImage(gem_1);
    gem.scale = 0.10;
    gem.velocityX = -5
    gem.lifetime = 400;
    gemsGroup.add(gem);

  }
}

function reset() {
obstaclesGroup.destroyEach()
gemsGroup.destroyEach()

astronaut.x = 150
astronaut.changeAnimation("running")

score = 0

gameState = 1

}

