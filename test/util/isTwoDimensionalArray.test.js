'use strict';

const test = require('ava').test;
const {isTwoDimensionalArray} = require('../../src/util');

test('returns true when the array is two dimensional and its values are valid types', t => {
	const array = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	t.is(isTwoDimensionalArray(array), true);
});

test('returns false when the array is not two dimensional', t => {
	const oneDimensionalArray = ['a', 'b', 'c'];
	t.is(isTwoDimensionalArray(oneDimensionalArray), false);
});

test('returns false when the values of the two dimensional value is an object', t => {
	const inValidTypeArray = [
		[{value: 'invalid'}, '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	t.is(isTwoDimensionalArray(inValidTypeArray), false);
});

test('returns false when the values of the two dimensional value is an array', t => {
	const inValidTypeArray = [
		[['invalid', 'value'], '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	t.is(isTwoDimensionalArray(inValidTypeArray), false);
});
