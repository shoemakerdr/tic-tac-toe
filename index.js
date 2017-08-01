
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

function easyGame(player) {
    const board = new Board();
    if (player === 'o')
        return new Game(board, simpleStrategy, noStrategy);
    if (player === 'x' || player === undefined)
        return new Game(board, noStrategy, simpleStrategy);
}

function unbeatableGame(player) {
    const board = new Board();
    if (player === 'o')
        return new Game(board, unbeatableStrategy, noStrategy);
    if (player === 'x' || player === undefined)
        return new Game(board, noStrategy, unbeatableStrategy);
}

module.exports = {
    twoPlayerGame,
    easyGame,
    unbeatableGame
};
