const gameboard = (function() {
    let gameboardArray = new Array(9);

    const populateSquares = (set = 'none') => {
        if (set == 'new') {
            gameboard.gameboardArray = new Array(9);
        }
    
        domStuff.allSquares.forEach(button => { // Xs and Os are added to gameboard based on what's stored in gameboardArray.
            if (set == 'new') {
                button.innerHTML = '';
            } else if (gameboard.gameboardArray[button.id - 1] == 1) {
                button.innerHTML = 'X';
            } else if (gameboard.gameboardArray[button.id - 1] == 2) {
                button.innerHTML = 'O';
            }
        });
    }

    const clearArray = () => { // For starting the game again
        player1.playerName = '';
        player2.playerName = '';
        domStuff.message.innerHTML = '';

        gameControl.changeTurn();
        gameControl.changeStop();
        populateSquares('new');
    }

    return {gameboardArray, populateSquares, clearArray};
})();

const gameControl = (function() {
    let turn = 1; // Begin with player 1.
    let stop = false;
    const changeTurn = () => turn = 1;
    const getStop = () => stop;
    const changeStop = () => stop = false;

    const getPlayerChoice = choice => {
        if (gameboard.gameboardArray[choice] == undefined && turn == 1) {
            gameboard.gameboardArray[choice] = 1; // Update element in gameboard.gameboardArray
            switchPlayer();
        } else if (gameboard.gameboardArray[choice] == undefined && turn == 2) {
            gameboard.gameboardArray[choice] = 2; // Update element in gameboard.gameboardArray
            switchPlayer();
        } else if (turn == 1) {
            domStuff.message.innerHTML = `Square is not free. Try again. ${player1.playerName} (X), choose a square.`;
        } else {
            domStuff.message.innerHTML = `Square is not free. Try again. ${player2.playerName} (O), choose a square.`;
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
            domStuff.message.innerHTML = `${player1.playerName} (X) wins!`;
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
            domStuff.message.innerHTML = `${player2.playerName} (O) wins!`;
            stop = true; // End the game.
        } else if (gameboard.gameboardArray.findIndex(each => each == undefined) == -1) {
            domStuff.message.innerHTML = 'A tie!';
            stop = true; // End the game.
        }

        gameboard.populateSquares();
    }

    const switchPlayer = () => {
        if (turn == 1) {
            turn = 2;
            domStuff.message.innerHTML = `${player2.playerName} (O), choose a square.`;
        } else {
            turn = 1;
            domStuff.message.innerHTML = `${player1.playerName} (X), choose a square.`;
        }
    }

    return {turn, changeTurn, getStop, changeStop, getPlayerChoice};
})();

function createPlayer(playerName) {
    return {playerName};
}

let player1 = createPlayer('');
let player2 = createPlayer('');

const domStuff = (function() {
    const allSquares = document.querySelectorAll('.button');
    const form = document.querySelector('#form');
    const restart = document.querySelector('#restart');
    const message = document.querySelector('#message');

    const changeColorIn = button => {
        button.style.filter = 'brightness(90%)';
    }
    
    const changeColorOut = button => {
        button.style.filter = 'brightness(100%)';
    }

    const clickSquare = button => {
        if (gameControl.getStop()) { // If the game has ended, don't add X or O to the square.
        } else if (player1.playerName == '' && player2.playerName == '') { // Don't start the game until player names have been entered.
            message.innerHTML = 'Enter player names first.';
        } else {
            gameControl.getPlayerChoice(button.id - 1);
        }
    }

    const submitForm = event => {
        player1.playerName = document.querySelector('#player1').value;
        player2.playerName = document.querySelector('#player2').value;
    
        if (gameControl.getStop()) {
            message.innerHTML = 'Reset the game first.';
        } else {
            message.innerHTML = `${player1.playerName} (X), choose a square.`;
        }
    
        event.preventDefault();
    }
    
    if (player1.playerName != '' && player2.playerName != '') { // Don't enable mouse hover effect until player names have been entered.
        allSquares.forEach(button => {
            button.addEventListener('mouseover', changeColorIn.bind(this, button)); // Mouse hover effect
            button.addEventListener('mouseout', changeColorOut.bind(this, button)); // Mouse hover effect
        });
    }

    allSquares.forEach(button => {
        button.addEventListener('click', clickSquare.bind(this, button));
    });

    form.addEventListener('submit', submitForm);
    restart.addEventListener('click', gameboard.clearArray);

    return {allSquares, message};
})();