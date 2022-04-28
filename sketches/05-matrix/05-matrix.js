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
//array to hold cels (used to setup the grid)
let cells = [];
//array to switch cells displayed (Drop animation)
let drops = [];
//Cell Size
let cellSize = 30;
let numRows;
let numCols;
//Probability variable for swapping symbols
let symbolSwapProb = 0.01;
//variable for drop speed
//Set no. of frames the drop will move down 2 cols.
let dropTimeout = 2;
//Offscreen means the variables will appear as if they are flowing into and out of the screen.
//Maxoffscreen
let maxOffscreen = 200;
//variable for time limit for a sybmbol to stay lit
let brightTime = 60;
//Variable for changing language
//By default lang1 will be true
let lang1 = true;
let lang2 = false;
let lang3 = false;
let lang4 = false;


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
  //Setting the size of the characters. Defualt is 12
  colorMode(HSB);
  textSize(16);

  numRows = ceil(height / cellSize);
  numCols = ceil(width / cellSize);

  for (let i = 0; i < numRows; i++){
    let newRow = [];
    for (let j = 0; j < numCols; j++) {
      newRow.push(new Cell(j * cellSize, i * cellSize));
    }
    cells.push(newRow);
  }

  for (let j = 0; j < numCols; j++) {
    drops.push(new Drop(j));
  }
}

function draw() {
  // Pause Logic: If pause flag is true, do nothing in draw, except indicate that the sketch is paused
  if (paused) {
    text("Paused", 50, 50);
    return;
  }
  background(210);

  //##TODO##~~~~~~~~~~~~~~~~~~~ Sketch logic goes here!
  background(0);
  //call the draw method described in Drop class to drop the symbol
  drops.forEach(drop => {
    drop.update();
    drop.brightenCell();
  });
  //call the draw method described in Cell class to write the symbol
  cells.forEach(row => {
    row.forEach(cell => {
      cell.draw();
      cell.update();

    });
  });

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
      window.location.href = "../06-dice/06-dice.html"; //redirect current page to sketch 1, a test sketch
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
      window.location.href = "../04-spiral/04-spiral.html"; //~~~PLACEHOLDER, UPDATE~~~ redirect current page to sketch 0, the home menu
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
    case 89: //Y ()
      //Chinese symbols ( lang 3 )
      lang1 = false;
      lang2 = false;
      lang3 = true;
      lang4 = false;
      break;
    case 85: //U ()
      //Hindi Characters ( lang 2 )
      lang1 = false;
      lang2 = true;
      lang3 = false;
      lang4 = false;
      break;
    case 73: //I ()
      break;
    case 79: //O ()
      break;
    case 80: //P ()
      break;
    case 72: //H ()
      //japanese characters (lang 4)
      lang1 = false;
      lang2 = false;
      lang3 = false;
      lang4 = true;
      break;
    case 74: //J ()
      //English Characters ( lang 1 )
      lang1 = true;
      lang2 = false;
      lang3 = false;
      lang4 = false;
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
  drawKey(keyWidth * 8, height - keyWidth * 2, "Chinese", "", keyCream, keyGrey); //Key 10 ()
  drawKey(keyWidth * 9, height - keyWidth * 2, "Hindi", "", keyCream, keyGrey); //Key 11 ()
  drawKey(keyWidth * 10, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 12 ()
  drawKey(keyWidth * 11, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 13 ()
  drawKey(keyWidth * 12, height - keyWidth * 2, "", "", keyCream, keyGrey); //Key 14 ()
  drawKey(keyWidth * 8, height - keyWidth, "Japanese", "", keyCream, keyGrey); //Key 15 ()
  drawKey(keyWidth * 9, height - keyWidth, "English", "", keyCream, keyGrey); //Key 16 ()
  drawKey(keyWidth * 10, height - keyWidth, "", "", keyCream, keyGrey); //Key 17 ()
  drawKey(keyWidth * 11, height - keyWidth, "", "", keyCream, keyGrey); //Key 18 ()
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
  text("Matrix Rain Code - Sahil Zaveri", (width * 0.5) - (hudWidth * 0.35), height * 0.18);
  textSize(18);
  text(
    "Overview:\nAh!, you must have seen the popular sci-fi series, \"The Matrix\". If not you probably came across the matrix rain code animation. This is my attempt at replicating that animation.\n\nInteractivity: \nThe sketch comes with the option to change the language of the characters. \n\nTo change the language to Chinese, press the \"Y\" key. \nTo change the language to Japanese, press the \"U\" key. \nTo change the language to Hindi, press the \"H\" key. \nTo change the language to English, press the \"J\" key.\n\nPS! wait for a few seconds for all the characters to change to the language you chose. :) ",
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

//Class for Cells
class Cell {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.symbol = this.getRandomSymbol();
    this.brightness = 0;
    this.litTimer = 0;
  }


  //Will be adding User interaction to change languages
  getRandomSymbol() {
    return (randomSym(lang1, lang2, lang3, lang4));
  }
  //Method to set the brightness of each cell that is displayed
  brighten() {
    this.brightness = 100;
  }

  //Method to update the cells. This will change the letters of the cell depending on the probabilty as shown in the actual animation
  //will randomly change the symbols.
  update() {
    if (random() < symbolSwapProb) {
      this.symbol = this.getRandomSymbol();
    }
    if (this.brightness > 0) {
      this.brightness = 80;
      this.litTimer =  (this.litTimer + 1) % brightTime;

      if (this.litTimer === 0) {
        this.brightness = 0;
      }
    }
  }

  draw() {
    fill(100, 100, this.brightness);
    text(this.symbol, this.x, this.y);
  }
}

//Drop Class
class Drop {
  constructor(col) {
    this.row = 0;
    this.col = col;
    this.dropTimeout = 0;
    this.offScreenTimeout = floor(random(maxOffscreen));
    this.offScreen = true;
  }

  update() {
    if (this.offScreen) {
      this.offScreenTimeout = (this.offScreenTimeout + 1) % maxOffscreen;

      if (this.offScreenTimeout === 0){
        this.offScreen = false;
      }
    } else {
      this.dropTimeout = (this.dropTimeout + 1) % dropTimeout;

      if (this.dropTimeout === 0){
        this.row++;
      }

      if (this.row === numRows){
        this.row = 0;
        this.offScreen = true;
        this.offScreenTimeout = floor(random(maxOffscreen));
      }
    }
  }

  brightenCell() {
    if (!this.offScreen)
     cells[this.row][this.col].brighten();
  }
}

function randomSym(lang1, lang2, lang3, lang4){
  if(lang1==true){ // If user chose english
    let eng = random("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    return eng;
  }
  else if(lang2==true){ // If user chose Hindi
    let hindi =  String.fromCharCode(random(2304, 2423));
    return hindi;
  }
  else if(lang3 == true){ //If user chose chinese
    let chinese = String.fromCharCode(random(19968, 40959));
    return chinese;
  }
  else if(lang4 == true){ //If user chose Japanese
    let jap =  String.fromCharCode(random(12448, 12543));
    return jap;
  }
}
