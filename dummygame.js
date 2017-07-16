'use strict';

const Game = require('./game');

function dummyGame (game) {
	const dummy = new Game(game.board);
	dummy.setCurrentPlayer(game.currentPlayer);
	return dummy;
}

module.exports = dummyGame;
