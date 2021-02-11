var ballon,database,position
function preload(){
  bg=loadImage("empty img.png");
  ballonImage1=loadAnimation("Hot Air Ballon-01.png");
  ballonImage2=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}
function setup() {
  database=firebase.database;
  createCanvas(1500,700);
  ballon=createSprite(250, 600, 150, 150);
  ballon.addAnimation(ballonImage1);
  ballon.scale=0.5;
  var ballonHeight=database.ref("ballon/height");
  ballonHeight.on("value",readHeight,showError);
}

function draw() {
  background(bg); 

  textSize(20);
  //fill("red");
  //stroke()

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    ballon.addAnimation(ballonImage2);
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    ballon.addAnimation(ballonImage2);
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    ballon.addAnimation(ballonImage2);
    ballon.scale=ballon.scale-0.005

  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    ballon.addAnimation(ballonImage2);
    ballon.scale=ballon.scale+0.005
  }


  drawSprites();
}
function readHeight(data){
  height=data.val();
  ballon.x=height.x;
  ballon.y=height.y;
  }
  
  function updateHeight(x,y){
      database.ref("ballon/height").set({
          x:height.x+x,
          y:height.y+y
      })
  }
  
  function showError()
  {
      console.log("error in db");
  }