'use strict';

function simple (game) {
	const length = game.getAvailableSpaces().length;
	const randomIndex = Math.floor(Math.random() * length);
	return game.getAvailableSpaces()[randomIndex];
}

module.exports = simple;
