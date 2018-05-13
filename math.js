let tempNum = '';                                    //  holds temp number
let z = [];                                          //  holds string/numbers & math operators in order
let ans = 0;                                         //  Holds answer

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
    if (op === '+') { ans += nextNum; }         // if op is a plus string, answer gets nextNum added to it
    else if (op === '-') { ans -= nextNum; }    // if op is a minus string, answer gets nextNum taken from it to it
    else if (op === '×') { ans *= nextNum; }    // || || .. ect except for times
    else if (op === '÷') { ans /= nextNum; }    // || || .. ect except for divide
    i++;                                        // iterate
  }
document.getElementById("amount").value = ans;  // display answer
z = [];                                         // z gets reset
tempNum = ans;                                  // tempNum gets answer so math can continue
}



//////////////////// The Game Mechanics ////////////////////////////////////

function showStart () {
  let element = document.getElementById('quiz');
  element.innerHTML = "Now we're cooking";
  countDown();
}

function borders () {
  let movingBorder = getElementById('timerTR');
  
}

function countDown () {
  let timeLeft = 10;
  setInterval (function () {
    timeLeft--;
    document.getElementById('roundTimer').textContent = timeLeft;
    if (timeLeft < 0) {
      clearInterval(setInterval())
    } else if (timeLeft === 0) {
      nextRound();
      countDown();
    }   
  },1000);
}

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

const htmlString = "The aim of the game is to use the calculator to answer the questions correctly as quick \
as you can.\<br>\
Each round has a timer, 1st round starts at 15 seconds (maybe 10)\ <br>\
Getting the answer right will get you X points \<br>\
Getting questions wrong will deduct points \<br>\
How quickly you answer will also effect your points (quick correct answer = +points) \<br>\
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

function nextRound() {
  let element = document.getElementById('quiz');
  element.innerHTML = "Let's get it started in here";
}