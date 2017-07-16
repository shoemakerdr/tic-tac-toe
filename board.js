'use strict';

function Board(spaces) {
    this.spaces = spaces || [
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

Board.prototype.availableSpaces = function () {
    const spaces = this.spaces;
    let available = [];
    const rows = 3;
    const columns = 3;
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (spaces[row][column] === null) {
                available.push([row,column]);
            }
        }
    }
    return available;
};

module.exports = Board;
