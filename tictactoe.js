'use strict';

// write a check function to check if either X or O won the game.



// test case:
var board1 = [
    ['X', 'O', 'X'],
    ['X', 'O', 'X'],
    ['X', 'O', 'X']
];

var board2 = [
    ['N', 'X', 'X'],
    ['N', 'O', 'X'],
    ['O', 'X', 'O']
];

var board3 = [
    ['X', 'X', 'X', 'X'],
    ['O', 'O', 'O', 'O'],
    ['O', 'X', 'O', 'X'],
    ['O', 'X', 'O', 'X']
];

whoWon(board1); // player X won
whoWon(board2); // no body won, game is not over yet
whoWon(board3); // it was a draw

// this method assume that there is no knowledge about the board when you check the
// board to determine who won the game. Thus, it is possible there are multiple
// consecutive X or O's, then we check who has the larger number of consecutive X or O

// Because no previous move info is saved, basically we need to go through the board. Here
// the original strategy of bigO is O(n*2). Actually we visit each item twice.

// Definitely we can adopt the strategy of in file tictactoe2.js here to determine the status
// with just one scan of the board. Still the bigO would be O(n*2). In the worse case, we still
// have to visit each item once.

function whoWon(board) {
    var n = board.length;


    var counterXO = {
        X: 0, // how many consecutive X's
        O: 0, // how many consecutive O's
        N: 0 // how many empty cells
    };
    // check each row, col, cross and back-cross
    for (var i = 0; i < n; i++) {
        checkRow(board, i, counterXO);
        checkCol(board, i, counterXO);
    }
    checkCross(board, counterXO);
    // because we visit each cell twice. we need to set it back
    counterXO.N /=2;

    console.log(counterXO);

    // check who won the game
    if (counterXO.N === 0) {
        if (counterXO.X < counterXO.O) {
            console.log("Player O won");
        } else if (counterXO.X === counterXO.O) {
            console.log("It is a draw at this moment");
        } else {
            console.log("Player X won");
        }
    } else {
        if (counterXO.X < counterXO.O) {
            console.log("Player O won at this moment, but game is not over yet");
        } else if (counterXO.X === counterXO.O) {
            console.log("It is a draw at this moment, but game is not over yet");
        } else {
            console.log("Player X won at this moment, but game is not over yet");
        }
    }

}

function checkRow(board, row, counterXO) {
    var n = board.length;
    var row = board[row];

    // set a counter
    var count = {
        X: 0, // counter for X
        O: 0, // counter for O
        N: 0 // counter for N (empty)
    };

    row.forEach(function (item) {
        count[item]++;
    });

    // a consecutive of X
    if (count.X === n) {
        counterXO.X++;
    }
    // a consecutive of X
    if (count.O === n) {
        counterXO.O++;
    }
    // update the counter for empty cell
    counterXO.N += count.N;
}

function checkCol(board, col, counterXO) {
    var n = board.length;
    // set a counter
    var count = {
        X: 0, // counter for X
        O: 0, // counter for O
        N: 0 // counter for N (empty)
    };

    for (var row = 0; row < n; row++) {
        count[board[row][col]]++;
    }

    // a consecutive of X
    if (count.X === n) {
        counterXO.X++;
    }
    // a consecutive of X
    if (count.O === n) {
        counterXO.O++;
    }
    // update the counter for empty cell
    counterXO.N += count.N;
}

function checkCross(board, counterXO) {
    var n = board.length;
    var countCross = {
        X: 0, // counter for X
        O: 0 // counter for O
    };
    var countBackCross = {
        X: 0, // counter for X
        O: 0 // counter for O
    };
    // record the number of X and O at diagonal line
    for (var i = 0; i < n; i++) {
        countCross[board[i][i]]++;
        countBackCross[board[n-1-i][i]]++;
    }
    if (countCross.X === n) {
        counterXO.X++;
    }
    if (countCross.O === n) {
        counterXO.O++;
    }

    if (countBackCross.X === n) {
        counterXO.X++;
    }
    if (countBackCross.O === n) {
        counterXO.O++;
    }
}