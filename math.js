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
    tempNum = tempNum.slice(0, -1);                  // and because that e.g: '33%' is now actually a 21.33 number
  } else ((tempNum = z.pop()) && delOne());          // the whats being removed from the display to whats   
  document.getElementById('amount').value = newDisp; // being removed from the tempNum is out of whack
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
  z.push(tempNum);                              // add final number to z                                       
  ans = Number(z[0]);                           // ans equals first index of z and changes to a number 
  for (var i = 1; i < z.length; i++) {          // loop through z
    let nextNum = Number(z[i+1])                // nextNum equals string number from z and becomes a number
    let op = z[i];                              // op equals operator from z as loop goes through it
    if (op === '+') { ans += nextNum; }         // if op is a plus string, a gets nextNum added to it
    else if (op === '-') { ans -= nextNum; }    // if op is a minus string, a gets nextNum taken from it to it
    else if (op === '×') { ans *= nextNum; }    // || || .. ect except for times
    else if (op === '÷') { ans /= nextNum; }    // || || .. ect except for divide
    i++;                                        // iterate
  }
document.getElementById("amount").value = ans;  // display a
z = [];                                         // z gets reset
tempNum = ans;                                  // tempNum gets a so math can continue
}



//////////////////// The Game Mechanics ////////////////////////////////////

function intro () {
  let element = document.getElementById('quiz');
  element.innerHTML = htmlString;
  let element1 = document.createElement("button");
  element1.innerHTML = " Lets Begin";
  element1.onclick = function(){showStart()};
  quiz.appendChild(element1);
  scoreTot();
  roundRep();
  livesLeft();
  timer();
}
function showStart () {
  nextRound();
  countDown();
  timeBorders();
}
function countDown () {
  let timeLeft = 10;
  setInterval (function () {
    timeLeft--;
    document.getElementById('roundTimer').textContent = timeLeft;
    if (timeLeft < 0) {
      clearInterval(setInterval())            /* need to sort out setInterval on this line*/
    } else if (timeLeft === 0) {
      removeBorders();
      showStart();
    }   
  },1000);
}

function removeBorders () {
  let element = document.getElementById('timer1');
  element.classList.remove("timer1");  
  let element2 = document.getElementById('timer2');
  element2.classList.remove("timer2");  
  let element3 = document.getElementById('timer3');
  element3.classList.remove("timer1");  
  let element4 = document.getElementById('timer4');
  element4.classList.remove("timer2");  
}
function timeBorders () {
  let element = document.getElementById('timer1');
  element.classList.add("timer1");  
  let element2 = document.getElementById('timer2');
  element2.classList.add("timer2");  
  let element3 = document.getElementById('timer3');
  element3.classList.add("timer1");  
  let element4 = document.getElementById('timer4');
  element4.classList.add("timer2");  
}

function nextRound () {
  let element = document.getElementById('quiz');
  element.innerHTML = set2[Math.floor(Math.random()*5)].q;               /*innerHTML = variable of a random index from set 1 */

  /*//////*/
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

function scoreTot() {
  let points = document.getElementById('score');
  points.innerHTML = 000;
}
function livesLeft() {
  let lives = document.getElementById('livesLeft');
  lives.innerHTML = 10;
}
function roundRep() {
  let roundCount = document.getElementById('round');
  roundCount.innerHTML = 1;
}

function timer() {
  let time = document.getElementById('roundTimer');
  time.innerHTML = 10+"seconds";
}

let squareRoot  = "What is the square root of";
let numOfLet = "Example: (a - b) * c = x \<br><br>\ If ";
let set1 = [
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
  {q : squareRoot + " 110.25?", a : 10.5}
  ]
let set2 = [
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

