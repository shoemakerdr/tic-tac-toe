'use strict';

const strategies = require('./strategies');

function player (strategy) {
	return strategies[strategy];
}

module.exports = player;
