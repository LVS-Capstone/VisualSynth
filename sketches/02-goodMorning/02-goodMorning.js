class level{
  constructor(bg = 'assets/toilet.png', fg = null, weapon = 'assets/ketchup.png', hitbox, stream = color(251, 242, 54), splash = color(255, 250, 139), splrite = 'assets/hotdog_splrite.png', music = null, sfx = null){
    this.bg = loadImage(bg);
    if(fg != null){
      this.fg = loadImage(fg);
    }
    if(weapon == null){
      this.weapon = loadImage('assets/3/censored.gif');
    }else{
      this.weapon = loadImage(weapon);
    }
    if(splrite == null){ //sprite that hits the dopamine button!!
      this.splrite = loadImage('assets/empty.png');
    }else{
      this.splrite = loadImage(splrite);
    }
    this.hitbox = hitbox;
    this.stream = stream;
    streamColor = stream;
    this.splash = splash;
    this.music = music;
    this.sfx = sfx;
  }

  draw(){
    //draw the bg
    image(this.bg, (width - (height * 0.804))/2 , 0, height * 0.804, height);

    tint(255, (success - 200) * 0.35);
    image(this.splrite, (width - (height * 0.804))/2 , 0, height * 0.804, height);
    noTint();

    //draw the fg, if applicable, and update the hitbox
    if(currentLevel == 1 || currentLevel == 8){
      fgX = map(noise(xoff + 2), 0, 1, width/2 - height * 0.33, width/2 + height * 0.33);
      fgY = map(noise(xoff + 1), 0, 1, height * 0.136, height * 0.65);
      imageMode(CENTER);
      image(this.fg, fgX, fgY , height * 0.273, height * 0.273);
      imageMode(CORNER);
      this.hitbox = [fgX - height * 0.136,fgY - height * 0.136,fgX + height * 0.136,fgY + height * 0.136];
       }

    //draw the stream, update the stream.
    push();
    rectMode(CENTER);
    imageMode(CENTER);
    fill(this.stream);
    noStroke();
    var curDrop = lastDrop;
    while(curDrop != null){
      rect(curDrop.px, curDrop.py, dropSize, dropSize);
      if(curDrop.pz <= 0){
        curDrop.vx = 0;
        curDrop.vy = 0;
        //curDrop.next = null;

        if(curDrop.pz == 0){ //for newly hit particles only
          if(curDrop.px >= this.hitbox[0] && curDrop.py >= this.hitbox[1] &&
            curDrop.px <= this.hitbox[2]  && curDrop.py <= this.hitbox[3]){ //if the current drop has collided with the ground plane, check if it collided within the bounds of the hitbox
           success += 2.5; //if it was within the hitbox, increase the success, else, decrease
          }else{
            success -= 4.5;
          }
        }else{
          //image(this.splrite ,curDrop.px, curDrop.py, dropSize * 8, dropSize * 8);
          if(curDrop.pz <= -160)
            curDrop.next = null;
        }
      }
      curDrop.update();
      curDrop = curDrop.next;
    }

    if(flowControl){
    dropTmp = lastDrop;
    lastDrop = new peeDrop(streamForce * sin(weaponAngle) * random(0.95,1.1), -streamForce * cos(weaponAngle) * random(0.9,1.1), -20, WTX, WTY, 600, dropTmp);
    }


    //draw the 'weapon'
    push();
    imageMode(CENTER);
    angleMode(DEGREES);
    translate(width/2 ,height * 0.95);
    rotate(weaponAngle);
    image(this.weapon, 0, 0, height * 0.164, height * 0.375);

    pop();

    //draw the success bar
    rectMode(CORNERS);
    noFill();
    strokeWeight(10);
    stroke(this.splash);
    rect((width + (height * 0.804 * 0.85))/2 , height * 0.15, (width + (height * 0.804 * 0.95))/2 , height * 0.85);
    fill(success >= 200 ? this.stream : lerpColor(this.stream, color(255,0,0), map(success, 160, 0, 0, 1)));
    rect((width + (height * 0.804 * 0.85))/2 , map(success, 0, 1000, height * 0.85, height * 0.15), (width + (height * 0.804 * 0.95))/2 , height * 0.85);

    //test: force bar
    noFill();
    stroke(this.splash);
    rect((width - (height * 0.804 * 0.85))/2 , height * 0.15, (width - (height * 0.804 * 0.95))/2 , height * 0.85);
    fill(this.stream);
    rect((width - (height * 0.804 * 0.85))/2 , map(streamForce, -0.5, 25.5, height * 0.85, height * 0.15), (width - (height * 0.804 * 0.95))/2 , height * 0.85);

    //noFill();
    //rect(this.hitbox[0], this.hitbox[1], this.hitbox[2], this.hitbox[3]); //draw the hitbox, for debugging/cheating

    pop();
  }
}

class peeDrop{
  constructor(vx, vy, vz = -10,px, py, pz, next = null){
    this.vx = vx; //velocity in x direction
    this.vy = vy; //velocity in y direction
    this.vz = vz; //z velocity
    this.px = px; //x position
    this.py = py;
    this.pz = pz;
    this.next = next; //next drop, for linked list ops
  }
  update(){
    this.vx += ax;
    this.px += this.vx;
    this.vy += ay;
    this.py += this.vy;
    this.pz += this.vz;
  }
}

//let debug = true; //debug boolean, sets screen size to equal to hardware screen size for use with online editor
let hud = false; //hud default state
let info = true; //info panel default state
let paused = false; //pause default state
let debug = false; //sets screen size to LVS monitor dimensions
let hudWidth = 0; //initialize variable for width of the hud (set in setup)
let keyWidth;
let fontOxy;
let keyCream;
let keyGrey;

//##TODO##~~~~~~~~~~~~~~~~~~~ Sketch variables go here!
let levelArray;
let currentLevel = 3; //store the index in levelArray of the starting level.
let streamColor;
let lastDrop = null;
let dropTmp = null;
let xoff = 0;

let fgX; //foreground sprite x value
let fgY; //foreground sprite y value

let success = 300; //pass/ fail bar, initial value
let flowControl = false; //boolean for whether or not you're peeing!
let streamForceAcc = 0; //acceleration value for stream force, change acceleration on key presses (i, k)

let weaponAngle = 0; //angle of stream particles
let weaponAngleVelocity = 0; //velocity of angle change, user controlled.
let streamForce = 13; //speed coefficient of stream particles
let WTX; //weapon tip x component
let WTY; //weapon tip y component

let ax = 0; //acceleration in x direction
let ay = 0; //acceleration in y direction
let dropSize; //pixel size for droplets
let pbg; //holder for startup background

function preload(){ //images and levels are pre-loaded here
pbg = loadImage('assets/3/toilet.png');
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
  //fontOS = loadFont('/fonts/OpenSans-Medium.ttf');
  keyCream = color(235, 235, 215);
  keyGrey = color(10, 10, 10);
  textFont(fontOS);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch setup goes here!
  dropSize = height/128;
  //level setup: background, foreground (target), weapon, hitbox, stream color, secondary color, sprite, music, sfx
    levelArray = new Array(
    new level('assets/0/toilet_bloody.png', null, 'assets/0/censored.gif', [ width/2 - (height * 0.253), height * 0.203, width/2 - (height * -0.239), height * 0.82], color(235, 0, 0), color(200, 10, 10), 'assets/0/toilet_bloody_splrite.png'),
    new level('assets/1/ghost_bg.png', 'assets/1/ghost_fg.png', 'assets/1/proton_pack.png', [ width/2 - (height * 0.402), height * 0, width/2 - (height * 0.019), height * 0.46], color(139, 217, 170), color(139, 217, 95), 'assets/1/ghost_splrite.png'),
    new level('assets/2/toilet_dirty.png', null, 'assets/2/censored.gif', [ width/2 - (height * 0.253), height * 0.203, width/2 - (height * -0.239), height * 0.82], color(234, 211, 44), color(113, 78, 44), 'assets/2/toilet_splrite.png'),
    new level('assets/3/toilet.png', null, 'assets/3/censored.gif', [ width/2 - (height * 0.253), height * 0.203, width/2 - (height * -0.239), height * 0.82], color(234, 232, 91), color(255, 247, 185), 'assets/3/toilet_splrite.png'),
    new level('assets/4/breakfast_note.png', null, 'assets/4/default.png', [ width/2 - (height * 0.292), height * 0.367, width/2 - (height * -0.036), height * 0.554], color(255, 0, 0), color(200, 10, 10), 'assets/4/breakfast_splrite.png'),
    new level('assets/5/carwash.png', null, 'assets/5/hose.png', [ width/2 - (height * 0.253), height * 0.57, width/2 - (height * -0.333), height * 0.804], color(63, 123, 171), color(198, 229, 255), 'assets/5/carwash_splrite.png'),
    new level('assets/6/gas_station.png', null, 'assets/6/gas_pump.png', [ width/2 - (height * 0.183), height * 0.609, width/2 - (height * 0.074), height * 0.71], color(255, 255, 192), color(163, 168, 161), 'assets/6/gas_station_splrite.png'),
    new level('assets/7/airfield.png', null, 'assets/7/pipette.png', [ width/2 - (height * -0.036), height * 0.531, width/2 - (height * -0.184), height * 0.656], color(167, 255, 32), color(164, 164, 163), 'assets/7/airfield_splrite.png'),
    new level('assets/8/bg.gif', 'assets/8/minble.gif', 'assets/8/jet_nose.png', [ width/2 - (height * 0.402), height * 0, width/2 - (height * 0.183), height * 0.359], color(206), color(156), null),
    new level('assets/you_win.png', null, 'assets/empty.png', [ 0, 0, 0, 0], color(0, 0, 0, 0), color(0, 0, 0, 0), null)
  );

  WTX = width * 0.5 - (height * 0.164 * cos(weaponAngle + 90)); //weapon tip x value
  WTY = height * (0.95 - (0.18 * sin(weaponAngle + 90))); //weapon tip y value

  //levelArray[currentLevel].draw();
    image(pbg, (width - (height * 0.804))/2 , 0, height * 0.804, height);
}

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused || info || hud) { //addl. pause logic, if the hud or info are up, pause the game
    if(info){
      drawInfo();
    }
    if(hud || info){
      translate((width-hudWidth)/2, 0);
      drawHud();
    }
    text("Paused", 50, 50);
    return;
  }
  background(36);


  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch logic goes here!
  levelArray[currentLevel].draw();
  xoff += 0.01;
  //angleMode(DEGREES);
  weaponAngle += weaponAngleVelocity;
  if(weaponAngle > 70){
    weaponAngle = 70;
    weaponAngleVelocity = -1;
  }
  if(weaponAngle < -70){
    weaponAngle = -70;
    weaponAngleVelocity = 1;
  }
  if (streamForce < 0){
    streamForce = 0;
  }
  if (streamForce > 25){
    streamForce = 25;
  }

  WTX = width * 0.5 - (height * 0.164 * cos(weaponAngle + 90)); //weapon tip x value
  WTY = height * (0.95 - (0.18 * sin(weaponAngle + 90))); //weapon tip y value
  //circle(WTX, WTY, 10);  //debug circle!

  //mess with the player
  //ax = random(-1,1);
  //ay = random(-1,1);
  weaponAngle += map(noise(xoff + 1), 0, 1, -0.5, 0.5);
  streamForce += map(noise(xoff), 0, 1, -0.05, 0.05) + streamForceAcc;


  if(success > 1000){
    lastDrop = null;
    flowControl = false;
    currentLevel++;
    success = 200;
     }else{
       if(success < 0){
        currentLevel = (currentLevel == 0) ? 0 : currentLevel - 1;
        success = 200;
        lastDrop = null;
        flowControl = false;
       }
     }


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

function keyReleased() {
  switch (
    keyCode
  ) {
    case 86: //V
      flowControl = false;
      break;
    case 74: //J
      weaponAngleVelocity = 0;
      break;
    case 76: //L
      weaponAngleVelocity = 0;
      break;
    case 73: //I
      streamForceAcc = 0;
      break;
    case 75: //K
      streamForceAcc = 0;
      break;
    case 90: //Z ()
      flowControl = false;
      break;
  }
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
      break;jjj
    case 87: //W (Home)
      window.location.href = "../../index.html"; //redirect current page to sketch 0, the home menu
      break;
    case 69: //E (Pause)
      paused = !paused;
      break;
    case 82: //R (Next Sketch)
      window.location.href = "../03-mandala/03-mandala.html"; //redirect current page to sketch 1, a test sketch
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
      window.location.href = "../01-spacePort/01-spacePort.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
      break;
    //Volume Dn (handled by OS)

    //encoders
    //encoder 0
    case 49: //1 ()
      streamForce -= 0.75 + random(-0.1,0.1);
      break;
    case 50: //2 ()
      streamForce += 0.75 + random(-0.1,0.1);
      break;
    case 90: //Z ()
      flowControl = true;
      break;

    //encoder 1
    case 51: //3 ()
      break;
    case 52: //4 ()
      break;
    case 88: //X ()
      break;

    //encoder 2
    case 53: //5 ()
      break;
    case 54: //6 ()
      break;
    case 67: //C ()
      break;

    //encoder 3
    case 55: //7 ()
      streamForce -= 0.75 + random(-0.1,0.1);
      break;
    case 56: //8 ()
      streamForce += 0.75 + random(-0.1,0.1);
      break;
    case 86: //V ()
      flowControl = true;
      break;

    //encoder 4
    case 57: //9 ()
      break;
    case 48: //0 ()
      break;
    case 66: //B ()
      break;

    //encoder 5
    case 173: //- ()
      break;
    case 61: //= ()
      break;
    case 87: //B ()
      break;

    //second bank of keys:
    case 89: //Y ()
      break;
    case 85: //U ()
      break;
    case 73: //I ()
      streamForceAcc += 0.25;// + random(-0.1,0.1);
      break;
    case 79: //O ()
      break;
    case 80: //P ()
      break;
    case 72: //H ()
      break;
    case 74: //J (subtract 5 from weapon angle velocity!)
      weaponAngleVelocity -= 2;// + random(-0.1,0.1);
      if (weaponAngleVelocity < -10){
        weaponAngleVelocity = -10;
      }
      break;
    case 75: //K ()
      streamForceAcc -= 0.25;// + random(-0.1,0.1);

      break;
    case 76: //L (add 5 to weapon angle velocity!)
      weaponAngleVelocity += 2;// + random(-0.1,0.1);
      if (weaponAngleVelocity > 10){
        weaponAngleVelocity = 10;
      }
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
  drawKey(keyWidth, height - keyWidth, "", "", keyCream, keyGrey); //Key 6 (Randomize Variables)
  drawKey(keyWidth * 2, height - keyWidth, "Reset Sketch", "", keyCream, keyGrey); //Key 7 (Reset Sketch)
  drawKey(keyWidth * 3, height - keyWidth, "Previous Sketch", "", keyCream, keyGrey); //Key 8 (Previous Sketch)
  drawKey(keyWidth * 4, height - keyWidth, "Vol -", "", keyCream, keyGrey); //Key 9 (Volume Down)

  //draw sketch control keys
  //keys are drawn by drawKey method. Parameters: x positon, y position, label, state, fill, stroke
  drawKey(keyWidth * 8, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 10 (Y)
  drawKey(keyWidth * 9, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 11 (U)
  drawKey(keyWidth * 10, height - keyWidth * 2, "Force +", "", keyCream, keyGrey); //Key 12 (I)
  drawKey(keyWidth * 11, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 13 (O)
  drawKey(keyWidth * 12, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 14 (P)
  drawKey(keyWidth * 8, height - keyWidth, "", "", keyCream, keyGrey); //Key 15 (H)
  drawKey(keyWidth * 9, height - keyWidth, "Aim Left", "", keyCream, keyGrey); //Key 16 (J)
  drawKey(keyWidth * 10, height - keyWidth, "Force -", "", keyCream, keyGrey); //Key 17 (K)
  drawKey(keyWidth * 11, height - keyWidth, "Aim Right", "", keyCream, keyGrey); //Key 18 (L)
  drawKey(keyWidth * 12, height - keyWidth, "", "", keyCream, keyGrey); //Key 19 (;)

  //draw sketch control knobs
  //knobs are drawn by drawKnob method. Parameters: x positon, y position, label, value, state, fill, stroke
  drawKnob(keyWidth * 5, height - keyWidth * 2, "Force", Math.floor(streamForce), "", keyCream, keyGrey); //Knob 0 ()
  drawKnob(keyWidth * 6, height - keyWidth * 2, "", 0, "", keyCream, keyGrey); //Knob 1 ()
  drawKnob(keyWidth * 7, height - keyWidth * 2, "", 0, "", keyCream, keyGrey); //Knob 2 ()
  drawKnob(keyWidth * 5, height - keyWidth, "Force", Math.floor(streamForce), "", keyCream, keyGrey); //Knob 3 ()
  drawKnob(keyWidth * 6, height - keyWidth, "", 0, "", keyCream, keyGrey); //Knob 4 ()
  drawKnob(keyWidth * 7, height - keyWidth, "", 0, "", keyCream, keyGrey); //Knob 5 ()
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
  text("Good Morning!", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(16);
  text(
    "It's a sunny summer morning in suburbia, time to get through that morning routine, put some ketchup on your hashbrowns, and crush your To-do list! YEEEEEEEEEEEAAAAAHHHH!!!\n\n\nControls\nAim left and right with the keys shown, or J and L on a keyboard.\n\nControl the force of your stream with either knob labeled 'Force' or with keys I and K on a keyboard. The status bar on the left of the screen shows the current stream force level.\n\nPress either force knob, or the Z key to engage your stream, and be careful not to make a mess.",
    (width * 0.5) - (hudWidth * 0.35),
    height * 0.21,
    (hudWidth * 0.7),
    height * 0.6
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
}
