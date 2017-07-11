'use strict';

const assert = require('chai').assert;
const SmartPlayer = require('../../players/smartplayer');

describe('Smart Player', function () {
	const smartPlayer = new SmartPlayer();
	describe('given a board with one available space', function () {
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
			assert.deepEqual(smartPlayer.makeMove(boardWithFirstSpaceAvailable), [0,0]);
			assert.deepEqual(smartPlayer.makeMove(boardWithLastSpaceAvailable), [2,2]);
		});
	});
	describe('given an empty board', function () {
		it('should return the center square as its move', function () {
			const emptyBoard = [
				[null,null,null],
				[null,null,null],
				[null,null,null]
			];
			assert.deepEqual(smartPlayer.makeMove(emptyBoard), [1,1]);
		})
	})
});
