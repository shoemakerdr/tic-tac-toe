'use strict';

const assert = require('chai').assert;
const SmartPlayer = require('../../players/smartplayer');
const Game = require('../../game');
const Board = require('../../board');

function setupGame(board) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

describe('Smart Player', function () {
	const smartPlayer = new SmartPlayer();
	describe('given a game with one available space on its board', function () {
		it('should return the available space', function () {
			const boardWithFirstSpaceAvailable = [
				[null,'o','x'],
				['x','o','o'],
				['o','x','x']
			];
			const boardWithLastSpaceAvailable = [
				['x','o','x'],
				['x','o','o'],
				['o','x',null]
			];
			const gameFirstSpace = setupGame(boardWithFirstSpaceAvailable);
			const gameLastSpace = setupGame(boardWithLastSpaceAvailable);
			assert.deepEqual(smartPlayer.makeMove(gameFirstSpace), [0,0]);
			assert.deepEqual(smartPlayer.makeMove(gameLastSpace), [2,2]);
		});
	});
	describe('given a game with an empty board', function () {
		it('should return the center square as its move', function () {
			const emptyBoard = [
				[null,null,null],
				[null,null,null],
				[null,null,null]
			];
			const gameEmpty = setupGame(emptyBoard);
			assert.deepEqual(smartPlayer.makeMove(gameEmpty), [1,1]);
		});
	});
	describe('given a game in which the opponent "x" took a corner space', function () {
		it('should return the center square as its move', function () {
			const opponentCornerMoveBoard = [
				[null,null,null],
				[null,null,null],
				[null,null,'x']
			];
			const gameOpponentCorner = setupGame(opponentCornerMoveBoard);
			assert.deepEqual(smartPlayer.makeMove(gameOpponentCorner), [1,1]);
		});
	});
	// describe('given a game in which the opponent took two adjacent corner spaces and smart player took the center space', function () {
	// 	it('should return the space between the opponents adjacent corners', function () {
	// 		const opponentAdjacentCornersMoveBoard = [
	// 			[null,null,'x'],
	// 			[null,'o',null],
	// 			[null,null,'x']
	// 		];
	// 		const gameOpponentAdjacentCorners = setupGame(opponentAdjacentCornersMoveBoard)
	// 		assert.deepEqual(smartPlayer.makeMove(gameOpponentAdjacentCorners), [1,2]);
	// 	});
	// });
});
