'use strict';

const SimplePlayer = require('./simpleplayer');

function SmartPlayer() {

}

SmartPlayer.prototype = Object.create(SimplePlayer.prototype);

SmartPlayer.prototype.makeMove = function (board) {
	if (this.availableBoardSpaces(board).length === 9) {
		return [1,1];
	}
	else return SimplePlayer.prototype.makeMove.call(this, board);
};

module.exports = SmartPlayer;
