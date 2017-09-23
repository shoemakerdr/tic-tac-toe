'use strict';

import { assert } from 'chai'
import { none, simple, unbeatable } from '../../strategies'

describe('strategies module', function () {
	describe('when given a valid strategy', function () {
		it('should return a function', function () {
			assert.isTrue(typeof none === 'function');
			assert.isTrue(typeof simple === 'function');
			assert.isTrue(typeof unbeatable === 'function');
		});
	});
});
