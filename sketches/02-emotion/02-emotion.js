//let debug = true; //debug boolean, sets screen size to equal to hardware screen size for use with online editor
let hud = true; //hud default state
let info = false; //info panel default state
let paused = false; //hud default state
let debug = false; //sets screen size to LVS monitor dimensions
let hudWidth = 0; //initialize variable for width of the hud (set in setup)
let keyWidth;
let discomode = false;//flag for disco mode

//##TODO##~~~~~~~~~~~~~~~~~~~ Sketch variables go here!
//added some test variables

function setup() {
//changed framerate to 40 to make it smoother
  frameRate(2);
  brown = color(210, 147, 125);
  yellow = color(238, 220, 130);
  steel = color(194, 185, 184);

  chatter = 'ün';
  createCanvas(windowWidth, windowHeight);
  hudWidth = Math.min(1024, width);
  keyWidth = hudWidth / 13;
//set the width of the hud to the screen width if below 1024px
//set the width and height of the screen to match the display
  if (debug) {
    width = 1024;
    height = 1280;
  }
}

var blink = 0

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused) {
    fill(50);
    text("Drawing is Paüsed!", 160, 300);
    return;
  }

  blink = blink + 1


//##TODO##~~~~~~~~~~~~~~~~~~~ Sketch logic goes here!
  background(steel);
  if (blink % 2 === 0)  {

    fill(yellow);
    circle(200, 150, 100);
    circle(200, 300, 100);
    circle(200, 450, 100);
    circle(370, 300, 100);


    circle(550, 150, 100);
    circle(550, 300, 100);
    circle(550, 450, 100);

    textSize(50);
    fill(50);
    text(chatter, random(0, 1024), random(0, 500));
    text(chatter, random(0, 1024), random(0, 500));
  }

  else {

    fill(brown);
    circle(200, 150, 100);
    circle(200, 300, 100);
    circle(200, 450, 100);
    circle(370, 300, 100);


    circle(550, 150, 100);
    circle(550, 300, 100);
    circle(550, 450, 100);
  }

  line(0, 250, 125, 0);
  line(windowWidth, 250, windowWidth - 125, 0);



  push(); //store sketch specific drawing settings
  if (info) {
    drawInfo();
  } //call the function that draws the info pane, if the info variable is true. Must come at the end of the draw function.
  if (hud || info) {
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
      window.location.href = "/index.html"; //redirect current page to sketch 0, the home menu
      break;
    case 69: //E (Pause)
      paused = !paused;
      break;
    case 82: //R (Next Sketch)
      window.location.href = "/sketches/01_test/test.html"; //redirect current page to sketch 1, a test sketch
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
      window.location.href = "/index.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
      break;
    //Volume Dn (handled by OS)

    //encoders
    //encoder 0
    case 49: //1 ()
      break;
    case 50: //2 ()
      break;
    case 90: //Z ()
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
    case 89: //Y () //Sleep
      //Goes to sleep, darkens background and shuts off lights.
      yellow = (219, 78, 2);
      brown = (76, 53, 46);
      steel = (179, 137, 124);
      chatter = 'Zz';
      frameRate(1);
      discomode = false;
      break;
    case 85: //U () //Default
      //Reverts back to normal colors.
      brown = color(210, 147, 125);
      yellow = color(238, 220, 130);
      steel = color(194, 185, 184);
      chatter = 'ün';
      frameRate(2);
      discomode = false;
      break;
    case 73: //I () //Enrage
      //Enrage, increasing the framerate and turning the colors to shades         of red
      brown = color(250, 85, 0);
      yellow = color(250, 85, 102);
      steel = color(194, 185, 184);
      chatter = 'beep!';
      frameRate(5);
      discomode = false;
      break;
    case 79: //O () //Calm
      //Calm down, decreasing the framerate to a crawl and picking cool           colors
      brown = color(3, 182, 252);
      yellow = color(26, 130, 171);
      steel = color(111, 232, 129);
      chatter = '❀';
      frameRate(1);
      discomode = false;
      break;
    case 80: //P () //Music Mode
      //Picks some soft colors and plays music
      //Wasn't able to add music, freesounds requires and account
      discomode = true;
      brown = color(162, 81, 219);
      yellow = color(100, 40, 143);
      steel = color(194, 185, 184);

      chatter = '♫';
      frameRate(4);

      steel = color(150, 92, 191);
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
  textFont("Arial");
  textSize(16);
  //draw system control keys
  drawKey(
    0,
    height - keyWidth * 2,
    "Hud:",
    hud.toString(),
    color(255),
    color(0)
  ); //Key 0 (Toggle Hud)
  drawKey(keyWidth, height - keyWidth * 2, "Home", "", color(255), color(0)); //Key 1 (Home)
  drawKey(
    keyWidth * 2,
    height - keyWidth * 2,
    "Pause",
    "",
    color(255),
    color(0)
  ); //Key 2 (Pause)
  drawKey(
    keyWidth * 3,
    height - keyWidth * 2,
    "Next Sketch",
    "",
    color(255),
    color(0)
  ); //Key 3 (Next Sketch)
  drawKey(
    keyWidth * 4,
    height - keyWidth * 2,
    "Vol +",
    "",
    color(255),
    color(0)
  ); //Key 4 (Volume Up)
  drawKey(
    0,
    height - keyWidth,
    "Artist Info:",
    info.toString(),
    color(255),
    color(0)
  ); //Key 5 (Toggle Info)
  drawKey(keyWidth, height - keyWidth, "Rando- mize", "", color(255), color(0)); //Key 6 (Randomize Variables)
  drawKey(
    keyWidth * 2,
    height - keyWidth,
    "Reset Sketch",
    "",
    color(255),
    color(0)
  ); //Key 7 (Reset Sketch)
  drawKey(
    keyWidth * 3,
    height - keyWidth,
    "Previous Sketch",
    "",
    color(255),
    color(0)
  ); //Key 8 (Previous Sketch)
  drawKey(keyWidth * 4, height - keyWidth, "Vol -", "", color(255), color(0)); //Key 9 (Volume Down)

  //draw sketch control keys
  drawKey(
    keyWidth * 8,
    height - keyWidth * 2,
    "Sleep",
    "",
    color(255),
    color(0)
  ); //Key 10 ()
  drawKey(keyWidth * 9, height - keyWidth * 2, "Reset", "", color(255), color(0)); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "Rage", "", color(255), color(0)); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "Calm", "", color(255), color(0)); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "Disco", "", color(255), color(0)); //Key 14 ()
  drawKey(keyWidth * 8, height - keyWidth, "", "", color(255), color(0)); //Key 15 ()
  drawKey(keyWidth * 9, height - keyWidth, "", "", color(255), color(0)); //Key 16 ()
  drawKey(keyWidth * 10, height - keyWidth, "", "", color(255), color(0)); //Key 17 ()
  drawKey(keyWidth * 11, height - keyWidth, "", "", color(255), color(0)); //Key 18 ()
  drawKey(keyWidth * 12, height - keyWidth, "", "", color(255), color(0)); //Key 19 ()

  //draw sketch control knobs
  drawKnob(
    keyWidth * 5,
    height - keyWidth * 2,
    "",
    0,
    "",
    color(255),
    color(0)
  ); //Knob 0 ()
  drawKnob(
    keyWidth * 6,
    height - keyWidth * 2,
    "",
    0,
    "",
    color(255),
    color(0)
  ); //Knob 1 ()
  drawKnob(
    keyWidth * 7,
    height - keyWidth * 2,
    "",
    0,
    "",
    color(255),
    color(0)
  ); //Knob 2 ()
  drawKnob(keyWidth * 5, height - keyWidth, "", 0, "", color(255), color(0)); //Knob 3 ()
  drawKnob(keyWidth * 6, height - keyWidth, "", 0, "", color(255), color(0)); //Knob 4 ()
  drawKnob(keyWidth * 7, height - keyWidth, "", 0, "", color(255), color(0)); //Knob 5 ()
}

function drawInfo() {
  strokeWeight(1.5);
  textFont("Arial");
  textSize(25);
  rectMode(CENTER);
  rect(width / 2, height / 2, width * 0.66, height * 0.66, 15);
  rectMode(CORNER);
  text("Artist Statement:", width * 0.2, height * 0.215);
  textSize(16);
  text(
    "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. \n\nQuis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    width * 0.2,
    height * 0.24,
    width * 0.6,
    height * 0.6
  );
}

function drawKey(posX, posY, var_name, state, keyFill, keyStroke) {
  fill(keyFill);
  stroke(keyStroke);
  square(posX, posY, keyWidth, 10);
  square(posX + 0.11 * keyWidth, posY + 0.08 * keyWidth, 0.78 * keyWidth);
  noStroke();
  fill(keyStroke);
  text(
    var_name + "\n" + state,
    posX + 0.12 * keyWidth,
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
    posX + 0.37 * keyWidth,
    posY + 0.4 * keyWidth,
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
