
const Game = require('./game');
const Board = require('./board');
const strategies = require('./strategies');

const noStrategy = strategies['none'];
const simpleStrategy = strategies['simple'];
const unbeatableStrategy = strategies['unbeatable'];

function twoPlayerGame() {
    const board = new Board();
    return new Game(board, noStrategy, noStrategy);
}

function easyGame() {
    const board = new Board();
    return new Game(board, simpleStrategy, noStrategy);
}

function unbeatableGame() {
    const board = new Board();
    return new Game(board, unbeatableStrategy, noStrategy);
}

module.exports = {
    twoPlayerGame,
    easyGame,
    unbeatableGame
};
