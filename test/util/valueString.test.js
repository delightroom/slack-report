'use strict';

const test = require('ava').test;
const {valueString} = require('../../src/util');

test('converts two dimensional string to tab-separated string', t => {
	const data = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	t.is(valueString(data), 'DAU\t200\t(+2.0%)\nMAU\t1000\t(+4.0%)');
});
