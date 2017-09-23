'use strict';

import { assert } from 'chai'
import Game from '../../game'
import Board from '../../board'
import simple from '../../strategies/simple'

function setupGame(board) {
	const game = new Game(new Board())
	game.setBoardSpaces(board);
	return game;
}

function isValidMove (game, move) {
	const validMoves = game.getAvailableSpaces();
	for (let validMove of validMoves) {
		if (validMove[0] === move[0] && validMove[1] === move[1])
			return true;
	}
	return false;
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
		it('should return a valid available space', function () {
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
			assert.isTrue(isValidMove(gameAll, simple(gameAll)));
			assert.isTrue(isValidMove(gameTwo, simple(gameTwo)));
			assert.isTrue(isValidMove(gameFour, simple(gameFour)));
		});
	});
});
