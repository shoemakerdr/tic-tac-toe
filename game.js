'use strict';

function Game(board) {
    this.board = board;
    this.currentPlayer = 'x';
}

Game.prototype.turn = function (row, column) {
    this.board.addMove(this.currentPlayer, row, column);
    this.currentPlayer = (this.currentPlayer === 'x')
                          ? 'o'
                          : 'x';
};

Game.prototype.restart = function () {
    this.board.resetBoard();
    this.currentPlayer = 'x';
};

Game.prototype.availableSpaces = function () {
    return this.board.availableSpaces();
};

Game.prototype.getState = function () {
    if (!this.isGameOver())
        return `Current player is ${this.currentPlayer}`;
    else return this.isWinner('x')
                ? 'x is the winner'
                : this.isWinner('o')
                  ? 'o is the winner'
                  : 'Draw';
};

Game.prototype.isGameOver = function () {
    return this.isWinner('x') || this.isWinner('o') || this.board.isFull();
};

Game.prototype.isWinner = function(player) {
    const spaces = this.board.spaces;
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

module.exports = Game;
