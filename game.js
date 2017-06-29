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

module.exports = Game;