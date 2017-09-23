'use strict';

import { assert } from 'chai'
import Game from '../../game'
import Board from '../../board'
import none from '../../strategies/none'

function setupGame(board) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

describe('A strategy of "none"', function () {
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
			assert.equal(none(gameFirstSpace), null);
			assert.equal(none(gameLastSpace), null);
		});
	});
});
