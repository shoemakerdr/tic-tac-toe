'use strict';

const assert = require('chai').assert;
const minimax = require('../../strategies/minimax');
const Game = require('../../game');
const Board = require('../../board');

function setupGame(board, player) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

describe('Minimax module', function () {
	describe('opponent function', function () {
		describe('when given a player', function () {
			it('should return that player\'s opponent', function () {
				assert.equal(minimax.getOpponent('x'), 'o');
				assert.equal(minimax.getOpponent('o'), 'x');
			});
		});
	});
	describe('isEmpty function', function () {
		describe('when given an empty game', function () {
			const emptyBoard = [
				[null,null,null],
				[null,null,null],
				[null,null,null]
			];
			const emptyGame = setupGame(emptyBoard);
			it('will return true', function () {
				assert.isTrue(minimax.isEmpty(emptyGame));
			});
		});
		describe('when given a non-empty game', function () {
			const oneMoveBoard = [
				[null,null,null],
				[null,'x',null],
				[null,null,null]
			];
			const oneMoveGame = setupGame(oneMoveBoard);
			it('will return true', function () {
				assert.isFalse(minimax.isEmpty(oneMoveGame));
			});
		});
	});
	describe('score function', function () {
		describe('given a completed game ending in a draw', function () {
			const drawBoard = [
				['o', 'x', 'x'],
				['x', 'o', 'o'],
				['x', 'o', 'x']
			];
			const drawGame = setupGame(drawBoard);
			it('should return 0', function () {
				assert.equal(minimax.score(drawGame, null, 'x', 'o'), 0);
			});
		});
		describe('given a completed game where player won', function () {
			const playerWinBoard = [
				[null,null,'x'],
				[null,'x',null],
				['x','o','o']
			];
			const playerWinGame = setupGame(playerWinBoard);
			it('should return a number greater than 0', function () {
				assert.isTrue(minimax.score(playerWinGame, 0, 'x', 'o') > 0);
			});
		});
		describe('given a completed game where player lost', function () {
			const playerLoseBoard = [
				['x',null,'x'],
				[null,'x',null],
				['o','o','o']
			];
			const playerLoseGame = setupGame(playerLoseBoard);
			it('should return a number less than 0', function () {
				assert.isTrue(minimax.score(playerLoseGame, 0, 'x', 'o') < 0);
			});
		});
	});
	describe('possibleGame function', function () {
		describe('given a move and a game', function () {
			const oneMoveBoard = [
				[null,null,null],
				[null,'x',null],
				[null,null,null]
			];
			const oneMoveGame = setupGame(oneMoveBoard);
			oneMoveGame.nextPlayer();
			const emptyBoard = [
				[null,null,null],
				[null,null,null],
				[null,null,null]
			];
			const emptyGame = setupGame(emptyBoard);
			const move = [1,1];
			const possibleGame = minimax.possibleGame(move, emptyGame);
			it('should return a new copy of the game, not a reference to the old game', function () {
				assert.isFalse(possibleGame === oneMoveGame);
			});
			it('should have a copy of the game board but with the new move added', function () {
				assert.deepEqual(possibleGame.getBoardSpaces(), oneMoveGame.getBoardSpaces());
			});
			it('should set the current player to the next player', function () {
				assert.equal(possibleGame.getCurrentPlayer(), 'o');
			});
		});
	});
	describe('getMinimax function', function () {
		describe('when given a player and opponent', function () {
			it('should return a new minimax function', function () {
				const mm = minimax.getMinimax('x', 'o');
				assert.isTrue(typeof mm === 'function');
			});
		});
		/**
		 * TODO:
		 * add test for returned function
		 */
	});
});
