'use strict';

const axios = require('axios');
const {re} = require('./util');

class Report {

	publish(url) {
		if (!re.slackUrl.test(url)) {
			throw new TypeError(`The slack webhook url should starts with 'https://hooks.slack.com/services/'`);
		}
		return axios({
			url,
			method: 'POST',
			data: this.attachments
		});
	}

	preview() {
		const baseUrl = 'https://api.slack.com/api_docs_message_builder.php';
		const stringifiedAtt = JSON.stringify(this.attachments);
		const previewUrl = `${baseUrl}?msg=${encodeURIComponent(stringifiedAtt)}`;
		console.log(previewUrl);
	}

	/* eslint-disable camelcase */
	constructor(builder) {
		const attachment = {
			mrkdwn_in: ['fields'],
			title: builder.title,
			fields: builder.metrics
		};
		if (builder.titleLink !== undefined) {
			attachment.title_link = builder.titleLink;
		}
		if (builder.color !== undefined) {
			attachment.color = builder.color;
		}
		if (builder.icon !== undefined) {
			attachment.author_icon = builder.icon;
		}
		if (builder.category !== undefined) {
			attachment.author_name = builder.category;
		}
		if (builder.description !== undefined) {
			attachment.fields.push({
				value: builder.description,
				short: false
			});
		}
		if (builder.publisher !== undefined) {
			attachment.footer = builder.publisher;
		}
		if (builder.publisherLink !== undefined) {
			attachment.footer_icon = builder.publisherLink;
		}
		if (builder.publishTime !== undefined) {
			attachment.ts = builder.publishTime;
		}

		this.attachments = {
			attachments: [attachment]
		};
	}
	/* eslint-enable camelcase */
}

module.exports = Report;

