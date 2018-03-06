'use strict';

const test = require('ava').test;
const ReportBuilder = require('../src/ReportBuilder');
const Report = require('../src/Report');
const {formatString} = require('../src/util');

const Color = ReportBuilder.Color;

test('sets title to _title variable', t => {
	const reportBuilder = new ReportBuilder()
		.title('report');
	t.is(reportBuilder._title, 'report');
});

test('casts non-string title parameter to a string and stroes it to _title varaible', t => {
	const reportBuilder = new ReportBuilder()
		.title(1);
	t.is(reportBuilder._title, '1');
});

test('sets titleLink parameter to _titleLink variable', t => {
	const reportBuilder = new ReportBuilder()
		.titleLink('https://title-link.com');
	t.is(reportBuilder._titleLink, 'https://title-link.com');
});

test('throws an error when the titleLink is not a url string', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.titleLink('www.google.com');
	});
	t.is(error.message, 'titleLink should be a url string.');
});

test('sets description parameter to _titleLink variable', t => {
	const reportBuilder = new ReportBuilder()
		.description('description');
	t.is(reportBuilder._description, 'description');
});

test('throws an error when invoking build function before setting title', t => {
	const error = t.throws(() => {
		const report = new ReportBuilder() /* eslint no-unused-vars: "off" */
			.build();
	});
	t.is(error.message, 'The title should be defined.');
});

test('throws an error when invoking build function before setting metrics', t => {
	const error = t.throws(() => {
		const report = new ReportBuilder() /* eslint no-unused-vars: "off" */
			.title('test')
			.build();
	});
	t.is(error.message, 'The metrics should be defined.');
});

test('returns an instance of Report', t => {
	const report = new ReportBuilder()
		.title('title')
		.metric([['1', '2', '3']])
		.build();
	t.is(report instanceof Report, true);
});

test('add data to _metrics array as a data field of an object', t => {
	const reportBuilder = new ReportBuilder()
		.metric([['1', '2', '3']]);
	t.is(Array.isArray(reportBuilder._metrics), true);
	t.deepEqual(reportBuilder._metrics[0].data, [['1', '2', '3']]);
});

test('throws an error when data parameter is not passed', t => {
	const error = t.throws(() => {
		(new ReportBuilder()).metric();
	});
	t.is(error.message, 'You should pass data to metric function.');
});

test('throws an error when data is not a two dimensional array', t => {
	const error = t.throws(() => {
		(new ReportBuilder()).metric(['one dimensioanl array']);
	});
	t.is(error.message, 'data parameter for metric should be a two dimensional array.');
});

test('throws an error when authorIcon option does not starts with http', t => {
	const error = t.throws(() => {
		(new ReportBuilder()).metric([['1']], {authorIcon: 'icon'});
	});
	t.is(error.message, 'authorIcon only allows url which starts with http or https.');
});

test('throws an error when timestamp option is not a 13-digits number', t => {
	const error = t.throws(() => {
		(new ReportBuilder()).metric([['1']], {timestamp: 'abc'});
	});
	t.is(error.message, 'timestamp should be a 13-digits.');
});

test('throws an error when color option is not hex code', t => {
	const error = t.throws(() => {
		(new ReportBuilder()).metric([['1']], {color: 'abc'});
	});
	t.is(error.message, 'color only allows hex code color or the option provided by ReportBuilder.Color.');
});
