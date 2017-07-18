'use strict';

const SimplePlayer = require('./simpleplayer');

function SmartPlayer(player, opponent, dummyGame) {
	this.player = player;
	this.opponent = opponent;
	this.dummyGame = dummyGame;
}

SmartPlayer.prototype = Object.create(SimplePlayer.prototype);

SmartPlayer.prototype.makeMove = function (game) {
	if (game.getBoardSpaces()[1][1] === null) {
		return [1,1];
	}
	else return SimplePlayer.prototype.makeMove.call(this, game);
};

module.exports = SmartPlayer;

function ai(game) {
	if (isEmpty(game)) return [1,1];
	let initialDepth = 0;
	let choice;
	minimax(game, initialDepth);
	return choice;

	function isEmpty(game) {
		return this.availableBoardSpaces(game.getBoardSpaces()).length === 9;
	}

	function score(game, depth) {
		return game.isWinner(this.player)
				? 10 - depth
				: game.isWinner(this.opponent)
					? depth - 10
					: 0;
	}

	function maxIndex(array) {
		const max = Math.max.apply(null, array);
		return array.indexOf(max);
	}

	function minIndex(array) {
		const min = Math.min.apply(null, array);
		return array.indexOf(min);
	}

	function minimax(game, depth) {
		if (game.isGameOver(game)) {
			const s = score(game, depth);
			return score(game, depth);
		}
		const newDepth = depth + 1;
		let scores = [];
		let moves = [];
		const spaces = game.getBoardSpaces;

		this.availableBoardSpaces(spaces).forEach(move => {
			const possible = this.createDummyGame(game, move); // returns new game with move added and current player changed
			const score = minimax(possible, newDepth);
			scores.push(score);
			moves.push(move);
		});

		if (game.currentPlayer === this.letter) {
			const max = maxIndex(scores);
			choice = moves[max];
			return scores[max];
		} else {
			const min = minIndex(scores);
			choice = moves[min];
			return scores[min];
		}
	}
}
