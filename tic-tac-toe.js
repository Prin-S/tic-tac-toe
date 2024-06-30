const gameboard = (function() {
    let gameboardArray = new Array(9);

    const clearArray = () => { // For starting the game again
        player1.playerName = '';
        player2.playerName = '';
        message.innerHTML = '';

        gameControl.changeTurn();
        gameControl.changeStop();
        populateSquares('new');
    }

    return {gameboardArray, clearArray};
})();

const gameControl = (function() {
    let turn = 1; // Begin with player 1.
    let stop = false;
    const changeTurn = () => turn = 1;
    const getStop = () => stop;
    const changeStop = () => stop = false;

    const getPlayerChoice = function(choice) {
        if (gameboard.gameboardArray[choice] == undefined && turn == 1) {
            gameboard.gameboardArray[choice] = 1;
            switchPlayer();
        } else if (gameboard.gameboardArray[choice] == undefined && turn == 2) {
            gameboard.gameboardArray[choice] = 2;
            switchPlayer();
        } else if (turn == 1) {
            message.innerHTML = `Square is not free. Try again. ${player1.playerName} (X), choose a square.`;
        } else {
            message.innerHTML = `Square is not free. Try again. ${player2.playerName} (O), choose a square.`;
        }

        if ((gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[1] == 1 && gameboard.gameboardArray[2] == 1)
            || (gameboard.gameboardArray[3] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[5] == 1)
            || (gameboard.gameboardArray[6] == 1 && gameboard.gameboardArray[7] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[3] == 1 && gameboard.gameboardArray[6] == 1)
            || (gameboard.gameboardArray[1] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[7] == 1)
            || (gameboard.gameboardArray[2] == 1 && gameboard.gameboardArray[5] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[2] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[6] == 1)) {
            // When X gets three in a row
            message.innerHTML = `${player1.playerName} (X) wins!`;
            stop = true; // End the game.
        } else if ((gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[1] == 2 && gameboard.gameboardArray[2] == 2)
            || (gameboard.gameboardArray[3] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[5] == 2)
            || (gameboard.gameboardArray[6] == 2 && gameboard.gameboardArray[7] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[3] == 2 && gameboard.gameboardArray[6] == 2)
            || (gameboard.gameboardArray[1] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[7] == 2)
            || (gameboard.gameboardArray[2] == 2 && gameboard.gameboardArray[5] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[2] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[6] == 2)) {
            // When O gets three in a row
            message.innerHTML = `${player2.playerName} (O) wins!`;
            stop = true; // End the game.
        } else if (gameboard.gameboardArray.findIndex(each => each == undefined) == -1) {
            message.innerHTML = 'A tie!';
            stop = true; // End the game.
        }

        populateSquares();
    }

    const switchPlayer = function() {
        if (turn == 1) {
            turn = 2;
            message.innerHTML = `${player2.playerName} (O), choose a square.`;
        } else {
            turn = 1;
            message.innerHTML = `${player1.playerName} (X), choose a square.`;
        }
    }

    return {turn, changeTurn, getStop, changeStop, getPlayerChoice};
})();

function createPlayer(name) {
    const playerName = name;

    return {playerName};
}

let player1 = createPlayer('Player 1');
let player2 = createPlayer('Player 2');

const allSquares = document.querySelectorAll('.button');
const form = document.querySelector('#form');
const restart = document.querySelector('#restart');
const message = document.querySelector('#message');

allSquares.forEach(button => {
    button.addEventListener('mouseover', changeColorIn.bind(this, button)); // Mouse hover effect
    button.addEventListener('mouseout', changeColorOut.bind(this, button)); // Mouse hover effect
    button.addEventListener('click', clickSquare.bind(this, button));
});

function populateSquares(set = 'none') {
    if (set == 'new') {
        gameboard.gameboardArray = new Array(9);
    }

    allSquares.forEach(button => {
        if (set == 'new') {
            button.innerHTML = '';
        } else if (gameboard.gameboardArray[button.id - 1] == 1) {
            button.innerHTML = 'X';
        } else if (gameboard.gameboardArray[button.id - 1] == 2) {
            button.innerHTML = 'O';
        }
    });
}

function changeColorIn(button) {
    button.style.filter = 'brightness(90%)';
}

function changeColorOut(button) {
    button.style.filter = 'brightness(100%)';
}

function clickSquare(button) {
    if (gameControl.getStop()) { // If the game has ended, don't add X or O to the square.
    } else {
        gameControl.getPlayerChoice(button.id - 1);
    }
}

form.addEventListener('submit', submitForm);

function submitForm(event) {
    player1.playerName = document.querySelector('#player1').value;
    player2.playerName = document.querySelector('#player2').value;

    if (gameControl.getStop()) {
        message.innerHTML = 'Reset the game first.';
    } else {
        message.innerHTML = `${player1.playerName} (X), choose a square.`;
    }

    event.preventDefault();
}

restart.addEventListener('click', gameboard.clearArray);