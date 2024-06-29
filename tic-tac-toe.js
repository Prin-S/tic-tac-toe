const gameboard = (function() {
    let gameboardArray = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

    const clearArray = () => {
        for (let i = 0; i < 9; i++) {
            gameboardArray[i] = undefined;
        }

        populateSquares();
    }

    return {gameboardArray, clearArray};
})();

const gameControl = (function() {
    let turn = 1;
    let stop = false;
    const getStop = () => stop;

    const getPlayerChoice = function(choice) {

        if (gameboard.gameboardArray[choice] == undefined && turn == 1) {
            gameboard.gameboardArray[choice] = 1;
            switchPlayer();
        } else if (gameboard.gameboardArray[choice] == undefined && turn == 2) {
            gameboard.gameboardArray[choice] = 2;
            switchPlayer();
        } else {
            message.innerHTML = `Square is not free. Try again. Player ${turn}, choose a square.`;
        }

        if ((gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[1] == 1 && gameboard.gameboardArray[2] == 1)
            || (gameboard.gameboardArray[3] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[5] == 1)
            || (gameboard.gameboardArray[6] == 1 && gameboard.gameboardArray[7] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[3] == 1 && gameboard.gameboardArray[6] == 1)
            || (gameboard.gameboardArray[1] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[7] == 1)
            || (gameboard.gameboardArray[2] == 1 && gameboard.gameboardArray[5] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[2] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[6] == 1)) {
            message.innerHTML = `${player1.playerName} wins!`;
            stop = true;
        } else if ((gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[1] == 2 && gameboard.gameboardArray[2] == 2)
            || (gameboard.gameboardArray[3] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[5] == 2)
            || (gameboard.gameboardArray[6] == 2 && gameboard.gameboardArray[7] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[3] == 2 && gameboard.gameboardArray[6] == 2)
            || (gameboard.gameboardArray[1] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[7] == 2)
            || (gameboard.gameboardArray[2] == 2 && gameboard.gameboardArray[5] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[2] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[6] == 2)) {
            message.innerHTML = `${player2.playerName} wins!`;
            stop = true;
        } else if (gameboard.gameboardArray.findIndex(each => each == undefined) == -1) {
            message.innerHTML = 'A tie!';
            stop = true;
        }

        populateSquares();
    }

    const switchPlayer = function() {
        if (turn == 1) {
            turn = 2;
            message.innerHTML = `${player2.playerName}, choose a square.`;
        } else {
            turn = 1;
            message.innerHTML = `${player1.playerName}, choose a square.`;
        }
    }

    return {turn, getStop, getPlayerChoice};
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

function populateSquares() {
    allSquares.forEach(button => {
        if (gameboard.gameboardArray[button.id - 1] == 1) {
            button.innerHTML = 'X';
        } else if (gameboard.gameboardArray[button.id - 1] == 2) {
            button.innerHTML = 'O';
        } else {
            button.innerHTML = '';
        }
    });
}

populateSquares();

allSquares.forEach(button => {
    button.addEventListener('mouseover', changeColorIn.bind(this, button));
    button.addEventListener('mouseout', changeColorOut.bind(this, button));
    button.addEventListener('click', clickSquare.bind(this, button));
});

function changeColorIn(button) {
    button.style.filter = 'brightness(90%)';
}

function changeColorOut(button) {
    button.style.filter = 'brightness(100%)';
}

function clickSquare(button) {
    if (gameControl.getStop()) {
    } else {
        gameControl.getPlayerChoice(button.id - 1);
    }
}

form.addEventListener('submit', submitForm);

function submitForm(event) {
    player1.playerName = document.querySelector('#player1').value;
    player2.playerName = document.querySelector('#player2').value;

    if (gameControl.turn == 1) {
        message.innerHTML = `${player1.playerName}, choose a square.`;
    } else {
        message.innerHTML = `${player2.playerName}, choose a square.`;
    }

    event.preventDefault();
}

restart.addEventListener('click', gameboard.clearArray);