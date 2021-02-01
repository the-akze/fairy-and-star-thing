var END = 0;
var PLAY = 1;
var gameState;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

var fairy, f1, f2;

var bg, bgImg;

var star, visStar, starImg;

var SPEED = 5;

var music;

function preload()
{
  f1 = loadImage("fairy1.png");
  f2 = loadImage("fairy2.png");

  bgImg = loadImage("starnight.png");

  starImg = loadImage("star.png");

  music = loadSound("JoyMusic.mp3");
}

function setup() {
  createCanvas(833, 833);
  bg = createSprite(417, 417);
  bg.addImage("bg", bgImg);
  bg.scale = 0.5;
  
  fairy = createSprite(200, 600);
  fairy.addAnimation("f", f1, f2);
  fairy.scale = 0.2;
  fairy.setCollider("circle", 98/fairy.scale, -7/fairy.scale, 15/fairy.scale);

  engine = Engine.create();
  world = engine.world;

  star = Bodies.rectangle(700,100,50,50,{airFriction:0.01});
  World.add(world,star);

  visStar = createSprite(star.position.x, star.position.y);
  visStar.addImage("s", starImg);
  visStar.scale = 0.3;
  visStar.setCollider("circle", 0, 0, 35/visStar.scale)

  gameState = PLAY;

  music.setVolume(0.4);
  music.play();
}


function draw() {
  background("black");
  
  if (gameState == PLAY)
  {
    fairy.x += ((keyDown("right")?1:0) - (keyDown("left")?1:0)) * SPEED;
    visStar.rotation += 5;
    
    if (keyWentDown("down"))
    {
      gameState = END;
      star.velocity.y = 0;
    }
  }
  
  if (gameState == END)
  {
    Engine.update(engine);
    
    if (visStar.isTouching(fairy))
    {
      star.isStatic = true;
      star.position.x = fairy.x + 98;
      star.position.y = fairy.y -7;
    }
  }

  visStar.x = star.position.x;
  visStar.y = star.position.y;

  if (keyWentDown("space"))
  {
    reset();
  }

  if (star.position.y < 100)
  {
    star.velocity.y = 0;
    star.position.y = 100;
  }

  star.velocity.x = 0;
  star.position.x = 700;
  
  drawSprites();

  fill("yellow");
  textSize(20);
  text("Space = restart", 50, 50);
  text("Down arrow = make star fall", 50, 100);
}

function reset()
{
  fairy.x = 200;
  star.isStatic = false;
  star.velocity.x = 0;
  star.velocity.y = 0;
  star.position.y = 100;
  gameState = PLAY;
}
