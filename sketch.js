var runningAnimation,boy;
var backgroundImg,background1;
var ground1,groundImg;
var hurdleGroup, hurdle, hurdleImg;
var gameState = "play";
var medalGroup, medal, medalImg;
var gameOver, gameOverImg;
var score = 0;

function preload(){
  
  backgroundImg = loadImage("stadium3.jpg");
  runningAnimation = loadAnimation("running1.png","running2.png","running3.png","running4.png","running5.png");
  groundImg = loadImage("track2.png");
  hurdleImg = loadImage("hurdle2.png");
  medalImg = loadImage("medal.png");
  gameOverImg = loadImage("game over.png");
}
function setup() {
  createCanvas(1500,650);


  background1 = createSprite(700,300);
  background1.addImage(backgroundImg);
  background1.velocityX = -4;

  boy = createSprite(200,displayHeight-150,20);
  boy.addAnimation("runningBoy",runningAnimation);

  ground1 = createSprite(displayWidth/2,displayHeight-140);
  ground1.addImage(groundImg)

  hurdleGroup = createGroup();
  medalGroup = createGroup();

}

function draw() {
  background("blue");

  
  if(keyDown(UP_ARROW)){
    boy.velocityY = -10;
  }else{

    boy.velocityY = 5;
    boy.collide(ground1);
  }

  if(gameState == "play"){
    background1.velocityX = -4;
  
    if(background1.x < 400){
      background1.x = 1000;
    }

    
    
  spawnHurdles();
  spawnMedals();

  if(hurdleGroup.isTouching(boy)){
    gameState = "end";
  }
  }else if(gameState == "end"){

  ground1.velocityX = 0;
  background1.velocityX = 0;
  boy.velocityY = 0;
  hurdleGroup.setVelocityXEach(0);
  hurdleGroup.setLifetimeEach(-1);
  medalGroup.setVelocityXEach(0);
  medalGroup.setLifetimeEach(-1);
  gameOver = createSprite(700,325,100,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.5;

  }

  if(medalGroup.isTouching(boy)){
    score++
    medalGroup.destroyEach();
  }

   drawSprites();

   textSize(50);
  fill("black");
  text("score :"+score,500,50);
  
}

function spawnHurdles() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
     hurdle = createSprite(width,height-1000);
    hurdle.y = Math.round(random(500,650));
    hurdle.addImage(hurdleImg);
    hurdle.velocityX = -5;
    
     //assign lifetime to the variable6
    
    //adjust the depth
    hurdle.depth = boy.depth;
    hurdle.depth = boy.depth + 1;
    
    var r = Math.round(random(1,3))
    switch(r){
      case 1 :
        hurdle.scale = 0.8;
        break;

        case 2 :
          hurdle.scale = 1;
          break;

          case 3 :
            hurdle.scale = 1.2;
            break;

    }
    console.log(r);
    //adding cloud to the group
   hurdleGroup.add(hurdle);

   
    }
}

function spawnMedals() {
  //write code here to spawn the clouds
  if (frameCount % 400 === 0) {
     medal = createSprite(width,height-1000);
    medal.y = Math.round(random(300,100));
    medal.addImage(medalImg);
    medal.scale = 0.25;
    medal.velocityX = -3;
    
     //assign lifetime to the variable6
    
    //adjust the depth
    medal.depth = boy.depth;
    medal.depth = boy.depth + 1;
    
    //adding cloud to the group
   medalGroup.add(medal);

   
    }
}


