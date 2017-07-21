'use strict';

const assert = require('chai').assert;
const player = require('../player');

describe('player function', function () {
	describe('when given a valid strategy', function () {
		const noStrategy = player('no');
		const simpleStrategy = player('simple');
		const smartStrategy = player('smart');
		it('should return a function', function () {
			assert.isTrue(typeof noStrategy === 'function');
			assert.isTrue(typeof simpleStrategy === 'function');
			assert.isTrue(typeof smartStrategy === 'function');
		});
	});
});
