//let debug = true; //debug boolean, sets screen size to equal to hardware screen size for use with online editor
let hud = true; //hud default state
let info = false; //info panel default state
let paused = false; //pause default state
let debug = false; //sets screen size to LVS monitor dimensions
let hudWidth = 0; //initialize variable for width of the hud (set in setup)
let keyWidth;
let fontOxy;
let keyCream;
let keyGrey;

//##TODO##~~~~~~~~~~~~~~~~~~~ Sketch variables go here!

// this is the array that will hold the points
let arr  = [];
// control variable
var control = 0.003;
//variable to control noise with buttons, default value will be 1
let n = 1;

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

  background(16);
  //angleMode(DEGREES);
  //adds character to the noise function
  //can be changed with buttons, with 50% imapact. (maybe interactive in future)
  noiseDetail(n, 50);
  // This variable holds the number of points in a row
  var numPoints = 30;
  var dis = width / numPoints;

  // To create the points i'm gonna use a loop
  for (var x = 0; x < width; x += dis){
    for(var y = 0; y < height; y += dis){
      // createVector creates a vector( think of it as a line)
      var v = createVector(x + random(-15, 15), y + random(-15, 15));
      //add this point(the line that we made above) to the array
      arr.push(v);

    }
  }
  //Now we have the points and the lines

}

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused) {
    text("Paused", 50, 50);
    return;
  }
  //background(210);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch logic goes here!
  noStroke()
  push();

  angleMode(DEGREES);
    // We need a loop to iterate the array in order to draw those lines/vectors
  for(var i = 0; i < arr.length; i++){
    // create RGB values for the lines
    // I'm mapping the color to the points itself
    // This way the lines will have multiple colors
    // the orignal bounds(0, width/height) are being changed
    var r = map(arr[i].x, 0, width, 50, 255);
    var g = map(arr[i].y, 0, height, 50, 255);
    var b = map(arr[i].x, 0, width, 255, 50);

    fill(r, g, b);

    // in order for the lines to move, i'm gonna use the noise() function
    var angle = map(noise(arr[i].x * control, arr[i].y * control ), 0, 1, 0, 720);

    // Now that we have an angle where we can add a vector to each point in the array
    arr[i].add(createVector(cos(angle), sin(angle) ) );
    // Put the lines in a circle
    if(dist(width/2, height/2, arr[i].x, arr[i].y) < 320){
      //to make a cleaner effect i'm gonna create an ellipse arround the lines
      ellipse(arr[i].x, arr[i].y, 2);

    }
  }

  pop();

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
      window.location.href = "../05-rotateRect/05-rotateRect.html"; //redirect current page to sketch 1, a test sketch
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
      window.location.href = "../03-draw/03-draw.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
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
    case 89: //Y (Change the noise function)
      n = n + 2;
      break;
    case 85: //U ()
      break;
    case 73: //I ()
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
  drawKey(keyWidth * 8, height - keyWidth * 2, "Inactive", "", keyCream, keyGrey); //Key 10 ()
  drawKey(keyWidth * 9, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 14 ()
  drawKey(keyWidth * 8, height - keyWidth, "", "", keyCream, keyGrey); //Key 15 ()
  drawKey(keyWidth * 9, height - keyWidth, "", "", keyCream, keyGrey); //Key 16 ()
  drawKey(keyWidth * 10, height - keyWidth, "", "", keyCream, keyGrey); //Key 17 ()
  drawKey(keyWidth * 11, height - keyWidth, "", "", keyCream, keyGrey); //Key 18 ()
  drawKey(keyWidth * 12, height - keyWidth, "", "", keyCream, keyGrey); //Key 19 ()

  //draw sketch control knobs
  //knobs are drawn by drawKnob method. Parameters: x positon, y position, label, value, state, fill, stroke
  drawKnob(keyWidth * 5, height - keyWidth * 2, "Test", 100, "Two", keyCream, keyGrey); //Knob 0 ()
  drawKnob(keyWidth * 6, height - keyWidth * 2, "", 111, "", keyCream, keyGrey); //Knob 1 ()
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
  text("Artist Statement:", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(16);
  text(
    "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. \n\nQuis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
