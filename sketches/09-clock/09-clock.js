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
let hrHandColor;
let mnHandColor;
let secHandColor;
let backColor;

let showTime = false;

function setup() {
  frameRate(32); //base framerate is set to 32, can be changed for a given sketch, so long as the pi can handle it.
  createCanvas(windowWidth, windowHeight);
  hudWidth = Math.min(1024, width); //set the width of the hud to the screen width if below 1024px
  keyWidth = hudWidth / 13;
  if (debug) {
    width = 1024; //set the width and height of the screen to match the display
    height = 1280;
  }
  fontOS = loadFont("../../fonts/OpenSans-Medium.ttf");
  keyCream = color(235, 235, 215);
  keyGrey = color(10, 10, 10);
  textFont(fontOS);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch setup goes here!
  angleMode(DEGREES);

  hrHandColor = color(255, 170, 79);
  mnHandColor = color(56, 146, 255);
  secHandColor = color(255, 92, 92);
  backColor = color(255);
}

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused) {
    text("Paused", 50, 50);
    return;
  }

  background(backColor);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch logic goes here!

  let hr = hour();
  let mn = minute();
  let sc = second();

  strokeWeight(5);
  noFill();
  let secondAngle = map(sc, 0, 60, 0, 360);

  stroke(150, 100, 255);
  let minuteAngle = map(mn, 0, 60, 0, 360);

  stroke(150, 255, 100);
  let hourAngle = map(hr % 12, 0, 12, 0, 360);

  push();
  translate(windowWidth / 2, windowHeight / 2);
  rotate(secondAngle);
  stroke(secHandColor);
  line(0, -100, 0, 0);
  arc(0, 0, 300, 300, 0, secondAngle);
  pop();

  push();
  translate(windowWidth / 2, windowHeight / 2);
  rotate(minuteAngle);
  stroke(mnHandColor);
  line(0, -75, 0, 0);
  arc(0, 0, 280, 280, 0, minuteAngle);
  pop();

  push();
  translate(windowWidth / 2, windowHeight / 2);
  rotate(hourAngle);
  stroke(hrHandColor);
  line(0, -50, 0, 0);
  arc(0, 0, 260, 260, 0, hourAngle);
  pop();

  stroke(255);
  point(windowWidth / 2, windowHeight / 2);

  push();
  if (showTime) {
    stroke(255);
    fill(40);
    text(
      hr + ":" + mn + ":" + sc + "",
      windowWidth / 2 - 40,
      windowHeight / 2 - 250
    );
  }
  pop();

  push(); //store sketch specific drawing settings
  if (info) {
    drawInfo();
  } //call the function that draws the info pane, if the info variable is true. Must come at the end of the draw function.
  if (hud || info) {
    translate((width - hudWidth) / 2, 0);
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
      window.location.href = "../10-wave/10-wave.html"; //redirect current page to sketch 1, a test sketch
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
      window.location.href = "../08-music/08-music.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
      break;
    //Volume Dn (handled by OS)

    //encoders
    //encoder 0 Changes color from day-mode to night-mod
    case 49: //1 ()

      break;

    case 50: //2 ()

      break;

    case 90: //Z ()
      break;

    //encoder 1 Toggles to show time
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
      break;
    case 56: //8 ()
      break;
    case 86: //V ()
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
    case 89: //Y () switches to day-mode
      hrHandColor = color(255, 170, 79);
      mnHandColor = color(56, 146, 255);
      secHandColor = color(255, 92, 92);
      backColor = color(250);
      break;
    case 85: //U () switches to night-mode
      hrHandColor = color(55, 212, 79);
      mnHandColor = color(37, 77, 179);
      secHandColor = color(150);
      backColor = color(10);
      break;

    case 73: //I () toggle to show time
      showTime = !showTime;
      break;
    case 79: //O ()
      break;
    case 80: //P ()
      break;
    case 72: //H ()
      break;
    case 74: //J ()
      break;
    case 75: //K ()
      break;
    case 76: //L ()
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
  drawKey(
    0,
    height - keyWidth * 2,
    "Overlay:",
    hud.toString(),
    keyCream,
    keyGrey
  ); //Key 0 (Toggle Hud)
  drawKey(keyWidth, height - keyWidth * 2, "Home", "", keyCream, keyGrey); //Key 1 (Home)
  drawKey(keyWidth * 2, height - keyWidth * 2, "Pause", "", keyCream, keyGrey); //Key 2 (Pause)
  drawKey(
    keyWidth * 3,
    height - keyWidth * 2,
    "Next Sketch",
    "",
    keyCream,
    keyGrey
  ); //Key 3 (Next Sketch)
  drawKey(keyWidth * 4, height - keyWidth * 2, "Vol +", "", keyCream, keyGrey); //Key 4 (Volume Up)
  drawKey(0, height - keyWidth, "Info:", info.toString(), keyCream, keyGrey); //Key 5 (Toggle Info)
  drawKey(keyWidth, height - keyWidth, "Shuffle Params", "", keyCream, keyGrey); //Key 6 (Randomize Variables)
  drawKey(
    keyWidth * 2,
    height - keyWidth,
    "Reset Sketch",
    "",
    keyCream,
    keyGrey
  ); //Key 7 (Reset Sketch)
  drawKey(
    keyWidth * 3,
    height - keyWidth,
    "Previous Sketch",
    "",
    keyCream,
    keyGrey
  ); //Key 8 (Previous Sketch)
  drawKey(keyWidth * 4, height - keyWidth, "Vol -", "", keyCream, keyGrey); //Key 9 (Volume Down)

  //draw sketch control keys
  //keys are drawn by drawKey method. Parameters: x positon, y position, label, state, fill, stroke
  drawKey(
    keyWidth * 8,
    height - keyWidth * 2,
    "Night\nMode",
    "",
    keyCream,
    keyGrey
  ); //Key 10 ()
  drawKey(keyWidth * 9, height - keyWidth * 2, "Day\nMode", "", keyCream, keyGrey); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "Show\nTime", "", keyCream, keyGrey); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 14 ()
  drawKey(keyWidth * 8, height - keyWidth, "", "", keyCream, keyGrey); //Key 15 ()
  drawKey(keyWidth * 9, height - keyWidth, "", "", keyCream, keyGrey); //Key 16 ()
  drawKey(keyWidth * 10, height - keyWidth, "", "", keyCream, keyGrey); //Key 17 ()
  drawKey(keyWidth * 11, height - keyWidth, "", "", keyCream, keyGrey); //Key 18 ()
  drawKey(keyWidth * 12, height - keyWidth, "", "", keyCream, keyGrey); //Key 19 ()

  //draw sketch control knobs
  //knobs are drawn by drawKnob method. Parameters: x positon, y position, label, value, state, fill, stroke
  drawKnob(
    keyWidth * 5,
    height - keyWidth * 2,
    "",
    0,
    "",
    keyCream,
    keyGrey
  ); //Knob 0 ()
  drawKnob(keyWidth * 6, height - keyWidth * 2, "", 0, "", keyCream, keyGrey); //Knob 1 ()
  drawKnob(keyWidth * 7, height - keyWidth * 2, "", 0, "", keyCream, keyGrey); //Knob 2 ()
  drawKnob(keyWidth * 5, height - keyWidth, "", 0, "", keyCream, keyGrey); //Knob 3 ()
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
  text("Simple Clock by Edgar Olivares:", width * 0.5 - hudWidth * 0.35, height * 0.18);
  textSize(16);
  text(
    "Description: This sketch is just a simple clock that tells the actual time\n\nInteractivity:\nPress Y to switch to dayTime mode (default mode)\nPress U to switch to nightTime mode\nPress I to toggle to show the time (time is in 24-Hour Time)",
    width * 0.5 - hudWidth * 0.35,
    height * 0.21,
    hudWidth * 0.7,
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
  text(
    var_name,
    posX + 0.02 * keyWidth,
    posY + 0.01 * keyWidth,
    keyWidth * 0.98,
    keyWidth * 0.98
  );
  textAlign(CENTER);
  text(
    value,
    posX + 0.365 * keyWidth,
    posY + 0.37 * keyWidth,
    keyWidth * 0.3,
    keyWidth * 0.3
  );
  textAlign(LEFT);
  text(
    state,
    posX + 0.02 * keyWidth,
    posY + 0.76 * keyWidth,
    keyWidth * 0.98,
    keyWidth * 0.98
  );
}

function randomize() {
  //function called by the randomize values key: must be filled with sketch specific variables
}
