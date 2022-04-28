class star { //class for all objects in backround, stars, etc
  constructor(x, y, type, color, next = null) {
    this.x = x; //x position
    this.y = y; //y position
    this.type = type; //type of entity
    this.color = color; //main color of entity
    this.next = next; //next entity, for linked list operations
  }
  draw(){ //draw each star to the screen!
    fill(this.color);
    noStroke();
    var effX = (this.x - screenX) * pixelSize; //effective x value to draw star
    var effY = (this.y - screenY) * pixelSize; //effective y value
    if(effX < 0){ //screen wrap logic
      effX += vSphereSize * pixelSize;
    }
    if(effY < 0){
      effY += vSphereSize * pixelSize;
    }
    rect(effX, effY, pixelSize, pixelSize);
  }
}

class extra { //class for all objects in backround, stars, etc
  constructor(x, y, sprite, color, next = null) {
    this.x = x; //x position
    this.y = y; //y position
    this.sprite = sprite > nPngs ? loadImage('assets/gif/' + (sprite - nPngs) + '.gif') : loadImage('assets/png/' + sprite + '.png'); //type of entity
    this.color = color; //main color of entity
    this.next = next; //next entity, for linked list operations
  }
  draw(){ //draw each extra object to the screen!
    var effX = (this.x - screenX) * pixelSize; //effective x value to draw star
    var effY = (this.y - screenY) * pixelSize; //effective y value

    image(this.sprite, effX, effY);
    if(effX < 0 || effY < 0){
    image(this.sprite, effX + (vSphereSize * pixelSize), effY);
    image(this.sprite, effX, effY + (vSphereSize * pixelSize));
    image(this.sprite, effX + (vSphereSize * pixelSize), effY + (vSphereSize * pixelSize));
  }
  }
}

//variables for the background
let pixelSize = 7; //size of pixels in background/ star map
let vSphereSize = Math.floor((1600/pixelSize) * 3); //how big is the square star map?
let sparsity = 500; //controls how many objects there are total
let entities; //array to hold stars/ entities in map
let extras; //array to hold stars/ entities in map

//new values for user controlled "warping"
let newPixelSize = 7; //4 to 10
let newFOV = 1600; //400 to 1600
let newVSphereSize = (newFOV/newPixelSize) * 3; //this must update with user input
let newSparsity = 500; //250 to 1400
let newNExtras = 10; //0 to 40
let np1 = 0; //np1 = nothing parameter 1 (does nothing!)
let np2 = 0;

let nExtras = 10;

let smoothStop = false;
let autoPan = true;
let fineAdjust = 5;
let xoff = 0;

//let planetArray;
let frameArray;

//variables for the 'camera'
let screenX = 0; //between 0 and the virtual sphere size
let screenY = 0; //likewise

//variables for panning/ pan velocity
let velX = 0;
let velY = 0;

//let debug = true; //debug boolean, sets screen size to equal to hardware screen size for use with online editor
let hud = false; //hud default state
let info = false; //info panel default state
let paused = false; //pause default state
let debug = false; //sets screen size to LVS monitor dimensions
let hudWidth = 0; //initialize variable for width of the hud (set in setup)
let keyWidth;
let fontOxy;
let keyCream;
let keyGrey;

//##TODO##~~~~~~~~~~~~~~~~~~~ Sketch variables go here!
let nPngs = 57;
let nGifs = 16;

function preload() {
  frameArray = new Array(loadImage('assets/frame corner.png'),loadImage('assets/frame corner2.png'),
                        loadImage('assets/frame corner3.png'),loadImage('assets/frame corner4.png'),);

}

function setup() {
  frameRate(32); //base framerate is set to 32, can be changed for a given sketch, so long as the pi can handle it.
  createCanvas(windowWidth, windowHeight);
  hudWidth = Math.min(1024, width); //set the width of the hud to the screen width if below 1024px
  keyWidth = hudWidth / 13;
  if (debug) {
    width = 1024; //set the width and height of the screen to match the display
    height = 1280;
  }
  fontOS = loadFont('../../fonts/OpenSans-Medium.ttf');
  keyCream = color(235, 235, 215);
  keyGrey = color(10, 10, 10);
  textFont(fontOS);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch setup goes here!
  //randomize();
  np1 = Math.floor(random(-120, 120)); //np1 = nothing parameter 1 (does nothing!)
  np2 = Math.floor(random(-120, 120));
  populate();

}

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused) {
    text("Paused", 50, 50);
    return;
  }
  background(15); //space!

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch logic goes here!


  //wrap logic!
  if(screenX > vSphereSize){
    screenX = 0;
  }
  if(screenX < 0){
    screenX = vSphereSize;
  }
  if(screenY > vSphereSize){
    screenY = 0;
  }
  if(screenY < 0){
    screenY = vSphereSize;
  }

  //draw the stars to the screen!!
  //console.log(screenX, vSphereSize);
  for(var cnt = Math.floor(screenX) ; cnt < Math.floor(screenX + width); cnt++){
    var ptr = (cnt > vSphereSize) ? entities[cnt - vSphereSize] : entities[cnt];
    while(ptr != null){
      ptr.draw();
      ptr = ptr.next;
    }
  }

  for(var i = 0; i < nExtras; i++){
    extras[i].draw();
  }

  //velocity control!!
  if (smoothStop){
    velX = velX * 0.8;
    velY = velY * 0.8;
    if( velX == 0 && velY == 0){
      smoothStop = false;
    }
  }
  if(autoPan){ //if autopilot is on, adjust velocities accordingly
    velX = map(noise(xoff),0,1,-2.5,2.5);
    velY = map(noise(xoff + 1),0,1,-2.5,2.5);
  }
  screenX += velX;
  screenY += velY;

  drawFrame();
  xoff += 0.001;

  push(); //store sketch specific drawing settings
  if (info) {
    drawInfo();
  } //call the function that draws the info pane, if the info variable is true. Must come at the end of the draw function.
  if (hud || info) {
    translate((width-hudWidth)/2, 0);
    drawHud();
  } //call the function that draws the hud, if the hud or info variable is true. Must come at the end of the draw function.
  pop(); //restore sketch specific drawing settings
}

function keyPressed() {
  //keypress handler.
  if (paused && keyCode != 69) {
    //Pause Logic: ensure that key states can't be changed while the sketch is paused
    return;
  }
  switch (
    keyCode //switch case for performing correct action. See this link for finding keyCodes: https://keycode.info/
  ) {
    //first bank of keys
    case 81: //Q (Toggle HUD)
      hud = !hud; //swap the value of the hud variable when the 'A' Key is pressed.
      break;
    case 87: //W (Home)
      window.location.href = "../../index.html"; //redirect current page to sketch 0, the home menu
      break;
    case 69: //E (Pause)
      paused = !paused;
      break;
    case 82: //R (Next Sketch)
      window.location.href = "../02-goodMorning/02-goodMorning.html"; //redirect current page to sketch 1, a test sketch
      break;
    //Volume Up (handled by OS)
    case 65: //A (Toggle Info)
      info = !info;
      break;
    case 83: //S (Randomize Sketch Variables, must be implemented per sketch)
      randomize();
      break;
    //Refresh/reset (handled by OS)
    case 70: //F (Previous Sketch)
      window.location.href = "../../index.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
      break;
    //Volume Dn (handled by OS)

    //encoders
    //encoder 0
    case 49: //1 (np1-)
      np1--;
      break;
    case 50: //2 (np1+)
      np1++;
      break;
    case 90: //Z (np1 = 0)
      np1 = 0;
      break;

    //encoder 1
    case 51: //3 (new pixel size)
      newPixelSize--;
      newPixelSize = (newPixelSize < 4) ? 4: newPixelSize;
      newVSphereSize = (newFOV/newPixelSize) * 3;
      break;
    case 52: //4 ()
      newPixelSize++;
      newPixelSize = (newPixelSize > 10) ? 10: newPixelSize;
      newVSphereSize = (newFOV/newPixelSize) * 3;
      break;
    case 88: //X ()
      newPixelSize = pixelSize;
      newVSphereSize = (newFOV/newPixelSize) * 3;
      break;

    //encoder 2 ()
    case 53: //5 ()
      break;
    case 54: //6 ()
      break;
    case 67: //C ()
      break;

    //encoder 3 (new FOV)
    case 55: //7 ()
      newFOV -= 100;
      newFOV = (newFOV < 400) ? 400: newFOV;
      newVSphereSize = (newFOV/newPixelSize) * 3;
      break;
    case 56: //8 ()
      newFOV += 100;
      newFOV = (newFOV > 1600) ? 1600: newFOV;
      newVSphereSize = (newFOV/newPixelSize) * 3;
      break;
    case 86: //V ()
      newFOV = 1600;
      newVSphereSize = (newFOV/newPixelSize) * 3;
      break;

    //encoder 4
    case 57: //9 ()
      newSparsity -= 50;
      newSparsity = (newSparsity < 250) ? 250: newSparsity;
      break;
    case 48: //0 ()
      newSparsity += 50;
      newSparsity = (newSparsity > 1400) ? 1400: newSparsity;
      break;
    case 66: //B ()
      newSparsity = sparsity;
      break;

    //encoder 5 (how many planets)
    case 173: //- ()
      newNExtras--;
      newNExtras = (newNExtras < 0) ? 0: newNExtras;
      break;
    case 61: //= ()
      newNExtras++;
      newNExtras = (newNExtras > 40) ? 40: newNExtras;
      break;
    case 87: //B ()
      newNExtras = nExtras;
      break;

    //second bank of keys:
    case 89: //Y (AutoPan!)
      autoPan = !autoPan;
      smoothStop = false;
      break;
    case 85: //U (toggle fine thrusters)
      fineAdjust = (fineAdjust == 5) ? 1 : 5 ;
      break;
    case 73: //I (pan up)
      autoPan = false;
      //screenY-=1;
      smoothStop = false;
      velY-=fineAdjust;
      break;
    case 79: //O (WARP!!!!!!) Put the user defined system values into the real parameters, and repopulate the system!
      pixelSize = newPixelSize;
      vSphereSize = newVSphereSize;
      sparsity = newSparsity;
      nExtras = newNExtras;

      velX = 0;
      velY = 0;
      autoPan = true;
      xoff = 0;
      populate();
      break;
    case 80: //P ()
      break;
    case 72: //H (Stop (smoothed))
      smoothStop = true;
      autoPan = false;
      break;
    case 74: //J (pan left)
      autoPan = false;
      //screenX-=1;
      smoothStop = false;
      velX-=fineAdjust;
      break;
    case 75: //K (pan down)
      autoPan = false;
      //screenY+=1;
      smoothStop = false;
      velY+=fineAdjust;
      break;
    case 76: //L (pan right)
      autoPan = false;
      //screenX+=1;
      smoothStop = false;
      velX+=fineAdjust;
      break;
    case 59: //; ()
      break;
    default:
      return false;
  }
}

function drawHud() {
  //function for drawing the hud, and showing key
  //rect(0, height - keyWidth * 2, hudWidth, keyWidth * 2);//main hud rectangle
  strokeWeight(1.5);
  textFont(fontOS);
  textSize(14);
  //draw system control keys
  //keys are drawn by drawKey method. Parameters: x positon, y position, label, state, fill, stroke
  drawKey(0, height - keyWidth * 2, "Overlay:", hud.toString(), keyCream, keyGrey); //Key 0 (Toggle Hud)
  drawKey(keyWidth, height - keyWidth * 2, "Home", "", keyCream, keyGrey); //Key 1 (Home)
  drawKey(keyWidth * 2, height - keyWidth * 2, "Pause", "", keyCream, keyGrey); //Key 2 (Pause)
  drawKey(keyWidth * 3, height - keyWidth * 2, "Next Sketch", "", keyCream, keyGrey); //Key 3 (Next Sketch)
  drawKey(keyWidth * 4, height - keyWidth * 2, "Vol +", "", keyCream, keyGrey); //Key 4 (Volume Up)
  drawKey(0, height - keyWidth, "Info:", info.toString(), keyCream, keyGrey); //Key 5 (Toggle Info)
  drawKey(keyWidth, height - keyWidth, "Shuffle Params", "", keyCream, keyGrey); //Key 6 (Randomize Variables)
  drawKey(keyWidth * 2, height - keyWidth, "Reset Sketch", "", keyCream, keyGrey); //Key 7 (Reset Sketch)
  drawKey(keyWidth * 3, height - keyWidth, "Previous Sketch", "", keyCream, keyGrey); //Key 8 (Previous Sketch)
  drawKey(keyWidth * 4, height - keyWidth, "Vol -", "", keyCream, keyGrey); //Key 9 (Volume Down)

  //draw sketch control keys
  //keys are drawn by drawKey method. Parameters: x positon, y position, label, state, fill, stroke
  drawKey(keyWidth * 8, height - keyWidth * 2, "Toggle AutoPilot", "", keyCream, keyGrey); //Key 10 ()
  drawKey(keyWidth * 9, height - keyWidth * 2, "Toggle Fine Thrusters", "", keyCream, keyGrey); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "Up Thruster", "", keyCream, keyGrey); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "Warp", "", keyCream, keyGrey); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 14 ()
  drawKey(keyWidth * 8, height - keyWidth, "Inertia Damper", "", keyCream, keyGrey); //Key 15 ()
  drawKey(keyWidth * 9, height - keyWidth, "Left Thruster", "", keyCream, keyGrey); //Key 16 ()
  drawKey(keyWidth * 10, height - keyWidth, "Down Thruster", "", keyCream, keyGrey); //Key 17 ()
  drawKey(keyWidth * 11, height - keyWidth, "Right Thruster", "", keyCream, keyGrey); //Key 18 ()
  drawKey(keyWidth * 12, height - keyWidth, "", "", keyCream, keyGrey); //Key 19 ()

  //draw sketch control knobs
  //knobs are drawn by drawKnob method. Parameters: x positon, y position, label, value, state, fill, stroke
  drawKnob(keyWidth * 5, height - keyWidth * 2, "", np1, "", keyCream, keyGrey); //Knob 0 ()
  drawKnob(keyWidth * 6, height - keyWidth * 2, "", newPixelSize, "", keyCream, keyGrey); //Knob 1 ()
  drawKnob(keyWidth * 7, height - keyWidth * 2, "", Math.floor(newVSphereSize), "", keyCream, keyGrey); //Knob 2 ()
  drawKnob(keyWidth * 5, height - keyWidth, "", newFOV, "New FOV", keyCream, keyGrey); //Knob 3 ()
  drawKnob(keyWidth * 6, height - keyWidth, "", newSparsity, "N Stars", keyCream, keyGrey); //Knob 4 ()
  drawKnob(keyWidth * 7, height - keyWidth, "", newNExtras, "N Planets", keyCream, keyGrey); //Knob 5 ()
}

function drawInfo() {
  strokeWeight(1.5);
  textFont(fontOS);
  textSize(25);
  fill(keyCream);
  stroke(keyGrey);
  rectMode(CENTER);
  rect(width * 0.5, height * 0.45, hudWidth * 0.8, height * 0.66, 2);
  rectMode(CORNER);
  stroke(keyCream);
  fill(keyGrey);
  text("Welcome Aboard", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(16);
  text(
    "Adrift in space, there is nothing left to do but enjoy the view. On this ship, so far from any other life, we might as well be alone in the universe. The life support and autopilot systems are still functioning, and so are the thrusters and warp drive. \n\nAutopilot:\nThe autopilot system will orient the ship automatically to provide lovely views.\n\nThrusters:\nFiring the thrusters for manual control will accelerate the spin of the craft in the selected direction. Use the fine thrusters toggle for more precise input.\n\nInertia Dampener:\nTo stop spinning, activate the Inertia Dampener, which will automatically fire the thrusters to bring you to a smooth stop.\n\nWarp & System Selection.\nThe knobs at the input panel display: NP1, Star Scale, Scene Scale, FOV, Star Scarcity, and Planet Density respectively. Choosing these values and then pressing the warp button will engage the Warp Drive, and deliver you to the nearest system with your selected parameters.\n\nThe NP1 control is too dangerous to be tampered with, so don't touch it unless you know what you're doing. Star Scale controls the size of the stars in the background, while Scene Scale displays the size of the entire looping background. Increasing FOV increases the Scene Scale. Increasing the Star Scarcity will make the background more sparse, and the number of planets is directly controlled by the Planet Density control.",
    (width * 0.5) - (hudWidth * 0.35),
    height * 0.21,
    (hudWidth * 0.7),
    height * 0.55
  );
}

function drawKey(posX, posY, var_name, state, keyFill, keyStroke) {
  fill(keyFill);
  stroke(keyStroke);
  square(posX, posY, keyWidth, keyWidth * 0.13);
  square(posX + 0.11 * keyWidth, posY + 0.08 * keyWidth, 0.78 * keyWidth, 2);
  noStroke();
  fill(keyStroke);
  text(
    var_name + "\n\n" + state,
    posX + 0.13 * keyWidth,
    posY + 0.09 * keyWidth,
    keyWidth * 0.76,
    keyWidth * 0.78
  );
}

function drawKnob(posX, posY, var_name, value, state, knobFill, knobStroke) {
  fill(knobFill);
  stroke(knobStroke);
  circle(posX + 0.5 * keyWidth, posY + 0.5 * keyWidth, 0.55 * keyWidth);
  circle(posX + 0.5 * keyWidth, posY + 0.5 * keyWidth, 0.43 * keyWidth);
  noStroke();
  fill(knobStroke);
  text(var_name, posX + 0.02 * keyWidth, posY + 0.01 * keyWidth, keyWidth * 0.98, keyWidth * 0.98);
  textAlign(CENTER);
  text(value, posX + 0.365 * keyWidth, posY + 0.37 * keyWidth, keyWidth * 0.3, keyWidth * 0.3);
  textAlign(LEFT);
  text(state, posX + 0.02 * keyWidth, posY + 0.76 * keyWidth, keyWidth * 0.98, keyWidth * 0.98);
}

function randomize() {
//function called by the randomize values key: must be filled with sketch specific variables
  pixelSize = Math.floor(random(6,10));
  sparsity = Math.floor(random(250,1400));
  nExtras = Math.floor(random(0,30));
  newFOV = 1000;
  vSphereSize = Math.floor((newFOV/pixelSize) * 3);

  newPixelSize = pixelSize;
  newSparsity = sparsity;
  newNExtras = nExtras;
  newVSphereSize = vSphereSize;

  velX = 0;
  velY = 0;
  autoPan = true;
  xoff = 0;
  populate();
}

function populate(){//this function populates the celestial object array, and must be called to refresh the background!
  entities = new Array(256 * 3); //remake the entities array to reload the background entirely
  extras = new Array(nExtras); //make the extras array
  var x = 0;
  var y = Math.floor(random(10,sparsity));
  while(x < vSphereSize){
    y += Math.floor(random(10,sparsity));
    if(y > vSphereSize){
      x = Math.floor(x + (y / vSphereSize));
      y = y % vSphereSize;
    }
    if(entities[x] == null){
    entities[x] = new star(x, y, 1, random(0,255));
    }else{
      var ptr = entities[x];
      while(ptr.next != null){
            ptr = ptr.next;
      }
      ptr.next = new star(x, y, 1, random(0,255));
    }
  }

  for(var i = 0;i < nExtras;i++){
    extras[i] = new extra(Math.floor(random(0, vSphereSize)), Math.floor(random(0, vSphereSize)), Math.floor(random(1,nPngs + nGifs)), null);
  }
}

function swatchable(fam) { //family 0 = red tones, 1 = green, 2 = blue
  var red = fam == 0 ? 255 : random(0, 200);
  var green = fam == 1 ? 255 : random(0, 200);
  var blue = fam == 2 ? 255 : random(0, 200);
  return color(red, green, blue);
}

function swatchable_pastel(fam) { //family 0 = red tones, 1 = green, 2 = blue
  var red = fam == 0 ? 255 : random(140, 250);
  var green = fam == 1 ? 255 : random(140, 250);
  var blue = fam == 2 ? 255 : random(140, 250);
  return color(red, green, blue);
}

function drawFrame(){
  push();
  rectMode(CORNERS);
  strokeWeight(20);
  noFill();
  stroke(139, 155, 180);
  rect(0 + 60, 0 + 60, width - 60, height - 60);
  stroke(90, 105, 136);
  rect(0 + 50, 0 + 50, width - 50, height - 50);
  stroke(58, 68, 102);
  rect(0 + 40, 0 + 40, width - 40, height - 40);
  rect(0 + 30, 0 + 30, width - 30, height - 30);
  stroke(139, 155, 180);
  rect(0 + 10, 0 + 10, width - 10, height - 10);
  stroke(38, 43, 68);
  rect(0, 0, width, height);

  pop();
  image(frameArray[0],0,0);
  image(frameArray[1],width - 260, 0);
  image(frameArray[2],0,height - 210);
  image(frameArray[3],width - 260,height - 210);

}
