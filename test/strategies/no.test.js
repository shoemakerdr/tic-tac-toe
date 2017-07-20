'use strict';

const assert = require('chai').assert;
const no = require('../../strategies/no');
const Game = require('../../game');
const Board = require('../../board');

function setupGame(board) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

describe('No strategy', function () {
	describe('when given any game', function () {
		const boardWithFirstSpaceAvailable = [
			[null,'o','x'],
			['x','o','o'],
			['o','x','x']
		];
		const gameFirstSpace = setupGame(boardWithFirstSpaceAvailable);
		const boardWithLastSpaceAvailable = [
			['x','o','x'],
			['x','o','o'],
			['o','x',null]
		];
		const gameLastSpace = setupGame(boardWithLastSpaceAvailable);
		it('will return null', function () {
			assert.equal(no(gameFirstSpace), null);
			assert.equal(no(gameLastSpace), null);
		});
	});
});
