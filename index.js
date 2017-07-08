
const Game = require('./game');
const Board = require('./board');

function twoPlayerGame() {
    const board = new Board();
    return new Game(board);
}

exports.twoPlayerGame = twoPlayerGame;
