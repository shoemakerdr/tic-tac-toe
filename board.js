'use strict';

function Board() {
    this.spaces = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ];
}

Board.prototype.resetBoard = function() {
    this.spaces = this.spaces.map(row => row.map(space => null));
};

Board.prototype.addMove = function (player, row, column) {
    if (this.isSpaceOccupied(row, column)) {
        throw new Error('This space is already occupied!');
    }
    else this.spaces[row][column] = player;
};

Board.prototype.isFull = function() {
    const rows = 3;
    for (let row = 0; row < rows; row++) {
        if (this.spaces[row].indexOf(null) > -1)
            return false;
    }
    return true;
};

Board.prototype.isSpaceOccupied = function (row, column) {
    return (this.spaces[row][column] !== null);
};

Board.prototype.isWinner = function(player) {
    const spaces = this.spaces;
    return rowWin(player) || columnWin(player) || diagonalWin(player);
    
    function rowWin(player) {
        const rows = 3;
        for (let row = 0; row < rows; row++) {
            if (
                spaces[row][0] === player 
                && spaces[row][1] === player 
                && spaces[row][2] === player
            )
                return true;
        }
        return false;
    }
    
    function columnWin(player) {
        const columns = 3;
        
        for (let column = 0; column < columns; column++) {
            if (
                spaces[0][column] === player 
                && spaces[1][column] === player 
                && spaces[2][column] === player
            )
                return true;
        }
        return false;
    }
    
    function diagonalWin(player) {
        const leftToRight = spaces[0][0] === player 
                            && spaces[1][1] === player 
                            && spaces[2][2] === player;
        const rightToLeft = spaces[0][2] === player 
                            && spaces[1][1] === player 
                            && spaces[2][0] === player;
        if (leftToRight || rightToLeft)
            return true;
        return false;
    }
};

module.exports = Board;