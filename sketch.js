var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score =0;
var spookysound;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookysound = loadSound("spooky.wav")
}
function setup()
{
createCanvas(600,600)
tower = createSprite(300,300);
tower.addImage(towerImg);
  
ghost = createSprite(200,200,50,50);
ghost.addImage(ghostImg);
ghost.scale = 0.5;

doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();
}
function draw()
{
//background("white");
  
if(gameState === "play"){
spookysound.play();
  
score += Math.round(getFrameRate()/60)

tower.velocityY = 3;
  
if(tower.y>600){
tower.y = 300;
}
  
if(keyDown("space")){
ghost.velocityY = -8;
}
  
ghost.velocityY +=0.3;
  
if(keyDown("right")){
ghost.x +=3;
}
  
if(keyDown("left")){
ghost.x-=3;
}
  
if(climbersGroup.isTouching(ghost)){
ghost.velocityY = 0;
}
  
if(invisibleBlockGroup.isTouching(ghost)||(ghost.y>600)){
gameState = "end";
ghost.destroy();
}
  
spawn();
  
  
 drawSprites() ;

fill("red");
textSize(20);
text("score:"+score,200,100);
}

if(gameState === "end"){
background ("black");
stroke("yellow");
textSize (40);
text("gameover",150,200);
}
}

function spawn(){
if(frameCount%200===0){
door = createSprite(300,10,10,40);
door.addImage(doorImg);
door.velocityY = 1;
door.lifetime = 600;
doorsGroup.add(door);
door.x = Math.round(random(100,270))
climber = createSprite(300,60,10,30);
climber.addImage(climberImg);
climber.velocityY = 1;
climber.x = door.x;
climber.lifetime = 600;
climbersGroup.add(climber);
  
ghost.depth = door.depth;
ghost.depth+=1;

invisibleBlock = createSprite(300,80);
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.velocityY = 1;
invisibleBlock.x = door.x;
invisibleBlock.visible = false;
invisibleBlock.lifetime = 600;
invisibleBlockGroup.add(invisibleBlock);


  
}
}