//let debug = true; //debug boolean, sets screen size to equal to hardware screen size for use with online editor
let hud = true; //hud default state
let info = false; //info panel default state
let paused = false; //hud default state
let debug = false; //sets screen size to LVS monitor dimensions
let hudWidth = 0; //initialize variable for width of the hud (set in setup)
let keyWidth;

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
  angleMode(DEGREES);
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
  noStroke();
  fill(255);
  
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
    //call the function that draws the info pane, if the info variable is true. Must come at the end of the draw function.
  push()
  if (info) {
    drawInfo();
  }
  //call the function that draws the hud, if the hud or info variable is true. Must come at the end of the draw function.
  if (hud || info) {
    drawHud();
  } 
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
    // Change the noise function. 
    case 89: //Y ()
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
    "Inactive",
    "",
    color(255),
    color(0)
  ); //Key 10 ()
  drawKey(keyWidth * 9, height - keyWidth * 2, "", "", color(255), color(0)); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "", "", color(255), color(0)); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "", "", color(255), color(0)); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "", "", color(255), color(0)); //Key 14 ()
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