let tempNum = '';                                    //  holds temp number
let z = [];                                          //  holds string/numbers & math operators in order
let ans = 0;                                         //  Holds a

////////////// CLEAR BUTTON ////////////////////
function reset() {                                   // AC button function
  document.getElementById("amount").value = '';
  tempNum = '';
  z = []; 
  ans = 0;
}

////////////// BACKSPACE BUTTON ////////////////
function delOne() {                                  // CE button function
  let tempDisp = document.getElementById('amount').value;
  let newDisp = tempDisp.slice(0, -1);
  if (tempNum !== '') {                              // works on everything until it gets a percentage 
    tempNum = tempNum.slice(0, -1);                  // and because of that, (e.g: '33%' is now actually a 21.33)
  } else ((tempNum = z.pop()) && delOne());          // the 'whats being removed from the display' to 'whats   
  document.getElementById('amount').value = newDisp; // being removed from the tempNum' is out of whack :s
}

////////////// NUMBER BUTTONS //////////////////
function numBtns (a) {                               // num buttons function
  tempNum += a; 
  document.getElementById('amount').value += (a);
}   

////////////// MINUS BUTTON ////////////////////
function minusBtn (a) {                              // operator buttons function
  if (tempNum == '') {                               // if tempNum is empty 
    ((tempNum = a) && (document.getElementById('amount').value += a));  // tempNum now holds '-'
  } else { opBtns ('-');
  }     
}

//////  PLUS MINUS DIVIDE TIMES BUTTONS  ///////    
function opBtns (a) {                                // operator buttons function
  if (tempNum !== '') {
  z.push(tempNum)
  }                                                  // tempNum is pushed to z
  z.push(a);                                         // tempOp is pushed to z
  tempNum = '';                                      // tempOp reset
  document.getElementById('amount').value += a;
}

////////////// DECIMAL POINT  BUTTON ///////////
function decimalBtn (a) {                            // operator buttons function
  tempNum += '.';
  document.getElementById('amount').value += a;
}

////////////// PERCENTAGE BUTTON ///////////////
function percentageBtn (a) {                         // operator buttons function
  tempNum = tempNum / 100 * z[z.length -2];
  document.getElementById('amount').value += a;
}

//////////////// Equals ////////////////////////
function equals() {    
  z.push(tempNum);                                   // toggle final number to z                                       
  ans = Number(z[0]);                                // ans equals first index of z and changes to a number 
  for (var i = 1; i < z.length; i++) {               // loop through z
    let nextNum = Number(z[i+1])                     // nextNum equals string number from z and becomes a number
    let op = z[i];                                   // op equals operator from z as loop goes through it
    if (op === '+') { ans += nextNum; }              // if op is a plus string, a gets nextNum added to it
    else if (op === '-') { ans -= nextNum; }         // if op is a minus string, a gets nextNum taken from it to it
    else if (op === '×') { ans *= nextNum; }         // || || .. ect except for times
    else if (op === '÷') { ans /= nextNum; }         // || || .. ect except for divide
    i++;                                             // iterate
  }
document.getElementById("amount").value = ans;       // display a
z = [];                                              // z gets reset
tempNum = ans;                                       // tempNum gets a so math can continue
}


//////////////////// The Game Mechanics ////////////////////////////////////
//    Game's Global Variables    //
let points = 0;         // Total score counter
let lives = 10;         // Lives left counter
let round = -1;         // Round counter
let timeLeft = 30;       // Time .. left ... counter?
let skips = 3;          // Skips left
let questionPool;       // Variable that holds all the the questions ... and answers :D
let qNA;                // Randomized clone of the original questionPool
let question;           // Temporary question
let answer;             // Temporary answer
let clock;              // Round countdown clock
let borderToggle = 1;   // Variable to make boarders switch their classes

//////////////  INTRO  ///////////////
function intro () {
  document.getElementById('quiz').innerHTML = htmlString;
  let element1 = document.createElement("button");
  element1.innerHTML = " Lets Begin";
  element1.onclick = function(){showStart()};
  quiz.appendChild(element1);
  scoreBoard();
  randomQs();
}

//////////////// Randomize Temporary Question Pool ///////////

function randomQs() {
  qNA = JSON.parse(JSON.stringify(questionPool));         // Learn what this awesomeness means!!!!!
  for (let i = qNA.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [qNA[i], qNA[j]] = [qNA[j], qNA[i]];
  }
}


///////////////////////////
function showStart() {
  clearInterval(clock);
  countDown(30, -1);
  scoreBoard();
  nextRound();
}

function nextRound () {
  let element = document.getElementById('quiz');
  question = qNA[0].q;
  answer   = qNA[0].a;
  qNA.shift();
  element.innerHTML = question;              
}

function countDown (a, b) {
  timeLeft = a;
  clock = setInterval (function () {
    timeLeft--;
    document.getElementById('roundTimer').textContent = timeLeft;
    if (timeLeft === b) {
      clearInterval(clock); 
      showStart();           
    } else if (timeLeft === 0) {
      failure();
    }
  },1000);
}

function scoreBoard() {
  document.getElementById('score').innerHTML = points;
  round += 1;
  document.getElementById('round').innerHTML = round;
  document.getElementById('livesLeft').innerHTML = lives;
  document.getElementById('skips').innerHTML = skips;
  document.getElementById('roundTimer').innerHTML = timeLeft;
  reset();
  timeBorders();
}

function skip () {
  if (skips > 0) {
    skips --;
    showStart();
  } else { return }
}

//////////////// ANSWER ////////////////////////
function theAnswer() {
  if (tempNum == answer) {
    success();
  } else {
    failure();
  }
}

function success () {
  points += 50; 
  clearInterval(clock);
  document.getElementById('quiz').innerHTML = '<img src="./gif/scoreOne.gif">';
  countDown(5, 2);     // not done yet

}

function failure() {
  points -= 10; 
  if (lives > 1) {
    lives -= 1;
    clearInterval(clock);
    document.getElementById('quiz').innerHTML = '<img src="./gif/loseAPoint.gif">';
    countDown(5, 3);  
  } else if (lives == 1) {
    lives -= 1;
    scoreBoard(); 
    gameOver();
  }
}

function gameOver () {
  document.getElementById('quiz').innerHTML = "GAME OVER!!! \<br>\ Your final score is\
   "+ points +"\<br>\ Lets be honest you gave it your best shot and no one is blaming you for failing ...\<br>\ but they are laughing \<br>\ ";
  let element1 = document.createElement("button");
  element1.innerHTML = "Again?";
  element1.onclick = function(){refresh(), showStart()};
  quiz.appendChild(element1);
}

function refresh() {
  points = 0;
  lives = 10;
  round = -1;
  timeLeft = 5;
  skips = 3;
  randomQs();
}
/////////////////  Time Boarders ///////////////////////////
function timeBorders () {
  if (borderToggle %2 == 0) {
    borderToggle++;
    document.getElementById('timer1').classList.toggle("timer2");
    document.getElementById('timer2').classList.toggle("timer1"); 
    document.getElementById('timer3').classList.toggle("timer2");
    document.getElementById('timer4').classList.toggle("timer1");
    document.getElementById('timer1').classList.toggle("timer1");
    document.getElementById('timer2').classList.toggle("timer2"); 
    document.getElementById('timer3').classList.toggle("timer1");
    document.getElementById('timer4').classList.toggle("timer2");    
  } else 
    {borderToggle++;
    document.getElementById('timer1').classList.toggle("timer1");
    document.getElementById('timer2').classList.toggle("timer2"); 
    document.getElementById('timer3').classList.toggle("timer1");
    document.getElementById('timer4').classList.toggle("timer2");
    document.getElementById('timer1').classList.toggle("timer2");
    document.getElementById('timer2').classList.toggle("timer1"); 
    document.getElementById('timer3').classList.toggle("timer2");
    document.getElementById('timer4').classList.toggle("timer1");
  } 
}

const htmlString = "The aim of the game is to use the calculator to a the qs correctly as quick \
as you can.\<br>\
Each round has a timer, 1st round starts at 15 seconds (maybe 10)\ <br>\
Getting the a right will get you X points \<br>\
Getting qs wrong will deduct points \<br>\
How quickly you a will also effect your points (quick correct a = +points) \<br>\
You have X lives, run out and your current score will be your final score.\<br>\
X amount of rounds and then a bonus/boss round, with more time and points at stake.\<br>\<br>\
"


let squareRoot  = "What is the square root of";
let numOfLet = "Example: (a - b) * c = x \<br><br>\ If ";

questionPool = [
  {q : squareRoot + " 225?" , a : 15},
  {q : squareRoot + " 256?" , a : 16},
  {q : squareRoot + " 144?" , a : 12},
  {q : squareRoot + " 400?" , a : 20},
  {q : squareRoot + " 625?" , a : 25},
  {q : squareRoot + " 900?" , a : 30},
  {q : squareRoot + " 1024?", a : 32},
  {q : squareRoot + " 2500?", a : 50},
  {q : squareRoot + " 3600?", a : 60},
  {q : squareRoot + " 4900?", a : 70},
  {q : squareRoot + " 6400?", a : 80},
  {q : squareRoot + " 110.25?", a : 10.5},  
  {q : numOfLet + "(17 - b) × 10 = 110   \<br>\ What is b?"                    , a : 6},
  {q : numOfLet + "(a  - 6) × 10 = 220   \<br>\ What is a?"                    , a : 28},
  {q : numOfLet + "(91 - 45.5)× c = 682.5\<br>\ What is c?"                    , a : 15},
  {q : numOfLet + "(18 - b) × c = 100    \<br>\ And c > 12 \<br>\ What is b?"  , a : 8}, 
  {q : numOfLet + "(51 - b) × c = 500    \<br>\ And b < 5  \<br>\ What is c?"  , a : 10},
  {q : numOfLet + "(7  - b) × c = 84     \<br>\ And c > 10 \<br>\ What is 'b'?", a : 0},
  {q : numOfLet + "(a - b) × 20 = 288    \<br>\ Then a - b = ?"                , a : 14.4},
  {q : numOfLet + "(a - b) × 100 = 550   \<br>\ Then a - b = ?"                , a : 55},
  {q : numOfLet + "(a - b) × 5.5 = 110   \<br>\ Then a - b = ?"                , a : 20},
  {q : numOfLet + "(a - 79) × c = 210    \<br>\ What is 'a'?"                  , a : 100},
  {q : numOfLet + "(69 - b) × 9 = 540    \<br>\ What is 'b'?"                  , a : 9},
  {q : numOfLet + "(100.2 - b) × 5 = 450 \<br>\ What is 'b'?"                  , a : 10.2}
]
let set3 = [
  {q : "How long is a piece of string?" , a : 'ruse'},
  {q : "If 'you' are me and 'I' am you. \<br>\ Then how many are we?" , a : 1},
  {q : "1 pile of sand + 1 pile of sand = ?" , a : 1},
  {q : "How many minutes in a week if there are 270 days in a normal, 12 month year?" , a : 10080},
  {q : "If an alphabet string was .split(' ').reverse()..'d into an array. At what index would 'm' be stored?" , a : 13},
  {q : "Reach 69 using exactly 3 math operators" , a : 30}          // write an individual function for this type of question
  //{q : , a : },
  //{q : , a : },
  //{q : , a : },
  //{q : , a : },
  //{q : , a : },
  //{q : , a : }
  ]

