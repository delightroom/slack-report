'use strict';

const test = require('ava').test;
const SlackReport = require('../src/ReportBuilder');
const basicAtt = require('./attachments/basic.json');
const singleColumnAtt = require('./attachments/single-column.json');
const fullAtt = require('./attachments/full.json');

const Color = SlackReport.Color;

const dau = [['Total', '10.2m', '(+2.0%)'], ['Android', '8.12m', '(+1.8%)'], ['iOS', '2.13m', '(+2.2%)']];
const mau = [['Total', '50.3m', '(+1.2%)'], ['Android', '38.2m', '(+0.8%)'], ['iOS', '12.1m', '(+0.4%)']];
const newUsers = [['Total', '21.2k', '(+4.2%)'], ['Android', '10.1k', '(+3.8%)'], ['iOS', '11.1k', '(+1.4%)']];
const download = [['Total', '502m', '(+1.2%)'], ['Android', '351m', '(+0.8%)'], ['iOS', '150m', '(+0.4%)']];

test('throws an error when slack url is not valid', t => {
	const report = new SlackReport()
		.withTitle('title')
		.withMetric('dau', [['1', '2']])
		.build();
	const error = t.throws(() => {
		report.publish('http://www.google.com');
	});
	t.is(error.message, `The slack webhook url should starts with 'https://hooks.slack.com/services/'`);
});

test('returns basic attachement object', t => {
	const report = new SlackReport()
		.withTitle('Daily User Report')
		.withMetric('DAU', dau)
		.build();
	t.deepEqual(report.attachments, basicAtt);
});

test('returns single-column attachement object', t => {
	const report = new SlackReport()
		.withTitle('Daily User Report')
		.withMetric('DAU', dau)
		.withMetric('MAU', mau)
		.withMetric('NEW', newUsers, false)
		.build();
	t.deepEqual(report.attachments, singleColumnAtt);
});

test('returns full attachement object', t => {
	const report = new SlackReport()
		.withColor(Color.GOOD)
		.withIcon('https://author.icon.png')
		.withCategory('Alarmy')
		.withTitle('Daily User Report', 'https://title.link')
		.withMetric('DAU', dau)
		.withMetric('MAU', mau)
		.withMetric('NEW', newUsers)
		.withMetric('DWNLD', download)
		.withDescription('Description: this is a sample report made by Slack Report.')
		.withPublisher('Zeppelin', 'https://footer.icon.png')
		.withPublishTime(1500000000000)
		.build();
	t.deepEqual(report.attachments, fullAtt);
});
