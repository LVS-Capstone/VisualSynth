//let debug = true; //debug boolean, sets screen size to equal to hardware screen size for use with online editor
let hud = false; //hud default state
let info = false; //info panel default state
let paused = false; //hud default state
let debug = false; //sets screen size to LVS monitor dimensions
let hudWidth = 0; //initialize variable for width of the hud (set in setup)
let keyWidth;
let fontOxy;
let keyCream;
let keyGrey;
//variable for createGraphics
let graphicz;

//These variables control different settings such as new dots, reverse, and whether to break the swirl or not.
let newfire = false;
let speedy = false;
let breaker = false;
let pastel = 0;


//##TODO##~~~~~~~~~~~~~~~~~~~ Sketch variables go here!
//The curve is the angle at which
var curver = 1.0;
//Target is the initial x position of the swirl
var target =  256;
//This is the space between one ring and the next in the swirl
var spacer = 2.5;
//This is the speed at which the dots are placed.
var speed = 0.4;
//These are the color variables.
var col = {
  r: 255,
  g: 0,
  b: 0
};
//flag for random colors

function setup() {
  //changed framrate for smoother transition colors
  frameRate(32);
  createCanvas(windowWidth, windowHeight);
  //declare createGraphics() object
  graphicz = createGraphics(windowWidth, windowHeight);
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
  target = windowWidth / 2;
  background(9);
  graphicz.background(200);

}

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused) {
    text("Paused", 50, 50);
    return;
  }


  //sketch logic goes here
  //Breaker is for breaking the swirl and making random dots on the canvas
  if (breaker == true){
    target = random(0, windowWidth);
  }

  //Newfire is just for testing in the editor. It will make a streak of dots that only follow the mouse if mouse support is added to hardware.
  //Fixed!
  if (newfire == true){
    col.r = random(0, 250);
    col.g = random(0, 250);
    col.b = random(0, 250);
    graphicz.fill(col.r, col.g, col.b);
    var rando = random(1,40);
    graphicz.ellipse(mouseX, mouseY, rando, rando);
    image(graphicz, 0, 0, width, height);
  }

  //Speedy will flip the swirl, making it travel in the opposite direction.
  if (speedy == true){
    speed = 1.5;
  }

  //Default swirl, this will just make a swirl from the middle of the canvas with no special attributes.
  //Colors are random

  colorMode(HSB, 100);

  col.r = random(0, 255);
  col.g = random(0, 255);
  col.b = random(0, 255);

  //x and y coordinates of the ellipse are chosen through these formulas
  var x = target + cos(curver) * spacer;
  var y = target + sin(curver) * spacer;


  if (pastel == 1){
    graphicz.fill((x * 100) % 360,(y * 100) % 100, 100);
  }

  else if (pastel == 2){
    graphicz.fill(col.r, col.g, col.b);
  }

  else if (pastel == 3){
    graphicz.fill(100, (y * 100), (x * 100) % 360);
  }

  else if (pastel == 0){
    graphicz.fill((x * 255) % 360, (x * 255) % 360, (x * 255) % 360);
  }

  graphicz.ellipse(x, y, millis()/200, millis()/200);

  image(graphicz, 0, 0, width, height);


  //curver and spacer are incremented up to create the actual swirl.
  curver += speed;
  spacer += speed;

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
      window.location.href = "../08-music/08-music.html"; //redirect current page to sketch 1, a test sketch
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
      window.location.href = "../06-dice/06-dice.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
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
    case 89: //Y (New Ring)
      //Creates a new ring and cuts the current one short
      curver = curver + 10;
      var x = x + 20;
      break;

    case 85: //U (Reversal)
    //flips the direction of the swirl
      speedy = true;
      break;

    case 73: //I (Break Swirl)
    //Destroys the ellipse, resulting in random placement of dots.
      breaker = true;
      break;

    case 79: //O (Brush)
    //Create a swirl at the mouse position
      newfire = true;
      break;

    case 80: //P (Full Reset)
    //Restore original settings
      curver = 1.0;
      speed = 0.4;
      col = {
      r: 255,
      g: 0,
      b: 0
    };
    newfire = false;
    speedy = false;
    breaker = false;
    pastel = 0;
      break;
    case 72: //H (Deep Warm Hues)
      //Creates warm colors
      pastel = 1;
      break;
    case 74: //J (Light Cold Hues)
      //Creates cold colors
      pastel = 3;
      break;
    case 75: //K (Flat Color)
      //Selects the most recent color and makes a flat color of it
      pastel = 5;
      break;
    case 76: //L (Random Colors)
      //Creates random colors
      pastel = 2;
      break;
      //Does not work on my keyboard? The ';' key doesn't register.
    case 59: //; (Black and White)
      //Ellipses alternate between black and white
      pastel = 0;
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
  drawKey(keyWidth * 8, height - keyWidth * 2, "New Ring", "", keyCream, keyGrey); //Key 10 ()
  drawKey(keyWidth * 9, height - keyWidth * 2, "Reverse", "", keyCream, keyGrey); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "Break Swirl", "", keyCream, keyGrey); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "Mouse Brush", "", keyCream, keyGrey); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "Full Reset", "", keyCream, keyGrey); //Key 14 ()
  drawKey(keyWidth * 8, height - keyWidth, "Warm Hues", "", keyCream, keyGrey); //Key 15 ()
  drawKey(keyWidth * 9, height - keyWidth, "Cold Hues", "", keyCream, keyGrey); //Key 16 ()
  drawKey(keyWidth * 10, height - keyWidth, "Flat Color", "", keyCream, keyGrey); //Key 17 ()
  drawKey(keyWidth * 11, height - keyWidth, "Random Colors", "", keyCream, keyGrey); //Key 18 ()
  drawKey(keyWidth * 12, height - keyWidth, "", "", keyCream, keyGrey); //Key 19 ()

  //draw sketch control knobs
  //knobs are drawn by drawKnob method. Parameters: x positon, y position, label, value, state, fill, stroke
  drawKnob(keyWidth * 5, height - keyWidth * 2, "", 0, "", keyCream, keyGrey); //Knob 0 ()
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
  text("Artist Statement:", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(16);
  text(
    "Splatter - With this sketch you can interact with an unending spiral of circles that grow over time. Use New Ring to skip the current ring and go to the next. Reverse will switch from clockwise to counter-clockwise. Break Swirl will destroy the swirl entirely, placing the dots randomly. Mouse Brush will create a trail on your cursor, allowing you to make your own trail of alternating circles. Full Reset will revert these settings to their defaults. The bottom row of buttons control the colors. The warm hues are red and purple, while the cold hues are blue and green. Flat color will select whichever color the last circle was and repeat it. Random colors will select random colors!",
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

function swatchable(fam) { //family 0 = red tones, 1 = green, 2 = blue
  var red = fam == 0 ? 255 : floor(random(0, 200));
  var green = fam == 1 ? 255 : floor(random(0, 200));
  var blue = fam == 2 ? 255 : floor(random(0, 200));
  return color(red, green, blue);
}

function swatchable_pastel(fam) { //family 0 = red tones, 1 = green, 2 = blue
  var red = fam == 0 ? 255 : floor(random(140, 250));
  var green = fam == 1 ? 255 : floor(random(140, 250));
  var blue = fam == 2 ? 255 : floor(random(140, 250));
  return color(red, green, blue);
}
