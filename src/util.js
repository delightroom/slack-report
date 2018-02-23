'use strict';

const {table} = require('table');
const config = require('./config.json');

function isTwoDimensionalArray(array) {
	// Check first dimension
	const validFirstDimension = Array.isArray(array);
	if (validFirstDimension === false) {
		return false;
	}

	// Check second dimension
	const validSecondDimension = array.reduce((result, _) => {
		result = result && Array.isArray(_);
		return result;
	}, true);
	if (validSecondDimension === false) {
		return false;
	}

	// Check values are string or numeric values
	const validValueTypes = array.reduce((result, _) => {
		const subResult = _.reduce((valueResult, value) => {
			const isValidType = (isNaN(value) === false) || (typeof value === 'string');
			valueResult = valueResult && isValidType;
			return valueResult;
		}, true);
		result = result && subResult;
		return result;
	}, true);
	return validValueTypes;
}

function formatString(data) {
	return '```' + table(data, config.table) + '```';
}

const re = {
	hexCode: /#[0-9A-Fa-f]{6}/,
	url: /^http(s)?:\/\/[^ "]+$/,
	timestamp: /^\d{13}$/,
	slackUrl: /^https:\/\/hooks.slack.com\/services\//
};

module.exports = {
	isTwoDimensionalArray,
	formatString,
	re
};
