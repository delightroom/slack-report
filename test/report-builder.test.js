'use strict';

const test = require('ava').test;
const ReportBuilder = require('../src/ReportBuilder');
const Report = require('../src/Report');
const {formatString} = require('../src/util');

const Color = ReportBuilder.Color;

test('sets color to color variable', t => {
	const reportBuilder = new ReportBuilder()
		.color(Color.GOOD);
	t.is(reportBuilder._color, Color.GOOD);
});

test('throws an error when the parameter of color is not a string', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder() /* eslint no-unused-vars: "off" */
			.color(100);
	});
	t.is(error.message, 'color only allows string parameter.');
});

test('throws an error when the parameter of color is not hex color', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder() /* eslint no-unused-vars: "off" */
			.color('this is not hex');
	});
	t.is(error.message, `color only allows hex code color or the option provided by ReportBuilder.Color.`);
});

test('sets url to url variable', t => {
	const reportBuilder = new ReportBuilder()
		.icon('https://report-icon.com');
	t.is(reportBuilder._icon, 'https://report-icon.com');
});

test('throws an error when the parameter of icon does not start with http', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.icon('www.google.com');
	});
	t.is(error.message, 'icon only allows url which starts with http or https.');
});

test('sets category to category variable', t => {
	const reportBuilder = new ReportBuilder()
		.category('general');
	t.is(reportBuilder._category, 'general');
});

test('casts non-string parameter of category to a string and stores it to category variable.', t => {
	const reportBuilder = new ReportBuilder()
		.category(1);
	t.is(reportBuilder._category, '1');
});

test('sets title to title variable', t => {
	const reportBuilder = new ReportBuilder()
		.title('report');
	t.is(reportBuilder._title, 'report');
});

test('casts non-string title parameter to a string and stroes it to title varaible', t => {
	const reportBuilder = new ReportBuilder()
		.title(1);
	t.is(reportBuilder._title, '1');
});

test('sets titleLink parameter to titleLink variable', t => {
	const reportBuilder = new ReportBuilder()
		.title('report', 'https://title-link.com');
	t.is(reportBuilder._titleLink, 'https://title-link.com');
});

test('throws an error when the titleLink is not a url string', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.title(1, 'www.google.com');
	});
	t.is(error.message, 'titleLink should be a url string.');
});

test('sets description parameter with code markdown to description variable', t => {
	const reportBuilder = new ReportBuilder()
		.description('description');
	t.is(reportBuilder._description, '```description```');
});

test('casts non-string description parameter to string and stores it into description variable', t => {
	const reportBuilder = new ReportBuilder()
		.description(101);
	t.is(reportBuilder._description, '```101```');
});

test('set publisher parameter to publisher variable', t => {
	const reportBuilder = new ReportBuilder()
		.publisher('publisher');
	t.is(reportBuilder._publisher, 'publisher');
});

test('casts non-string publisher parameter to string and stores it into publisher variable', t => {
	const reportBuilder = new ReportBuilder()
		.publisher(101);
	t.is(reportBuilder._publisher, '101');
});

test('sets publisherLink parameter to publisherLink variable', t => {
	const reportBuilder = new ReportBuilder()
		.publisher(101, 'https://publisher-link.com');
	t.is(reportBuilder._publisherLink, 'https://publisher-link.com');
});

test('throws an error when the publisherLink is not a url string', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.publisher(101, 'publisher-link.com');
	});
	t.is(error.message, 'publisherLink should be a url string.');
});

test('casts publishTime as unix timestamp and stores it to publishTime variable', t => {
	const now = Date.now();
	const reportBuilder = new ReportBuilder()
		.publishTime(now);
	t.is(reportBuilder._publishTime, Math.floor(now / 1000));
});

test('throws an error when the passed publishTime is not a timestamp', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.publishTime('today');
	});
	t.is(error.message, 'publishTime should be a 13-digit timestamp.');
});

test('stores the name and data passed by metric to metrics array variable', t => {
	const name = 'Today';
	const data = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	const reportBuilder = new ReportBuilder()
		.metric(name, data);
	t.deepEqual(reportBuilder._metrics, [{
		title: name,
		value: formatString(data),
		short: true
	}]);
});

test('stores the name, data and short passed by metric to metrics array variable', t => {
	const name = 'Today';
	const data = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	const reportBuilder = new ReportBuilder()
		.metric(name, data, false);
	t.deepEqual(reportBuilder._metrics, [{
		title: name,
		value: formatString(data),
		short: false
	}]);
});

test('pushs the name and data passed by second metric call to metrics array', t => {
	const name = 'Today';
	const data = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	const reportBuilder = new ReportBuilder()
		.metric(name, data)
		.metric(name, data);
	t.deepEqual(reportBuilder._metrics, [
		{title: name, value: formatString(data), short: true},
		{title: name, value: formatString(data), short: true}
	]);
});

test('throws an error when the short parameter is not a boolean type', t => {
	const name = 'Today';
	const data = [['DAU', '200', '(+2.0%)']];
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.metric(name, data, 'long');
	});
	t.is(error.message, 'The short parameter should be a boolean type.');
});

test('throws an error when invoking build without title', t => {
	const error = t.throws(() => {
		const report = new ReportBuilder() /* eslint no-unused-vars: "off" */
			.build();
	});
	t.is(error.message, 'The title should be defined.');
});

test('throws an error when invoking build withouth metrics', t => {
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
		.metric('name', [['1', '2', '3']])
		.build();
	t.is(report instanceof Report, true);
});
