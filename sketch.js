var player , playerImg;
var backGround , backGroundImg;
var invisibleG;
var coin , coinImg , coinG;
var score , playingSince;
var coinSound , checkPointSound;

function preload()
{
 playerImg = loadImage("running.gif"); 
  
 backGroundImg = loadImage("background.jpg");
  
 coinImg = loadImage("coin.png");
  
 coinSound = loadSound("coin_sound.wav"); 

 checkPointSound = loadSound("checkpoint.wav")
}

function setup() 
{
 createCanvas(500,250);
  
  coinG = new Group();
  
  backGround = createSprite(250,125);
  backGround.addImage("backGroundImage",backGroundImg);
  backGround.velocityX = -2;
  backGround.x = backGround.width/2;
  
  invisibleG = createSprite(250,240,500,10);
  invisibleG.visible = false;
  
  player = createSprite(70,190,50,50);
  player.addImage("player_running",playerImg);
  player.scale = 0.1; 
  //player.debug = true;
  player.setCollider("rectangle",0,0,450,900);
  
  score = 0;
  
  playingSince = 0;
}

function draw() 
{
 background(0);
  
  playingSince = Math.ceil(frameCount/frameRate()) 
  
  if(keyDown("space") && player.y >=190)
  {
   player.velocityY = -16;
  }
  
  player.velocityY = player.velocityY +0.8; 
  
  if (backGround.x < 250)
    {
      backGround.x = backGround.width/2;
    }
  
  if(coinG.isTouching(player))
  {
   coinSound.play();
   coinG.destroyEach();
   score = score + 2;
  }
  
  if(playingSince>0 && playingSince%100 === 0)
  { 
   checkPointSound.play();      
  }
  
  spawnCoins();
  
  player.collide(invisibleG);
  
  drawSprites();
  stroke("black");
  fill("black");
  textSize(20);
  text("Score: "+ score,409,20);
  
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Playing Since: "+ playingSince,340,40);
}


function spawnCoins()
{
 if (frameCount % 150 === 0)
 {
  coin = createSprite(500,50,20,20);
  coin.addImage("coins",coinImg); 
  coin.scale = 0.2;
  coin.y =  Math.round(random(50,150)); 
  coin.velocityX = -3;
   
  coinG.add(coin); 
 } 
}