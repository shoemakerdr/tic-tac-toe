
const Game = require('./game');
const Board = require('./board');

function twoPlayerGame(xStrategy, oStrategy) {
    const board = new Board();
    return new Game(board, xStrategy, oStrategy);
}

exports.twoPlayerGame = twoPlayerGame;
