'use strict';

// write a check function to check if either X or O won the game.


// this method is basically reflect the real world game. It records the all previous move.
// It use two arrays and two variable to record the number of X or O's, initialize array to 0.
// when a new move is made, it increments the counter for the row or col, and also the diagonal
// if it is on the cross. then check if the counter  is equal to n (X won) or -n (O won).

// Because previous move info is recorded, the bigO of memory of this strategy is O(1), the space
// complexity is O(n). ( two n item arrays and two variables).

(function playGame() {
    var board = [
        ['N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N']
    ];

    var n = board.length;
    var rowCounter = new Array();
    var colCounter = new Array();
    var crossCounter = 0;
    var backcrossCounter = 0;
    // initialize the arrays
    for (var i = 0; i < n; i++) {
        rowCounter[i] = 0;
        colCounter[i] = 0;
    }


    // mimic the play process, player X and O make move alternatively.

    makeMove(0, 0, 'X');
    makeMove(1, 0, 'O');

    makeMove(1, 1, 'X');
    makeMove(2, 3, 'O');

    makeMove(2, 2, 'X');
    makeMove(3, 2, 'O');

    makeMove(3, 3, 'X');


    function makeMove(row, col, x) {
        board[row][col] = x;
        console.log('######################');
        console.log();
        console.log('Current state of the board...')
        console.log(board);


        if (x === 'X') {
            rowCounter[row]++;
            colCounter[col]++;
            if (row === col) {
                crossCounter++;
            }
            if (row + col === n -1) {
                backcrossCounter++;
            }
            console.log('checking the board...');


            if (rowCounter === n || colCounter == n || crossCounter === n || backcrossCounter === n ) {
                console.log('Player X won!');
            } else {
                console.log('Nobody won the game yet!')
            }
        }
        if (x === 'O') {
            rowCounter[row]--;
            colCounter[col]--;
            if (row === col) {
                crossCounter--;
            }
            if (row + col === n -1) {
                backcrossCounter--;
            }
            if (rowCounter === -n || colCounter === -n || crossCounter === -n || backcrossCounter === -n ) {
                console.log('Player O won!');
            } else {
                console.log('Nobody won the game yet!')
            }
        }

        console.log('row counter: ', rowCounter);
        console.log('col counter: ', colCounter);
        console.log('cross counter: ', crossCounter);
        console.log('backcross counter: ', backcrossCounter);
        console.log();
    }

})();


