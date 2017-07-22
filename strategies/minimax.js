'use strict';

let choice;

function chooseMove(game) {
	const player = game.getCurrentPlayer();
	const opponent = getOpponent(player);
	const minimax = getMinimax(player, opponent);
	if (isEmpty(game)) return [1,1];
	let initialDepth = 0;
	minimax(game, initialDepth);
	return choice;
}

function getOpponent (player) {
	return (player === 'x') ? 'o' : 'x';
}

function isEmpty(game) {
	return game.getAvailableSpaces().length === 9;
}

function score(game, depth, player, opponent) {
	return game.isWinner(player)
			? (10 - depth)
			: game.isWinner(opponent)
				? (depth - 10)
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

function possibleGame (move, game) {
	const dummy = game.dummyGame();
	dummy.board.addMove(game.getCurrentPlayer(), move[0], move[1]);
	dummy.nextPlayer();
	return dummy;
}

function getMinimax (player, opponent) {

	return minimax;

	function minimax(game, depth) {
		if (game.isGameOver())
			return score(game, depth, player, opponent);
		const newDepth = depth + 1;
		const scores = [];
		const moves = [];

		function playerMaxOpponentMin(letter) {
			const maxMinIndex = {
				[player]: maxIndex(scores),
				[opponent]: minIndex(scores)
			};
			const index = maxMinIndex[letter]
			choice = moves[index];
			return scores[index];
		}

		game.getAvailableSpaces().forEach(move => {
			const possible = possibleGame(move, game); // TODO
			const score = minimax(possible, newDepth);
			scores.push(score);
			moves.push(move);
		});

		// TODO: make getMinimax function for this conditional block
		return playerMaxOpponentMin(game.getCurrentPlayer());
	}
}

module.exports = {
	getOpponent,
	isEmpty,
	score,
	possibleGame,
	getMinimax,
	chooseMove
}
