'use strict';

const assert = require('chai').assert;
const SimplePlayer = require('../../players/simpleplayer');
const Game = require('../../game');
const Board = require('../../board');

function setupGame(board) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

describe('Simple Player', function () {
	const simplePlayer = new SimplePlayer();
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
			assert.deepEqual(simplePlayer.makeMove(gameFirstSpace), [0,0]);
			assert.deepEqual(simplePlayer.makeMove(gameLastSpace), [2,2]);
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
			assert.deepEqual(simplePlayer.makeMove(gameAll), [0,0]);
			assert.deepEqual(simplePlayer.makeMove(gameTwo), [0,2]);
			assert.deepEqual(simplePlayer.makeMove(gameFour), [0,1]);
		});
	});
});
