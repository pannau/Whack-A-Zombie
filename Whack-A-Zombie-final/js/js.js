//SETTING VARIABLES ===================================================

var counter;
/*var durationG = 45000;*/
var upOne;
var upTwo;
var Level = 0;
var toStop = false;
var newResult = false;

const holes = document.querySelectorAll('.hole'); //gone into DOM and selected all .hole class.
const scoreBoard = document.querySelector('.score'); //gone into DOM and selected the score from scoreboard.
const bounceOne = document.querySelectorAll('.zombie'); // Gone into DOM and selected all .mole class
let LastHole;
let timeUp = false;
/*let score = 0;*/

//NOTE: Const variables can never change its value. It is of permenant value.


/* Session storage for score */
var highScore = parseInt(sessionStorage.getItem("highbounceOnecore"));
    if (!isNaN(highScore)) {
        document.getElementById("lS").textContent = "Best score is " + highScore;
    }

/*===================================================================*/
/* This function is going to give us a random amount of time between minimum and maximum (milliseconds, seconds) that its going to be popping up */

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// ===================================================================
/* This function is going to pick a random hole for the mole to pop-up from. */

function randomHole(holes) { // This is a DOM element(holes) function.
    
    //console.log(holes.length); // Returns 6 because (holes) is a node list that contains 6 holes- this is NOT an array
    
    const idx = Math.floor(Math.random() * holes.length);// Finds a random number index
    
    const hole = holes[idx];// Here it'll insert the random index number between 0- however many in an array
    
    if (hole === LastHole) { // if it was the same one that popped up previously.
        console.log("That's the same one!");
        return randomHole(holes);//runs funcion again.
    }
    
    //console.log(hole);//(We can't get reference to the DOM node if we just console log it). We must retun hole
    
    LastHole = hole;//Saves the reference of the last time the randomHole(hole) function was called
    
    return hole;//Now we have some reoccursion going on here... and we should not get the same number popping up.
}

// ===================================================================
/* This function is to get the zombies popping up */

function peep() {
    
    const time = randomTime(upOne, upTwo); //randomTime (ms,s)
    const hole = randomHole(holes); //randomHole
    
    //console.log(time, hole); //tells you how often a mole pops up in seconds and from which hole.
    
    hole.classList.add('up');
    
    //after random amount of 'time' we need to remove the class of 'up' from the random 'hole'- (see following function below)
    
    setTimeout(() => { //this function removes the class of up after a certain amount of 'time' (secs).
        hole.classList.remove('up');
        if (!timeUp) {
            if (!toStop) {
                peep();
            }
            } else {
                scoreGame();
                }
        
            }, time);
            console.log(time);
        }
        
// If time is not up, run peep() function. Else display Score. (if timeUp variable was set to true, it would only run once and stop.)

// ===================================================================

var theStartButton = document.getElementById("startA");
        
theStartButton.addEventListener("click", startGame, false);

/* This function is to start game */

function startGame() {
    
    console.log(counter);
    
    toStop = true; // This will run the game
    scoreBoard.textContent = 0; // this resets the score
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000); //Duration of game. Once 10secs have elapsed it will no longer run.
    
     document.getElementById("hS").innerHTML = "";
        toStop = false; //game ends
        newResult = true; //sets new result
                
        theStartButton.className = "startGame btn disabled"; //Disables start button.
        document.getElementById("startA").removeEventListener("click", startGame); // removes eventlistener from startbutton being clicked.
        } 

// ===================================================================
/* This function is for whacking the mole using click */

function bonk(e) {
    if (!e.isTrusted) return; //cheater! (some one is trying to fake the click without their mouse)
    
    score++;
    
    this.parentElement.classList.remove('up'); // If you smack the Zombie they should remove down.
    
    scoreBoard.textContent = score;
    
    //You could also call the function inside your bonk function and get rid of the show score button, it's up to you what you prefer but both ways will work.
    
    /*console.log(e);*/
}

/*=================================================================*/

/* These functions are for the different levels */

    document.getElementById("easy").addEventListener("click", easy, false);

    document.getElementById("medium").addEventListener("click", med, false);

    document.getElementById("hard").addEventListener("click", hard, false);

    bounceOne.forEach(zombies => zombies.addEventListener('click', bonk, false));


/* Here the speed for each peeping zombie is set for the different game levels */

    function easy() {
            upOne = 1000;
            upTwo = 2000;
            var startButton = document.getElementById("startA");
            startButton.style.visibility = "visible";
            document.getElementById("easy").className = "activeB";
            document.getElementById("medium").className = "activeC";
            document.getElementById("hard").className = "activeC";
        }

    function med() {
            upOne = 500;
            upTwo = 1200;
            var startButton = document.getElementById("startA");
            startButton.style.visibility = "visible";
            document.getElementById("medium").className = "activeB";
            document.getElementById("easy").className = "activeC";
            document.getElementById("hard").className = "activeC";

        }

    function hard() {
            upOne = 500;
            upTwo = 1000;
            var startButton = document.getElementById("startA");
            startButton.style.visibility = "visible";
            document.getElementById("hard").className = "activeB";
            document.getElementById("easy").className = "activeC";
            document.getElementById("medium").className = "activeC";
        }

/*=================================================================*/

function scoreGame() {
            //        alert(highScore);
            //        alert(score);
            toStop = true;
            if (!newResult) return;

            newResult = false;
            if (isNaN(highScore) || score > highScore) {
                if (isNaN(highScore)) {
                    document.getElementById("hS").textContent = "Well done!";
                } else {
                    document.getElementById("hS").textContent = "You won!";
                }

                highScore = score;
                sessionStorage.setItem("highbounceOnecore", highScore);
            } else if (score === highScore) {
                document.getElementById("hS").textContent = "Almost there!";
            } else {
                //alert("here2");
                document.getElementById("hS").textContent = "Oh no, the Zombies got you!";


            }
            if (!isNaN(highScore)) {
                document.getElementById("lS").textContent = "Best score is " + highScore;
            }
            
            theStartButton.addEventListener("click", startGame, false);
            
            theStartButton.className = "startGame";

        }


document.getElementById("reset1").addEventListener("click", function() {
            if (!isNaN(highScore)) {
                //sessionStorage.removeItem("highbounceOnecore");
                sessionStorage.setItem("highbounceOnecore", highScore);
                highScore = NaN;
                //highScore = highbounceOnecore;

            }
            document.getElementById("lS").innerHTML = "";
            document.getElementById("hS").innerHTML = "";
            document.getElementById("scoreTop").innerHTML = "0";
            toStop = true;
            newResult = false;
    
             document.getElementById("messages").style.visibility = "visible";
        })

        //      var highScore = parseInt(sessionStorage.getItem("highbounceOnecore"));
        if (isNaN(highScore)) {
            //document.getElementById("lS").textContent = "Best score is "+highScore;
            window.onload = function() {
                
                document.getElementById("messages").style.visibility = "visible";
                
                document.getElementById("startA").removeEventListener("click", startGame);
                
            }
        }


/* THIS IS THE CLOSE BUTTON FOR MESSAGES */

        var closeMButton = document.getElementById("closeMessages");

        closeMButton.addEventListener("click", closeMpopUp, false);

        function closeMpopUp() {
             document.getElementById("messages").style.visibility = "hidden";
            
            theStartButton.addEventListener("click", startGame, false);
            
            theStartButton.className = "startGame"; 
            
            
//            ELEMENT.classList.remove("CLASS_NAME");
                        
        }


/*zombieS.forEach(zombie => zombie.addEventListener('click', bonk, false));*/

//=================================================================
/* This creates a function to end the game */

/*
function endGame () {
    timeUp = true;
    scoreBoard.textContent = 0;
}
*/

//=================================================================















