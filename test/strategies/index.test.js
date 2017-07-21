'use strict';

const assert = require('chai').assert;
const strategies = require('../../strategies');

describe('strategies module', function () {
	describe('when given a valid strategy', function () {
		const noStrategy = strategies['no'];
		const simpleStrategy = strategies['simple'];
		const smartStrategy = strategies['smart'];
		it('should return a function', function () {
			assert.isTrue(typeof noStrategy === 'function');
			assert.isTrue(typeof simpleStrategy === 'function');
			assert.isTrue(typeof smartStrategy === 'function');
		});
	});
});
