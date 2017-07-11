'use strict';

function SimplePlayer() {
	
}

SimplePlayer.prototype.makeMove = function (board) {
	return this.availableBoardSpaces(board)[0];
};

SimplePlayer.prototype.availableBoardSpaces = function (board) {
    let available = [];
    const rows = 3;
    const columns = 3;
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (board[row][column] === null) {
                available.push([row,column]);
            }
        }
    }
    return available;
};

module.exports = SimplePlayer;
