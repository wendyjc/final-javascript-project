/**
 * Main JS file for COMP 2132: Final Project - Dice Game
 */

/* 
constants and variables
*/

// instruction popup elements
const btnInstructions   = document.getElementById("btn-instructions");
const popupInstructions = document.getElementById("popup-instructions");
const btnPopupClose     = document.getElementById("close-popup");

// buttons for gameplay
const btnNewGame  = document.getElementById("btn-new-game");
const btnRollDice = document.getElementById("btn-roll-dice");

// game display elements
const playerYouDialogue = document.getElementById("player-dialogue");
const opponentDialogue  = document.getElementById("opponent-dialogue");

const $playerDie1   = $("#player-die-1");
const $playerDie2   = $("#player-die-2");
const $opponentDie1 = $("#opponent-die-1");    
const $opponentDie2 = $("#opponent-die-2");   

// game scoring elements
const playerRndScore   = document.getElementById("player-round-score");
const playerTtlScore   = document.getElementById("player-total-score");
const opponentRndScore = document.getElementById("opponent-round-score");
const opponentTtlScore = document.getElementById("opponent-total-score");

// end-of-game results popup elements
const $FinalScores     = $("#game-results-popup p");  
const gameResultsPopup = document.getElementById("game-results-popup");
const btnPlayAgain     = document.getElementById("play-again-button");
const resultsImg       = document.getElementById("results-img");
         
// delays in milliseconds for result spopup
const popupDelay  = 300;

// constants for gameplay and scores
const firstGame = 1;
const lastGame = 3;

const resetScore = 0;
const minDiceValue = 1;
const maxDiceValue = 6;

const badRoll = 1;
const worstScore = 0;
const doubleMultipler = 2;

// handler for results popup setTimeout()
let resultsPopupHandler;

// variables for totalling scores
let gameCounter = firstGame;
let pTtlScore = 0;
let oppTtlScore = 0;


/*
Instructions
*/

// Displays a popup that provides player instructions
// when the user clicks the 'instructions' button
btnInstructions.addEventListener("click", function(){
    popupInstructions.style.display = "block";
});

// Hides the instruction popup when the user clicks the 
//'close' button of the popup
btnPopupClose.addEventListener("click", function(){
    popupInstructions.style.display = "none";
    
});


/**
 * New Game -- Reset Game
 * When the user clicks the 'New Game' button all the scores, 
 * counters, and images are reset to starting values.
 * Re-enables the 'Roll Dice' button for gameplay
 */
btnNewGame.addEventListener("click", resetGame);

function resetGame() {
    clearPopupTimeout()
    btnRollDice.disabled = false;
    gameCounter = firstGame;

    pTtlScore = resetScore;
    oppTtlScore = resetScore;
    playerRndScore.innerHTML = `${resetScore}`;
    playerTtlScore.innerHTML = `${pTtlScore}`;
    opponentRndScore.innerHTML = `${resetScore}`;
    opponentTtlScore.innerHTML = `${oppTtlScore}`; 

    playerYouDialogue.innerHTML = `<h3>Let's Go !!!</h3>`;
    opponentDialogue.innerHTML = `<h3>Grr !!!</h3>`;
    playerYouDialogue.style.display = "block";
    opponentDialogue.style.display = "block";

    $playerDie1.attr({
        "src": "",
        "alt": ""
    });
    $playerDie2.attr({
        "src": "",
        "alt": ""
    });
    $opponentDie1.attr({
        "src": "",
        "alt": ""
    });
    $opponentDie2.attr({
        "src": "",
        "alt": ""
    });
}


/**
 * Roll Dice -- Gameplay for each round.
 * When the user clicks the 'Roll Dice' button random value between 
 * 1 and 6. The corresponding dice images are displayed. The round score 
 * is displayed and the total game score is updated.
 */
btnRollDice.addEventListener("click", rollDice);

function rollDice(event) {

    playerYouDialogue.innerHTML = ``;
    opponentDialogue.innerHTML = ``;

    let difference = maxDiceValue - minDiceValue;

    let playerFirstRoll    = Math.round( Math.random() * difference ) + minDiceValue;
    let playerSecondRoll   = Math.round( Math.random() * difference ) + minDiceValue;
    let opponentFirstRoll  = Math.round( Math.random() * difference ) + minDiceValue;
    let opponentSecondRoll = Math.round( Math.random() * difference ) + minDiceValue;
    
    if (playerFirstRoll === badRoll || playerSecondRoll === badRoll) {
        playerRndScore.innerHTML = `${worstScore}`;
    }
    else if (playerFirstRoll === playerSecondRoll) {
        playerRndScore.innerHTML = `${(playerFirstRoll + playerSecondRoll) * doubleMultipler}`;
        pTtlScore += (playerFirstRoll + playerSecondRoll) * doubleMultipler;
        playerTtlScore.innerHTML = `${pTtlScore}`;
    }
    else {
        playerRndScore.innerHTML = `${playerFirstRoll + playerSecondRoll}`;
        pTtlScore += playerFirstRoll + playerSecondRoll;
        playerTtlScore.innerHTML = `${pTtlScore}`;
    }

    if (opponentFirstRoll === badRoll || opponentSecondRoll === badRoll) {
        opponentRndScore.innerHTML = `${worstScore}`;
    }
    else if (opponentFirstRoll === opponentSecondRoll) {
        opponentRndScore.innerHTML = `${(opponentFirstRoll + opponentSecondRoll) * doubleMultipler}`;
        oppTtlScore += (opponentFirstRoll + opponentSecondRoll) * doubleMultipler;
        opponentTtlScore.innerHTML = `${oppTtlScore}`;
    }
    else {
        opponentRndScore.innerHTML = `${opponentFirstRoll + opponentSecondRoll}`;
        oppTtlScore += opponentFirstRoll + opponentSecondRoll;
        opponentTtlScore.innerHTML = `${oppTtlScore}`;
    }

    const playerYou = new Player(playerFirstRoll, playerSecondRoll);
    const opponent = new Player (opponentFirstRoll, opponentSecondRoll);

    let playerArray = playerYou.getImgPaths();
    let opponentArray = opponent.getImgPaths();

    // call to change the dice display for the current round
    updateDiceDisplay(playerArray, opponentArray);

    // counts the number of rounds
    // if the game is at an end, calls the function to display 
    // the results of the game
    gameCounter++;
    if(gameCounter > lastGame) {
        // disable the 'Roll Dice' button during results display
        btnRollDice.disabled = true;
        displayGameResult(pTtlScore, oppTtlScore);
    }
}

/**
 * Function to display the dice images corresponding to 
 * randomly rolled dice values
 * @param {*} playerImgArray an array of dice image path strings
 * @param {*} opponentImgArray an array of dice image path strings
 */
function updateDiceDisplay(playerImgArray, opponentImgArray) {
    $playerDie1.attr({
        "src": `${playerImgArray[0]}`,
        "alt": `${playerImgArray[0]}`
    });
    $playerDie2.attr({
        "src": `${playerImgArray[1]}`,
        "alt": `${playerImgArray[1]}`
    });
    $opponentDie1.attr({
        "src": `${opponentImgArray[0]}`,
        "alt": `${opponentImgArray[0]}`
    });
    $opponentDie2.attr({
        "src": `${opponentImgArray[1]}`,
        "alt": `${opponentImgArray[1]}`
    });

    // console.log(playerImgArray[0]);
    // console.log(playerImgArray[1]);
    // console.log(opponentImgArray[0]);
    // console.log(opponentImgArray[1]);
}


/**
 * Displays the total scores and the winning or losing status 
 * of the user by fading in a popup
 * @param {*} playerYouTotalScore the main user's total score for the game
 * @param {*} opponentTotalScore the opponent's total score for the game
 */
function displayGameResult(playerYouTotalScore, opponentTotalScore) {

    let scoreString = `Your Final Score: ${playerYouTotalScore}<br>Opponent Final Score: ${opponentTotalScore}`;
    $FinalScores.html(scoreString);

    if(playerYouTotalScore > opponentTotalScore) {
        resultsImg.src = "images/win-image.webp";
        resultsImg.alt = "images/win-image.webp";
        let winAudio = new Audio("audio/win-audio.mp3");
        winAudio.play();
        // console.log("you win!");
    }
    else if (opponentTotalScore > playerYouTotalScore) {
        resultsImg.src = "images/lose-image.webp";
        resultsImg.alt = "images/lose-image.webp";
        let loseAudio = new Audio("audio/lose-audio.mp3");
        loseAudio.play();
        // console.log("you lose!");
    }
    else {
        resultsImg.src = "images/tie-game.jpg";
        resultsImg.alt = "images/tie-game.jpg";
        let tieAudio = new Audio("audio/tie-audio.mp3");
        tieAudio.play();
        // console.log("it's a tie!");
    }
    
    /**
     * A timeout to delay and fade in the results pop up display
     */
    resultsPopupHandler = setTimeout(function(){
        gameResultsPopup.style.zIndex = "10";
        gameResultsPopup.style.transition = "opacity 1s";
        gameResultsPopup.style.opacity = "1";
    }, popupDelay);
}

/**
 * Hides the results popup when the user clicks the 'Play Again'
 * button of the results popup. Will reset the gameplay.
 */
btnPlayAgain.addEventListener("click", function(){
    gameResultsPopup.style.zIndex = "-1";
    gameResultsPopup.style.opacity = "0";
    resetGame();
});


/**
 * Simple function to clear the Timeout for the results popup
 */
function clearPopupTimeout() {
    clearTimeout(resultsPopupHandler);
}

