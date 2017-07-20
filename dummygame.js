'use strict';

const Game = require('./game');

function dummyGame (game) {
	const dummy = new Game(game.board);
	dummy.setBoardSpaces(game.board.spaces.map(x => x.map(x => x)));
	dummy.setCurrentPlayer(game.currentPlayer);
	return dummy;
}

module.exports = dummyGame;
