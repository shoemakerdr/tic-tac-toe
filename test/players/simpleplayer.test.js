'use strict';

const assert = require('chai').assert;
const SimplePlayer = require('../../players/simpleplayer');

describe('Simple Player', function () {
	const simplePlayer = new SimplePlayer();
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
			assert.deepEqual(simplePlayer.makeMove(boardWithFirstSpaceAvailable), [0,0]);
			assert.deepEqual(simplePlayer.makeMove(boardWithLastSpaceAvailable), [2,2]);
		});
	});
	describe('given a board with multiple spaces available', function () {
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
			assert.deepEqual(simplePlayer.makeMove(boardWithAllSpacesAvailable), [0,0]);
			assert.deepEqual(simplePlayer.makeMove(boardWithTwoSpacesAvailable), [0,2]);
			assert.deepEqual(simplePlayer.makeMove(boardWithFourSpacesAvailable), [0,1]);
		});
	});
});
