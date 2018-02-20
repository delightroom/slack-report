'use strict';

const test = require('ava').test;
const ReportBuilder = require('../src/ReportBuilder');
const Report = require('../src/Report');
const {valueString} = require('../src/util');

const Color = ReportBuilder.Color;

test('sets color to color variable', t => {
	const reportBuilder = new ReportBuilder()
		.withColor(Color.GOOD);
	t.is(reportBuilder.color, Color.GOOD);
});

test('throws an error when the parameter of withColor is not a string', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder() /* eslint no-unused-vars: "off" */
			.withColor(100);
	});
	t.is(error.message, 'withColor only allows string parameter.');
});

test('throws an error when the parameter of withColor is not hex color', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder() /* eslint no-unused-vars: "off" */
			.withColor('this is not hex');
	});
	t.is(error.message, `withColor only allows hex code color or the option provided by ReportBuilder.Color.`);
});

test('sets url to url variable', t => {
	const reportBuilder = new ReportBuilder()
		.withIcon('https://report-icon.com');
	t.is(reportBuilder.icon, 'https://report-icon.com');
});

test('throws an error when the parameter of withIcon does not start with http', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.withIcon('www.google.com');
	});
	t.is(error.message, 'withIcon only allows url which starts with http or https.');
});

test('sets category to category variable', t => {
	const reportBuilder = new ReportBuilder()
		.withCategory('general');
	t.is(reportBuilder.category, 'general');
});

test('casts non-string parameter of withCategory to a string and stores it to category variable.', t => {
	const reportBuilder = new ReportBuilder()
		.withCategory(1);
	t.is(reportBuilder.category, '1');
});

test('sets title to title variable', t => {
	const reportBuilder = new ReportBuilder()
		.withTitle('report');
	t.is(reportBuilder.title, 'report');
});

test('casts non-string title parameter to a string and stroes it to title varaible', t => {
	const reportBuilder = new ReportBuilder()
		.withTitle(1);
	t.is(reportBuilder.title, '1');
});

test('sets titleLink parameter to titleLink variable', t => {
	const reportBuilder = new ReportBuilder()
		.withTitle('report', 'https://title-link.com');
	t.is(reportBuilder.titleLink, 'https://title-link.com');
});

test('throws an error when the titleLink is not a url string', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.withTitle(1, 'www.google.com');
	});
	t.is(error.message, 'titleLink should be a url string.');
});

test('sets description parameter with code markdown to description variable', t => {
	const reportBuilder = new ReportBuilder()
		.withDescription('description');
	t.is(reportBuilder.description, '```description```');
});

test('casts non-string description parameter to string and stores it into description variable', t => {
	const reportBuilder = new ReportBuilder()
		.withDescription(101);
	t.is(reportBuilder.description, '```101```');
});

test('set publisher parameter to publisher variable', t => {
	const reportBuilder = new ReportBuilder()
		.withPublisher('publisher');
	t.is(reportBuilder.publisher, 'publisher');
});

test('casts non-string publisher parameter to string and stores it into publisher variable', t => {
	const reportBuilder = new ReportBuilder()
		.withPublisher(101);
	t.is(reportBuilder.publisher, '101');
});

test('sets publisherLink parameter to publisherLink variable', t => {
	const reportBuilder = new ReportBuilder()
		.withPublisher(101, 'https://publisher-link.com');
	t.is(reportBuilder.publisherLink, 'https://publisher-link.com');
});

test('throws an error when the publisherLink is not a url string', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.withPublisher(101, 'publisher-link.com');
	});
	t.is(error.message, 'publisherLink should be a url string.');
});

test('casts publishTime as unix timestamp and stores it to publishTime variable', t => {
	const now = Date.now();
	const reportBuilder = new ReportBuilder()
		.withPublishTime(now);
	t.is(reportBuilder.publishTime, Math.floor(now / 1000));
});

test('throws an error when the passed publishTime is not a timestamp', t => {
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.withPublishTime('today');
	});
	t.is(error.message, 'publishTime should be a 13-digit timestamp.');
});

test('stores the name and data passed by withMetric to metrics array variable', t => {
	const name = 'Today';
	const data = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	const reportBuilder = new ReportBuilder()
		.withMetric(name, data);
	t.deepEqual(reportBuilder.metrics, [{
		title: name,
		value: valueString(data),
		short: true
	}]);
});

test('stores the name, data and short passed by withMetric to metrics array variable', t => {
	const name = 'Today';
	const data = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	const reportBuilder = new ReportBuilder()
		.withMetric(name, data, false);
	t.deepEqual(reportBuilder.metrics, [{
		title: name,
		value: valueString(data),
		short: false
	}]);
});

test('pushs the name and data passed by second withMetric call to metrics array', t => {
	const name = 'Today';
	const data = [
		['DAU', '200', '(+2.0%)'],
		['MAU', '1000', '(+4.0%)']
	];
	const reportBuilder = new ReportBuilder()
		.withMetric(name, data)
		.withMetric(name, data);
	t.deepEqual(reportBuilder.metrics, [
		{title: name, value: valueString(data), short: true},
		{title: name, value: valueString(data), short: true}
	]);
});

test('throws an error when the short parameter is not a boolean type', t => {
	const name = 'Today';
	const data = [['DAU', '200', '(+2.0%)']];
	const error = t.throws(() => {
		const reportBuilder = new ReportBuilder()
			.withMetric(name, data, 'long');
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
			.withTitle('test')
			.build();
	});
	t.is(error.message, 'The metrics should be defined.');
});

test('returns an instance of Report', t => {
	const report = new ReportBuilder()
		.withTitle('title')
		.withMetric('name', [['1', '2', '3']])
		.build();
	t.is(report instanceof Report, true);
});
