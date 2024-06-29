const gameboard = (function() {
    const gameboardArray = new Array(9);
    return {gameboardArray};
})();

const gameControl = (function() {
    let turn = 1;

    const getPlayerChoice = function() {
        let choice = prompt(`Player ${turn}, choose a square (1-9).`);
    
        if (choice < 1 || choice > 9) {
            console.log(`Try again. Player ${turn}, choose a square (1-9).`);
            getPlayerChoice();
        } else {
            play(choice - 1);
        }
    }

    const play = function(choice) {
        if (gameboard.gameboardArray[choice] == undefined && turn == 1) {
            gameboard.gameboardArray[choice] = 1;
            switchPlayer();
            console.log(gameboard.gameboardArray);
        } else if (gameboard.gameboardArray[choice] == undefined && turn == 2) {
            gameboard.gameboardArray[choice] = 2;
            switchPlayer();
            console.log(gameboard.gameboardArray);
        } else {
            console.log(`Square is not free. Try again. Player ${turn}, choose a square (1-9).`);
            getPlayerChoice();
        }
        
        if ((gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[1] == 1 && gameboard.gameboardArray[2] == 1)
            || (gameboard.gameboardArray[3] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[5] == 1)
            || (gameboard.gameboardArray[6] == 1 && gameboard.gameboardArray[7] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[3] == 1 && gameboard.gameboardArray[6] == 1)
            || (gameboard.gameboardArray[1] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[7] == 1)
            || (gameboard.gameboardArray[2] == 1 && gameboard.gameboardArray[5] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[0] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[8] == 1)
            || (gameboard.gameboardArray[2] == 1 && gameboard.gameboardArray[4] == 1 && gameboard.gameboardArray[6] == 1)) {
            return console.log('Player 1 wins!');
        } else if ((gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[1] == 2 && gameboard.gameboardArray[2] == 2)
            || (gameboard.gameboardArray[3] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[5] == 2)
            || (gameboard.gameboardArray[6] == 2 && gameboard.gameboardArray[7] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[3] == 2 && gameboard.gameboardArray[6] == 2)
            || (gameboard.gameboardArray[1] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[7] == 2)
            || (gameboard.gameboardArray[2] == 2 && gameboard.gameboardArray[5] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[0] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[8] == 2)
            || (gameboard.gameboardArray[2] == 2 && gameboard.gameboardArray[4] == 2 && gameboard.gameboardArray[6] == 2)) {
            return console.log('Player 2 wins!');
        } else if (gameboard.gameboardArray.findIndex(each => each == undefined) == -1) {
            return console.log('A tie!');
        } else {
            getPlayerChoice();
        }
    }

    const switchPlayer = function() {
        if (turn == 1) {
            turn = 2;
            return 1;
        } else {
            turn = 1;
            return 2;
        }
    }

    return {getPlayerChoice};
})();

function createPlayer(name, sign) {

}

gameControl.getPlayerChoice();