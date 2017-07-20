'use strict';

const assert = require('chai').assert;
const smart = require('../../strategies/smart');
const Game = require('../../game');
const Board = require('../../board');

function setupGame(board) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

describe('Smart strategy', function () {
	describe('when given a game with an empty board', function () {
		const emptyBoard = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		const gameEmptyBoard = setupGame(emptyBoard);
		it('will return the center space', function () {
			const centerSpace = [1,1];
			assert.deepEqual(smart(gameEmptyBoard), centerSpace);
		});
	});
	// describe('when given a game where opponent is one move from winning', function () {
	// 	const opponentCloseWinBoard = [
	// 		[null, null, null],
	// 		[null, 'x', null],
	// 		['x', null, 'o']
	// 	];
	// 	const gameOpponentCloseWin = setupGame(opponentCloseWinBoard);
	// 	it('will return the space that blocks opponent from winning', function () {
	// 		const blockingSpace = [0,2];
	// 		assert.deepEqual(smart(gameOpponentCloseWin), blockingSpace);
	// 	})
	// })
});
