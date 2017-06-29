'use strict';

function Board() {
    this.spaces = [
        null,null,null,
        null,null,null,
        null,null,null
    ];
}

Board.prototype.resetBoard = function() {
    this.spaces = this.spaces.map(space => null);
};

Board.prototype.addMove = function (player, index) {
    if (this.isSpaceOccupied(index)) {
        throw new Error('This space is already occupied!');
    }
    else this.spaces[index] = player;
};

Board.prototype.isFull = function() {
    return this.spaces.indexOf(null) === -1;
};

Board.prototype.isSpaceOccupied = function (index) {
    return (this.spaces[index] !== null);
};

Board.prototype.isWinner = function(player) {
    const spaces = this.spaces;
    return rowWin(player) || columnWin(player) || diagonalWin(player);
    
    function rowWin(player) {
        const rows = 3;
        for (let row = 0, column = 0; row < rows; row++) {
            if (spaces[column] === player 
                && spaces[column + 1] === player 
                && spaces[column + 2] === player)
                return true;
            column += 3;
        }
        return false;
    }
    
    function columnWin(player) {
        const columns = 3;
        
        for (let column = 0, row = 0; column < columns; column++) {
            if (spaces[row] === player 
                && spaces[row + 3] === player 
                && spaces[row + 6] === player)
                return true;
            row++;
        }
        return false;
    }
    
    function diagonalWin(player) {
        const leftToRight = spaces[0] === player 
                            && spaces[4] === player 
                            && spaces[8] === player;
        const rightToLeft = spaces[2] === player 
                            && spaces[4] === player 
                            && spaces[6] === player;
        if (leftToRight || rightToLeft)
            return true;
        return false;
    }
};

module.exports = Board;