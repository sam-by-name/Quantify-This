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
  tempNum = '';
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
  z.push(tempNum);                                             // toggle final number to z                                       
  ans = Number(z[0]);                                          // ans equals first index of z and changes to a number 
  for (var i = 1; i < z.length; i++) {                         // loop through z
    let nextNum = Number(z[i+1])                               // nextNum equals string number from z and becomes a number
    let op = z[i];                                             // op equals operator from z as loop goes through it // now counts operators as well
    if      (op === '+') {(ans += nextNum) && (numOfOps += 1); }// if op is a plus string, a gets nextNum added to it
    else if (op === '-') {(ans -= nextNum) && (numOfOps += 1); }// if op is a minus string, a gets nextNum taken from it to it
    else if (op === '×') {(ans *= nextNum) && (numOfOps += 1); }// || || .. ect except for times
    else if (op === '÷') {(ans /= nextNum) && (numOfOps += 1); }// || || .. ect except for divide
    i++;                                                       // iterate
  }
document.getElementById("amount").value = ans;                 // display a
z = [];                                                        // z gets reset
tempNum = ans;                                                 // tempNum gets a so math can continue
}

///////////////////////////////////////////////////////////////////////////////
////////////////////   The Game Mechanics      ////////////////////////////////
////////////////////  Game's Global Variables  ////////////////////////////////

let points = 0;                                      // Total score counter
let lives =  5;                                      // Lives left counter
let round = -1;                                      // Round counter
let timeLeft = 30;                                   // Time .. left ... counter?
let skips = 3;                                       // Skips left
let questionPool;                                    // Holds Normal Round Q's and A's
let qNA;                                             // Randomized clone of the original questionPool
let bonusPool;                                       // Holds Bonus Round Q's and A's
let qNA2;                                            // Randomized clone of the original bonusPool
let question;                                        // Temporary question
let answer;                                          // Temporary answer
let clock;                                           // Round countdown clock
let borderToggle = 1;                                // Variable to make boarders switch their classes
let mysteryNum = 0;
let mysteryOp = 0;  
let numOfOps = 0;


///////////////////////        INTRO         //////////////////////////////////
function intro () {                                      // On page load 
  document.getElementById('quiz').innerHTML = htmlString;// Opening message displayed on the screen
  let element1 = document.createElement("button");       
  element1.innerHTML = " Lets Begin";                    // Button gets text
  element1.onclick = function(){showStart()};            // Button gets function to start game when pressed
  quiz.appendChild(element1);                            // Start game button pushed to screen               
  scoreBoard();                                          // Scoreboard update and ball running
  randomQs();                                            // Clone and shuffle normal questions
  randomBonusQs();                                       // Clone and shuffle bonus questions
}

const htmlString = "Answer the questions correctly before the timer runs out.\<br>\
Correct answer = 100 points \<br>\ Wrong answer   = -50 points \<br>\
You have 5 Lives.\<br>\ You have 3 Skips.\<br>\ Every 10 rounds = Double points round.\<br>\ Whats Your High Score? \<br>\<br>\ "
///////////////////    Randomize Temporary Question Pools   ///////////////////
function randomQs() {                                // clone question pool and randomize
  qNA = JSON.parse(JSON.stringify(questionPool));    // Learn what this awesomeness means!!!!!
  for (let i = qNA.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));     // I attempted to combine the two randomizers into one
    [qNA[i], qNA[j]] = [qNA[j], qNA[i]];             // But then the cloned arrays held only empty objects
  }
}

function randomBonusQs() {                           // clone question pool and randomize
  qNA2 = JSON.parse(JSON.stringify(bonusPool));      
  for (let i = qNA2.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [qNA2[i], qNA2[j]] = [qNA2[j], qNA2[i]];
  }
}

////////////////////////     Round Starting     ///////////////////////////////
function showStart() {
  clearInterval(clock);                              // Clears the window of the counter
  countDown(30, -1);                                 // Calls the timer and sets round time
  scoreBoard();                                      // Calls the window updater 
  nextRound();                                       // Calls the question and answer updater
}

////////////////////////       Next Round       ///////////////////////////////
function nextRound () {
  if (round %10 == 0) {                              // If round is a multiple of 10 
    bonusRound();                                    // bonus round applies
  } else if ((qNA.length == 0) && (qNA.length == 0)) {
    gameOver(youWin);
  } else if (round %3 == 0) {
    qGenerator();
  }else {
    let element = document.getElementById('quiz');   
    question = qNA[0].q;                             // Otherwise just gets first Q and first A
    answer   = qNA[0].a;
    element.innerHTML = question;                    // Displays question to the screen
  }           
}

////////////////////////     Random Questions     /////////////////////////////
function qGenerator () {
  let element = document.getElementById('quiz');
  clearInterval(clock);  
  countDown(45, -1);  
  numOfOps   = 0;
  mysteryNum = Math.floor((Math.random() * 1000) +1);
  mysteryOp  = Math.floor((Math.random() * 5) +1);
  question   = "Your answer should be an equation. \
    This equation will reach exactly\<br>\ " + mysteryNum + " \<br>\
    Not " +(mysteryNum +1) + "\<br>\ and not " + (mysteryNum -1) +"\<br>\
     you must use precisely " + mysteryOp + " math operators";  
  element.innerHTML = question;
}

function answerForRandom () {
  equals();
  if ((mysteryNum == ans) && (numOfOps === mysteryOp)) {
    success(150);
  } else { failure();
  }
}
////////////////////    Bonus Round Every 10 rounds   /////////////////////////
function bonusRound () {
  clearInterval(clock);                              // Resets timer
  countDown(60, -1);                                 // Sets bonus round timer
  let element = document.getElementById('quiz');     
  question = qNA2[0].q;                              // Gets bonus round Q anf A
  answer   = qNA2[0].a;
  element.innerHTML = question;                      // Displays bonus question to the screen
}

//////////////////////         Round Timer         ////////////////////////////
function countDown (a, b) {
  timeLeft = a;
  clock = setInterval (function () {                 // Assigns counter function to a "global" variable
    timeLeft--;                                      // Time left - 1
    document.getElementById('roundTimer').textContent = timeLeft;
    if (timeLeft === b) {                            // Special if just for the gif screen time
      clearInterval(clock);                          // Clear timer
      showStart();                                   
    } else if (timeLeft === 0) {                     // Timer runs out lose points and nextRound
      failure();
    }
  },1000);
}

//////////////////////          Scoreboard         ////////////////////////////
function scoreBoard() {
  document.getElementById('score').innerHTML = points;       // Updates total score 
  round += 1;                                                // Round +1
  document.getElementById('round').innerHTML = round;        // Updates round
  document.getElementById('livesLeft').innerHTML = lives;    // Updates lives left
  document.getElementById('skips').innerHTML = skips;        // Updates Skips left
  document.getElementById('roundTimer').innerHTML = timeLeft;// Updates round time left
  reset();                                                   // Resets calculator variables
  timeBorders();                                             // Resets border positions
}

//////////////////////        Skip A Round         ////////////////////////////
function skip () {
  if (skips > 0) {                                   // If more than 0 skips
    skips --;                                        // skips - 1    
    showStart();                                     // nextRound unpunished
  } else { return }                                  // No skips left means nothing happens
}

//////////////////////           ANSWER            ////////////////////////////
function theAnswer() {
  if (tempNum == qNA2[0].a) {                        // If its a correct answer of a bonus question
    success(200);                                    // Extra Points, lubbly jubbly
    qNA2.shift();                                    // Removes question that has just been asked
  } else if (z.length != 0) {
    answerForRandom ();
  } else if (tempNum != answer){                     // Answer wrong and suffer
    failure();                                       // Punishment is nye
  } else {
    success(100);                                    // Must be a correct answer then
  }
}

//////////////////////         Got It Right        ////////////////////////////
function success (a) {                               
  points += a;                                       // Updates points accordingly
  qNA.shift();                                       // Removes question that had just been asked
  clearInterval(clock);                              // Clears the timer
  document.getElementById('quiz').innerHTML = '\
  <img src="./gif/scoreOne.gif">';                   // It's gif time
  yaySound();                                        // Celebration sound
  countDown(5, 2);                                   // Gif countdown timer

}

///////////////////////        Got It Wrong        ////////////////////////////
function failure() {
  points -= 50;                                      // Lose 50 points      
  let wrong = qNA.shift();                           // removes previous question and
  qNA.push(wrong);
  if (lives > 0) {                                   // If you have lives left
    lives -= 1;                                      // Lose one
    clearInterval(clock);                            // Clear timer
    document.getElementById('quiz').innerHTML = '\
    <img src="./gif/loseAPoint.gif">';               // It's gif time 
    sadSound();                                      // Plays sad sound          
    countDown(5, 2);                                 // special countdown timer             
  } else if (lives == 0) {                           // If you got no lives left           
    clearInterval(clock);                            // Clear timer         
    scoreBoard();                                    // Update scoreboard
    gameOver(youLose);                                      // Run game ending function
  }
}

///////////////////////       It's a Ruse!!       /////////////////////////////
function ruse() {
  if (answer == "ruse") {                            // If the question is a ruse     
    success(150);                                    // And you guessed so, extra points
  } else {failure();}
}

///////////////////////      All Is Now Over      /////////////////////////////
function gameOver (a) {
  document.getElementById('quiz').innerHTML = "Your final score is " +points+ a;
  let element1 = document.createElement("button");      // Game over message and new game button displayed
  element1.innerHTML = "Again?";                        // Button text
  element1.onclick = function(){refresh(), showStart()};
  quiz.appendChild(element1);                           // Button assigned functions to start it all again
  round += 1;                                           // To make sure round 1 is intact round 1 upon restart
}

const youLose =  "\<br>\ GAME OVER!!!\
  \<br>\ Lets be honest you gave it\
  your best shot and no one is blaming you for failing ...\
  \<br>\ but they are laughing \<br>\ ";
const youWin = "\<br>\
Congratulations!!!\<br>\ Well done! you reached the end of the test\
  \<br>\ But did you do better than your peers? \<br>\ <img src=\"./gif/sillyDance.gif\">   ";

///////////////////////          Refresh          /////////////////////////////
function refresh() {
  points   = 0;                                      // Resets points
  lives    = 5;                                      // Resets lives
  round    = -1;                                     // Resets starting round   
  timeLeft = 30;                                     // Resets Round counter
  skips    = 3;                                      // Resets skips
  numOfOps = 0;                                      // Resets ops counter
  randomQs();                                        // Repopulates and reshuffles cloned normal question pool
  randomBonusQs();                                   // Repopulates and reshuffles cloned bonus pool
}

////////////////////////      Sound Functions    //////////////////////////////
function sadSound () {                                                             
  let audio = new Audio('./sound/sad.mp3');          // Assigns audio file to variable                           
  audio.play();                                      // Plays audio (when function runs that is)
}
function yaySound () {
  let audio = new Audio('./sound/yay.mp3');          // Assigns audio file to variable                            
  audio.play();                                      // Plays audio (when function runs that is)
}

////////////////////////      Time Boarders      //////////////////////////////
function timeBorders () {
  if (borderToggle %2 == 0) {                        // If variable is a even number, toggle first set
    borderToggle++;                                  // Then make variable an odd number
    document.getElementById('timer1').classList.toggle("timer2");
    document.getElementById('timer2').classList.toggle("timer1"); 
    document.getElementById('timer3').classList.toggle("timer2");
    document.getElementById('timer4').classList.toggle("timer1");// Get by class/s did not work so could
    document.getElementById('timer1').classList.toggle("timer1");// not consolidate
    document.getElementById('timer2').classList.toggle("timer2");// Begging for simpler solution
    document.getElementById('timer3').classList.toggle("timer1");// so more could be done :D
    document.getElementById('timer4').classList.toggle("timer2");     
  } else                                             // If variable is a odd number, toggle second set
    {borderToggle++;                                 // Then make variable an even number
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

///////////////////////////////////////////////////////////////////////////////
////////////////////////  Questions an Answers  ///////////////////////////////
let squareRoot  = "What is the square root of";          // Globals variable solely for question array
let numOfLet = "Example: (a - b) * c = x \<br><br>\ If ";// Globals variable solely for question array

questionPool = [                                         // Array of objects that hold all normal Q's and A's
  {q : squareRoot + " 225?" , a : 15},                   // Add questions and answers in here to extend the pool
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
  {q : numOfLet + "(100.2 - b) × 5 = 450 \<br>\ What is 'b'?"                  , a : 10.2},
  {q : "1 pile of sand + 1 pile of sand = \<br>\ How many piles of sand"       , a : 1},
  {q : "If 'you' are me and 'I' am you. \<br>\ Then how many are we?"          , a : 1},
  {q : "How long is a piece of string?" , a : 'ruse'}
]
bonusPool = [                                        // Array of objects that hold all bonus Q's and A's                  
  {q : "How many minutes in a week if there are 270 days\
       in a normal, 12 month year?"                                            , a : 10080},
  {q : "If an alphabet string was .split(' ').reverse()..'d\
       into an array. At what index would 'm' be stored?"                      , a : 13},
  {q : "Sally is 54 years old and her mother is 80, how many\
       years ago was Sally’s mother three times her age?"                      , a : 41},         
  {q : "How many functions did it take to display this message\
      \<br>\ from + including nextRound() onwards, no repeats"                 , a : 11}  // If you looked here, you are both canny and a cheat Tut tut tut
  ]

function alert1 () {
  alert(youWin);
}