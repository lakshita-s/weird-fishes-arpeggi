let inge;
const fontSize = 90;
let sample = 0.2;
let r = 0;
let hiArray;
let currentText = "weird fishes /arpeggi";
let img;
let song;

function preload() {
  inge = loadFont('SpecialElite-Regular.otf');
  img = loadImage('fishes.gif');
  song = loadSound('weirdfishes.mp3')
}

function setup() {
  createCanvas(500, 500);
  textFont(inge);
  textSize(fontSize);
  noFill();
  stroke("#ffc800");
  strokeWeight(2);
  textAlign(BASELINE,CENTER);
  imageMode(CENTER);
}


function mousePressed() {
  if (!song.isPlaying()) song.play();
}



function draw() {
  background(0, 46, 107);
    // background('#rgb(2,2,44))');


  push();
tint(255, 50); 
  image(img, width/2+10, width/2,600, 600)
  pop();
  
  //split lines by space
  let lines= currentText.split(" "); 
  
  let lineHeight = 100;
  let startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    let line = lines[lineNum];
    
    //centers each line using width and height values
    let textBounds = inge.textBounds(line, 0, 0, fontSize);
    let textX = width / 2 - textBounds.w / 2;
    let textY = startY + (lineNum * lineHeight);
    
    //converts each word into an array of points
    hiArray = inge.textToPoints(line, textX, textY, fontSize, {
      sampleFactor: sample
    });
    
    //the movement! using rotation 
    for (let i = 0; i < hiArray.length; i++) {
      push();
      translate(hiArray[i].x, hiArray[i].y);
      rotate(r);
      r += 0.08;
      triangle(0, 5, 10, 15, 8, 3);
      
      let d = dist(mouseX, mouseY, hiArray[i].x, hiArray[i].y);
      
      if (d > 200) {
        // stroke("#D38E0E");
        strokeWeight(1.5);
        bezier(85, 20, 10, 10, 90, 50, 15, 50);
      }
      
      pop();
    }
  }
}