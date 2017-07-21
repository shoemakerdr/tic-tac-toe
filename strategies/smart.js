'use strict';

const mm = require('./minimax');

function smart (game) {
	return mm.chooseMove(game);
}

module.exports = smart;
