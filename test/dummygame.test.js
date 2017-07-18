'use strict';

const assert = require('chai').assert;
const dummyGame = require('../dummygame')
const Game = require('../game');
const Board = require('../board');

function setupGame(board, currentPlayer) {
	const game = new Game(new Board());
	if (board) game.setBoardSpaces(board);
	if (currentPlayer) game.setCurrentPlayer(currentPlayer);
	return game;
}

describe('dummyGame', function () {
	describe('when given an empty game', function () {
		const emptyGame = setupGame();
		const emptyBoard = emptyGame.getBoardSpaces();
		const dummy = dummyGame(emptyGame);
		it('should return a copy of the game with "x" as the current player and an empty board', function () {
			assert.deepEqual(dummy.getCurrentPlayer(), 'x');
			assert.deepEqual(dummy.getBoardSpaces(), emptyBoard);
		});
		it('should not return the same board, only a copy', function () {
			const dummyBoard = dummy.getBoardSpaces();
			assert.isFalse(dummyBoard === emptyBoard, 'the dummy board should not be the same reference as the incoming board');
		});
	});
	describe('when given a game with one move made', function () {
		it('should return a copy of the game with "o" as the current player and the same board configuration', function () {
			const oneMoveBoard = [
		        [null,null,null],
		        [null,null,null],
		        [null,null,'x']
		    ];
			const oneMoveGame = setupGame(oneMoveBoard, 'o');
			const dummy = dummyGame(oneMoveGame);

			assert.deepEqual(dummy.getCurrentPlayer(), 'o');
			assert.deepEqual(dummy.getBoardSpaces(), oneMoveBoard);
		});
	});
	describe('when given a game with two moves made', function () {
		it('should return a copy of the game with "x" as the current player and the same board configuration', function () {
			const twoMoveBoard = [
		        [null,null,null],
		        [null,'o',null],
		        [null,null,'x']
		    ];
			const twoMoveGame = setupGame(twoMoveBoard);
			const dummy = dummyGame(twoMoveGame);

			assert.deepEqual(dummy.getCurrentPlayer(), 'x');
			assert.deepEqual(dummy.getBoardSpaces(), twoMoveBoard);
		});
	});
});
