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
			data: this._attachments
		});
	}

	preview() {
		const baseUrl = 'https://api.slack.com/api_docs_message_builder.php';
		const stringifiedAtt = JSON.stringify(this._attachments);
		const previewUrl = `${baseUrl}?msg=${encodeURIComponent(stringifiedAtt)}`;
		console.log(previewUrl);
	}

	/* eslint-disable camelcase */
	constructor(builder) {
		const attachment = {
			mrkdwn_in: ['fields'],
			title: builder._title,
			fields: builder._metrics
		};
		if (builder._titleLink !== undefined) {
			attachment.title_link = builder._titleLink;
		}
		if (builder._color !== undefined) {
			attachment.color = builder._color;
		}
		if (builder._icon !== undefined) {
			attachment.author_icon = builder._icon;
		}
		if (builder._category !== undefined) {
			attachment.author_name = builder._category;
		}
		if (builder._description !== undefined) {
			attachment.fields.push({
				value: builder._description,
				short: false
			});
		}
		if (builder._publisher !== undefined) {
			attachment.footer = builder._publisher;
		}
		if (builder._publisherLink !== undefined) {
			attachment.footer_icon = builder._publisherLink;
		}
		if (builder._publishTime !== undefined) {
			attachment.ts = builder._publishTime;
		}

		this.attachments = {
			attachments: [attachment]
		};
	}
	/* eslint-enable camelcase */
}

module.exports = Report;

