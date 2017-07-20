'use strict';

const assert = require('chai').assert;
const simple = require('../../strategies/simple');
const Game = require('../../game');
const Board = require('../../board');

function setupGame(board) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

describe('Simple strategy', function () {
	describe('given a game with one available space on its board', function () {
		it('should return the available space', function () {
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
			assert.deepEqual(simple(gameFirstSpace), [0,0]);
			assert.deepEqual(simple(gameLastSpace), [2,2]);
		});
	});
	describe('given a game with multiple spaces available in its board', function () {
		it('should return the first available space', function () {
			const boardWithAllSpacesAvailable = [
				[null,null,null],
				[null,null,null],
				[null,null,null]
			];
			const boardWithTwoSpacesAvailable = [
				['x','o',null],
				['x','x',null],
				['o','x','o']
			];
			const boardWithFourSpacesAvailable = [
				['x',null,'x'],
				[null,'x','o'],
				[null,null,'o']
			];
			const gameAll = setupGame(boardWithAllSpacesAvailable);
			const gameTwo = setupGame(boardWithTwoSpacesAvailable);
			const gameFour = setupGame(boardWithFourSpacesAvailable);
			assert.deepEqual(simple(gameAll), [0,0]);
			assert.deepEqual(simple(gameTwo), [0,2]);
			assert.deepEqual(simple(gameFour), [0,1]);
		});
	});
});
