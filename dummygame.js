'use strict';

const Game = require('./game');
const Board = require('./board');

function dummyGame (game) {
	const board = new Board(game.board.spaces.map(x => x.map(x => x)));
	const dummy = new Game(board);
	dummy.setCurrentPlayer(game.currentPlayer);
	return dummy;
}

module.exports = dummyGame;
