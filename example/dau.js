'use stirct';

const ReportBuilder = require('../index.js');
const data = require('./dau.json');

const reportBuilder = new ReportBuilder()
	.title('Daily User Report')
	.titleLink('https://fabric.io')
	.description('This is a sample report made by Slack Report.');

const dau = data.map(Object.values);
const option = {
	title: 'DAU',
	description: 'This is a sample table.',
	author: 'Slack API',
	authorIcon: 'https://platform.slack-edge.com/img/default_application_icon.png',
	timestamp: Date.now(),
	color: ReportBuilder.Color.GOOD
};
reportBuilder.metric(dau, option);

const report = reportBuilder.build();
report.preview();