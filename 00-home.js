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
let tutorial = true;
let navMenu = false;
let selectedSketch = 1;
let nSketches = 9;
let sketchNames;
let sketchImages;
let sketchURLS;

//background
//let color1 = new Array(64, 64, 64); //array to hold value of first color
//let color2 = new Array(120, 0, 120); //array to hold value of second color
let color1;
let color2;

let keybinds;

let xoff = 0; //x offset for noise calcs
let pixelSize; //size of pixels for background, initialized in setup
let steps = 6; //number of steps in linear interpolation array for bg colors
let colors = new Array(steps);
let variability = 0.01; //the amount added to xoff each iteration

function setup() {
  frameRate(32); //base framerate is set to 32, can be changed for a given sketch, so long as the pi can handle it.
  createCanvas(windowWidth, windowHeight);
  hudWidth = Math.min(1024, width); //set the width of the hud to the screen width if below 1024px
  keyWidth = hudWidth / 13;
  if (debug) {
    width = 1024; //set the width and height of the screen to match the display
    height = 1280;
  }
  fontOS = loadFont('fonts/OpenSans-Medium.ttf');
  keybinds = loadImage('assets/keybinds.png');
  keyCream = color(235, 235, 215);
  keyGrey = color(10, 10, 10);
  textFont(fontOS);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch setup goes here!


  sketchNames = new Array(null, "Menu: Noisy Pixels", "SpacePort Window", "Good Morning", "Mandala", "Spiral", "Matrix", "Dice", "Splatter", "Music");
  sketchURLS = new Array(null, 'index.html', 'sketches/01-spacePort/01-spacePort.html', 'sketches/02-goodMorning/02-goodMorning.html', 'sketches/03-mandala/03-mandala.html', 'sketches/04-spiral/04-spiral.html', 'sketches/05-matrix/05-matrix.html', 'sketches/06-dice/06-dice.html', 'sketches/07-splatter/07-splatter.html', 'sketches/08-music/08-music.html');
  sketchImages = new Array(nSketches + 1);
  for(var i = 1;i <= nSketches;i++){
    sketchImages[i] = loadImage('assets/thumbnails/' + (i - 1) + '.png');
  }
  console.log(sketchImages);

  pixelSize = 110;
  var clf = floor(random(0,3)); //color family for sketch initialization
  var cl1 = swatchable(clf);
  var cl2 = swatchable_pastel(clf);

  color1 = new Array(red(cl1), green(cl1), blue(cl1)); //array to hold value of first color
  color2 = new Array(red(cl2), green(cl2), blue(cl2)); //array to hold value of second color

  randomize();

}

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused) {
    text("Paused", 50, 50);
    return;
  }
  //background(110);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch logic goes here!

  for(var j = 0; j < steps; j++){//assign the colors to our array at the start of each draw call
    colors[j] = lerpColor(color(color1[0],color1[1],color1[2]), color(color2[0],color2[1],color2[2]), j/steps);
  }
  //background
  noStroke();
  var x = 0;
  var y = 0;
  var j;
  for (j = 0; y < height; j++) { //draw our squares
    var ind = Math.floor(map(noise(xoff + j), 0, 1, 0, steps));
    fill(colors[ind]);
    rect(x, y, pixelSize, pixelSize);
    x += pixelSize;
    if (x >= width) {
      x = 0;
      y += pixelSize;
    }
  }
  xoff += variability; //increment the noise value

  push(); //store sketch specific drawing settings
  if (info) {
    drawInfo();
  } //call the function that draws the info pane, if the info variable is true. Must come at the end of the draw function.
  if (tutorial) {
      drawTutorial();
      }
  if (navMenu) {
    drawNav();
  }
  if (hud || info || tutorial || navMenu) {
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
      window.location.href = "../01-spacePort/01-spacePort.html"; //redirect current page to sketch 1, a test sketch
      break;
    //Volume Up (handled by OS)
    case 65: //A (Toggle Info)
      info = !info;
      tutorial = false;
      navMenu = false;
      break;
    case 83: //S (Randomize Sketch Variables, must be implemented per sketch)
      randomize();
      break;
    //Refresh/reset (handled by OS)
    case 70: //F (Previous Sketch)
      window.location.href = "../sketches/08-music/08-music.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
      break;
    //Volume Dn (handled by OS)

    //encoders
    //encoder 0
    case 49: //1 (cl1 red)
      if(!navMenu){
        if(color1[0] > 0){
          color1[0]-=2;
        }else{
          color1[0] = 0;
        }
      }else{
        selectedSketch = selectedSketch <= 1 ? nSketches : selectedSketch - 1;
      }
      break;
    case 50: //2 ()
      if(!navMenu){
        if(color1[0] < 255){
          color1[0]+=2;
        }else{
          color1[0] = 255;
        }
      }else{
        selectedSketch = selectedSketch >= nSketches ? 1 : selectedSketch + 1;
      }
      break;
    case 90: //Z ()
      if(navMenu){
        window.location.href = sketchURLS[selectedSketch];
      }
      break;

    //encoder 1
    case 51: //3 (cl1 green)
      if(color1[1] > 0){
        color1[1]-=2;
      }else{
        color1[1] = 0;
      }
      break;
    case 52: //4 ()
      if(color1[1] < 255){
        color1[1]+=2;
      }else{
        color1[1] = 255;
      }
      break;
    case 88: //X ()
      break;

    //encoder 2
    case 53: //5 (cl1 blue)
      if(color1[2] > 0){
        color1[2]-=2;
      }else{
        color1[2] = 0;
      }
      break;
    case 54: //6 ()
      if(color1[2] < 255){
        color1[2]+=2;
      }else{
        color1[2] = 255;
      }
      break;
    case 67: //C ()
      break;

    //encoder 3
    case 55: //7 (cl2 red)
      if(color2[0] > 0){
        color2[0]-=2;
      }else{
        color2[0] = 0;
      }
      break;
    case 56: //8 ()
      if(color2[0] < 255){
        color2[0]+=2;
      }else{
        color2[0] = 255;
      }
      break;
    case 86: //V ()
      break;

    //encoder 4
    case 57: //9 (cl2 green)
      if(color2[1] > 0){
        color2[1]-=2;
      }else{
        color2[1] = 0;
      }
      break;
    case 48: //0 ()
      if(color2[1] < 255){
        color2[1]+=2;
      }else{
        color2[1]=255;
      }
      break;
    case 66: //B ()
      break;

    //encoder 5
    case 173: //- (cl2 blue)
      if(color2[2] > 0){
        color2[2]-=2;
      }else{
        color2[2] = 0;
      }
      break;
    case 61: //= ()
      if(color2[2] < 255){
        color2[2]+=2;
      }else{
        color2[2]=255;
      }
      break;
    case 87: //B ()
      break;

    //second bank of keys:
    case 89: //Y (more steps)
      steps++;
      colors = new Array(steps);
      break;
    case 85: //U (larger pixels)
      pixelSize+=10;
      break;
    case 73: //I (reset color 1)
      var cl1 = (random(0,1) > 0.8) ? swatchable_pastel(floor(random(0,3))) : swatchable(floor(random(0,3)));
      color1 = new Array(red(cl1), green(cl1), blue(cl1)); //array to hold value of first color
      break;
    case 79: //O (more variablility (speed))
      variability+=0.002;
      break;
    case 80: //P (Toggle Tutorial)
      tutorial = !tutorial;
      info = false;
      navMenu = false;
      break;
    case 72: //H (fewer steps)
      if(steps > 1){
         steps--;
         }
      colors = new Array(steps);
      break;
    case 74: //J (smaller pixels)
      if(pixelSize > 10){
         pixelSize-=10;
         }
      break;
    case 75: //K (reset color 2)
      var cl2 = (random(0,1) > 0.8) ? swatchable_pastel(floor(random(0,3))) : swatchable(floor(random(0,3)));
      color2 = new Array(red(cl2), green(cl2), blue(cl2)); //array to hold value of second color
      break;
    case 76: //L (less variability)
      if(variability > 0.002){
         variability-=0.002;
         }
      break;
    case 59: //; (navigation menu)
      navMenu = !navMenu;
      info = false;
      tutorial = false;
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
  drawKey(keyWidth * 8, height - keyWidth * 2, "Steps+", "", keyCream, keyGrey); //Key 10 - y (Increase Steps)
  drawKey(keyWidth * 9, height - keyWidth * 2, "Size+", "", keyCream, keyGrey); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "Remix Color1", "", keyCream, keyGrey); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "Speed+", "", keyCream, keyGrey); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "Tutorial", "", keyCream, keyGrey); //Key 14 ()
  drawKey(keyWidth * 8, height - keyWidth, "Steps-", steps, keyCream, keyGrey); //Key 15 (Decrease Steps)
  drawKey(keyWidth * 9, height - keyWidth, "Size-", pixelSize, keyCream, keyGrey); //Key 16 ()
  drawKey(keyWidth * 10, height - keyWidth, "Remix Color2", "", keyCream, keyGrey); //Key 17 ()
  drawKey(keyWidth * 11, height - keyWidth, "Speed-", Math.floor(variability * 1000) / 10, keyCream, keyGrey); //Key 18 ()
  drawKey(keyWidth * 12, height - keyWidth, "Sketch Select", "", keyCream, keyGrey); //Key 19 ()

  //draw sketch control knobs
  //knobs are drawn by drawKnob method. Parameters: x positon, y position, label, value, state, fill, stroke
  if(!navMenu){ //we don't draw the standard knobs if we are in the nav menu
  drawKnob(keyWidth * 5, height - keyWidth * 2, "Color A", color1[0], "Red", keyCream, keyGrey); //Knob 0 ()
  drawKnob(keyWidth * 6, height - keyWidth * 2, "", color1[1], "Green", keyCream, keyGrey); //Knob 1 ()
  drawKnob(keyWidth * 7, height - keyWidth * 2, "", color1[2], "Blue", keyCream, keyGrey); //Knob 2 ()
  drawKnob(keyWidth * 5, height - keyWidth, "Color B", color2[0], "Red", keyCream, keyGrey); //Knob 3 ()
  drawKnob(keyWidth * 6, height - keyWidth, "", color2[1], "Green", keyCream, keyGrey); //Knob 4 ()
  drawKnob(keyWidth * 7, height - keyWidth, "", color2[2], "Blue", keyCream, keyGrey); //Knob 5 ()
              }else{
  drawKnob(keyWidth * 5, height - keyWidth * 2, "Select", selectedSketch, "Sketch", keyCream, keyGrey);//Knob 0 ()
  drawKnob(keyWidth * 6, height - keyWidth * 2, "", 0, "", keyCream, keyGrey); //Knob 1 ()
  drawKnob(keyWidth * 7, height - keyWidth * 2, "", 0, "", keyCream, keyGrey); //Knob 2 ()
  drawKnob(keyWidth * 5, height - keyWidth, "", 0, "", keyCream, keyGrey); //Knob 3 ()
  drawKnob(keyWidth * 6, height - keyWidth, "", 0, "", keyCream, keyGrey); //Knob 4 ()
  drawKnob(keyWidth * 7, height - keyWidth, "", 0, "", keyCream, keyGrey); //Knob 5 ()
  }
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
  text("Noisy Pixels - Rob Tyndall", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(16);
  text(
    "Overview:\n\nNoisy Pixels is a procedural animation that primarily uses parametric color generation, perlin noise, and linear interpolation between colors. The primary data structure is an array containing a series of colors. At one end of the array is \’Color 1\’, and at the other end \’Color 2\’. Between these two endpoints the rest of the array is filled with the colors that fall between these colors in RGB space. For each frame, each extra large pixel drawn to the screen is assigned a color based on a perlin noise function, which is what makes the color of any individual pixel change organically from one frame to the next.\n\nInteractivity:\nThe interactivity of this sketch allows for control of the two colors forming the endpoints of the color array, as well as control of the amount of distinct colors between these endpoints, or \’Steps\’. The size of the pixels can be changed with the \’Size\’ controls. The \’Speed\’ controls change the variability of the noise function, which makes the colors change more slowly or rapidly. The \’Remix\’ controls change only the selected color, and the \’Shuffle\’ control randomizes all of the variables at once!",
    (width * 0.5) - (hudWidth * 0.35),
    height * 0.21,
    (hudWidth * 0.7),
    height * 0.5
  );
}

function drawTutorial() {
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
  text("Live Visual Synth - Getting Started", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(16);
  text(
    "Welcome to the Live Visual Synth, or LVS, an interactive art platform!\n\n\nControls\nThe controls of the LVS are displayed at the bottom of the screen, and appear as they do on the physical LVS console. These controls also function on the LVS website, and can be used on any standard keyboard with the key values shown below. Each sketch on the LVS will have its own unique controls, which can be displayed at any time with the \'Overlay\' key \(Q\).\n\nNavigation\nNavigating between different sketches on the LVS system or website is accomplished by clicking the \‘Previous Sketch\’ \(R\), or ‘Next Sketch’ \(F\) keys. Additionally, this introductory sketch has a sketch navigation menu which is opened by pressing \‘Sketch Select\’ \(\;\).\n\nYou can hide or recall this menu with the \'Tutorial\' key \(P\).",
    (width * 0.5) - (hudWidth * 0.35),
    height * 0.21,
    (hudWidth * 0.7),
    height * 0.5
  );
  image(keybinds, (width * 0.5) - (hudWidth * 0.35), height * 0.625, (hudWidth * 0.7), (hudWidth * 0.124));
}

function drawNav() {
  strokeWeight(1.5);
  textFont(fontOS);
  textSize(25);
  fill(keyCream);
  stroke(keyGrey);
  rectMode(CENTER);
  rect(width * 0.5, height * 0.45, hudWidth * 0.8, height * 0.66, 2);
  rect(width * 0.5, height * 0.45, height * 0.4, height * 0.4, 2);
  rectMode(CORNER);
  stroke(keyCream);
  fill(keyGrey);
  text("Select Sketch", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(16);
  text(
    "Sketch " + selectedSketch + ": " + sketchNames[selectedSketch],
    (width * 0.5) - (hudWidth * 0.35),
    height * 0.21,
    (hudWidth * 0.7),
    height * 0.5
  );
  imageMode(CENTER);
  image(sketchImages[selectedSketch], width * 0.5, height * 0.45, height * 0.4, height * 0.4);
    text("\n\nUse the \'Select Sketch\' Knob to select a sketch, and press the knob when you have made your selection. Keyboard users select with \'1\' and \'2\' and confirm with \'Z\'",
    (width * 0.5) - (hudWidth * 0.35),
    height * 0.65,
    (hudWidth * 0.7),
    height * 0.1
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

    var cl1 = (random(0,1) > 0.8) ? swatchable_pastel(floor(random(0,3))) : swatchable(floor(random(0,3)));
    color1 = new Array(red(cl1), green(cl1), blue(cl1)); //array to hold value of first color
    var cl2 = (random(0,1) > 0.8) ? swatchable_pastel(floor(random(0,3))) : swatchable(floor(random(0,3)));
    color2 = new Array(red(cl2), green(cl2), blue(cl2)); //array to hold value of second color
    variability = floor(random(0,100))*0.0001;
    pixelSize = floor(random(10,200));
    steps = floor(random(1,15));
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
