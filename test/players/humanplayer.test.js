'use strict';

const assert = require('chai').assert;
const HumanPlayer = require('../../players/humanplayer');

describe('Human Player', function () {
	const humanPlayer = new HumanPlayer('human');
		it('should return the move it is given', function () {
			assert.deepEqual(humanPlayer.makeMove(0, 0), [0,0]);
		});
});
