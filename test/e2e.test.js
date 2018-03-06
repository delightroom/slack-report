'use strict';

const test = require('ava').test;
const ReportBuilder = require('../src/ReportBuilder');
const basicAtt = require('./attachments/basic.json');
const fullAtt = require('./attachments/full.json');

const dau = [
	['Total', '100.2m', '⬆︎ +2.0%'],
	['Android', '80.12m', '⬆︎ +1.8%'],
	['iOS', '20.13m', '⬆︎ +2.2%']
];
const mau = [
	['Total', '50.3m', '⬆︎ +1.2%'],
	['Android', '38.2m', '⬆︎ +0.8%'],
	['iOS', '12.1m', '⬆︎ +0.4%']
];
const description = 'This is a sample report made by Slack Report.';

test('returns basic attachement object', t => {
	const reportBuilder = new ReportBuilder()
		.title('Daily User Report')
		.titleLink('https://title.link')
		.description(description);
	// Set DAU metric
	const dauOption = {
		title: 'DAU',
		description,
		color: '#36a64f',
		author: 'Zeppelin',
		authorIcon: 'https://author_icon.png',
		timestamp: 1234567890000
	};
	reportBuilder.metric(dau, dauOption);
	// Build a new report
	const report = reportBuilder.build();
	t.deepEqual(report._message, basicAtt);
});

test('returns full attachement object', async t => {
	// Instantiate a new ReportBuilder
	const reportBuilder = new ReportBuilder()
		.title('Daily User Report')
		.titleLink('https://title.link')
		.description(description);
	// Set DAU metric
	const dauOption = {
		title: 'DAU',
		description,
		color: '#36a64f',
		author: 'Zeppelin',
		authorIcon: 'https://author_icon.png',
		timestamp: 1234567890000
	};
	reportBuilder.metric(dau, dauOption);
	// Set MAU metric
	const mauOption = {
		title: 'MAU',
		description,
		color: '#36a64f',
		author: 'Zeppelin',
		authorIcon: 'https://author_icon.png',
		timestamp: 1234567890000
	};
	reportBuilder.metric(mau, mauOption);
	// Build a new report
	const report = reportBuilder.build();
	t.deepEqual(report._message, fullAtt);
});
