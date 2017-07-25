'use strict';

const assert = require('chai').assert;
const unbeatable = require('../../strategies/unbeatable');
const Game = require('../../game');
const Board = require('../../board');

function setupGame(board, player) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	game.setCurrentPlayer(player);
	return game;
}

describe('Unbeatable strategy', function () {
	describe('when given a game with an empty board', function () {
		const emptyBoard = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		const gameEmptyBoard = setupGame(emptyBoard, 'x');
		it('will return the center space', function () {
			const centerSpace = [1,1];
			assert.deepEqual(unbeatable(gameEmptyBoard), centerSpace);
		});
	});
	describe('when given a game where opponent is one move from winning', function () {
		const opponentCloseWinBoard = [
			[null, null, null],
			[null, 'x', null],
			['x', null, 'o']
		];
		const gameOpponentCloseWin = setupGame(opponentCloseWinBoard, 'o');
		it('will return the space that blocks opponent from winning', function () {
			const blockingSpace = [0,2];
			assert.deepEqual(unbeatable(gameOpponentCloseWin), blockingSpace);
		});
	});
	describe('when given a game where player is one move from winning', function () {
		const playerCloseWinBoard = [
			[null, null, 'o'],
			[null, 'o', null],
			[null, 'x', 'x']
		];
		const gamePlayerCloseWin = setupGame(playerCloseWinBoard, 'o');
		it('will return the space that wins the game', function () {
			const winningSpace = [2,0];
			assert.deepEqual(unbeatable(gamePlayerCloseWin), winningSpace);
		});
	});
});
