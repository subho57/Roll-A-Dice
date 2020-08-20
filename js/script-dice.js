

alert("RULES :: \n 1) Click on ROLL DICE to start a Game.\n 2) You can roll as many times you want unless you roll 1 on the dice.\n 3) CURRENT SCORE will be added up.\n 4)If you get 1,your CURRENT SCORE will be LOST and the other player will get chance.\n 5)Meanwhile,when you want you can click on HOLD,which will help your score to get added in the GLOBALLY DISPLAY SCORE.\n 6)By Default max score is 20, if you want you can alse alter the max score.\n \n                   || BEST OF LUCK || \n");

var scores, roundscore, activeplayer, dice, playgame;
var diceselect = document.querySelector('.dice');



// var score1 = 1; var score2 = 0; this equivalent to below 
/* score = [0, 0]; //array
roundscore = 0;
activeplayer = 0;  //1st player starts the game. */
starting_requirement();

// set all the default to 0 by js not by html
/* document.getElementById('score-1').textContent = '0';
document.getElementById('score-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('current-0').textContent = '0'; */

/* var dice = Math.floor(Math.random() * 6) + 1;
console.log(dice); */

/* means #current-0 & #current-1 will be altered player basis----- so we r taking an activeplayer variable for 
that 0/1 alternative tn we r implementing a string in a '' */

var x = document.querySelector('#score-0').textContent;
console.log(x);
// hide - dice at FIRST
diceselect.style.display = "none";

// ################# || STATE VARIABLE playgame WILL ASSURE THAT AFTER WINNER DECLARED, HOLD &  ROLL BTN WILL BE FREEZED || #########
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (playgame) {
        // randor no. create
        var dice = Math.floor(Math.random() * 6) + 1;

        // display result
        diceselect.style.display = 'block';
        diceselect.src = 'dice-' + dice + '.png';
        console.log(dice);

        // update score
        if (dice !== 1) {
            roundscore = roundscore + dice;
            document.querySelector('#current-' + activeplayer).textContent = roundscore;
        }
        else
            nextplayer();
    }
});


document.querySelector(".btn-hold").addEventListener('click', function () {

    if (playgame) {
        // score --> mainscore(GLOBAL SCORE)
        score[activeplayer] = score[activeplayer] + roundscore;

        // update UI
        document.getElementById('score-' + activeplayer).textContent = score[activeplayer];

        // **************** for the input value box - user filled************************ 
        var maxscorevalue = document.querySelector('.maxscore').value;
        console.log(maxscorevalue);
        var winningscore;
        if (maxscorevalue) {
            winningscore = maxscorevalue;
        }
        else {
            winningscore = 20;
        }

        // WINNING LOGIC  ----------  winner class is not present in html it is a class that directly present in the css file
        if (score[activeplayer] >= winningscore) {
            document.getElementById('name-' + activeplayer).textContent = ' || WINNER ||';
            diceselect.style.display = "none";
            document.querySelector('#current-' + activeplayer).textContent = '0';
            document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
            playgame = false;
        }

        else
            // nextplayer ---- using DRY PRINCIPLE 
            nextplayer();
    }

});


function nextplayer() {

    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
    roundscore = 0;

    // both the currentscore of both will be 0,we r not doing by active player-as it will affect ONLY one at a time.
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // to TOGGLE the active grey panel  | OR | below one
    /* document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active'); */

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceselect.style.display = "none";
}


// ***************************logic for the NEW GAME BUTTON*********************************

document.querySelector(".btn-new").addEventListener('click', starting_requirement);

function starting_requirement() {
    score = [0, 0]; //array
    roundscore = 0;
    activeplayer = 0;  //1st player starts the game.
    playgame = true;

    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
// load service worker
"serviceWorker"in navigator && window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("./sw.js").then(e=>console.log("Success: ", e.scope)).catch(e=>console.log("Failure: ", e))
}
)