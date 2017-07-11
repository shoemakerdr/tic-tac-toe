'use strict';

function Player(strategy) {
}

Player.prototype.makeMove = function (row, column) {
	return [row, column];
};

module.exports = Player;
