
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
    return new Game(board, noStrategy, simpleStrategy);
}

function unbeatableGame() {
    const board = new Board();
    return new Game(board, noStrategy, unbeatableStrategy);
}

module.exports = {
    twoPlayerGame,
    easyGame,
    unbeatableGame
};
