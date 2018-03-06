'use strict';

const axios = require('axios');
const {re, formatTable} = require('./util');

class Report {

	publish(url) {
		if (!re.slackUrl.test(url)) {
			throw new TypeError(`The slack webhook url should starts with 'https://hooks.slack.com/services/'`);
		}
		return axios({
			url,
			method: 'POST',
			data: this._message
		});
	}

	preview() {
		const baseUrl = 'https://api.slack.com/api_docs_message_builder.php';
		const stringifiedAtt = JSON.stringify(this._message);
		const previewUrl = `${baseUrl}?msg=${encodeURIComponent(stringifiedAtt)}`;
		console.log(previewUrl);
	}

	/* eslint-disable camelcase */
	constructor(builder) {
		const message = {
			attachments: []
		};
		// Add message header
		message.attachments.push({
			title: builder._title,
			title_link: builder._titleLink || '',
			text: builder._description || ''
		});
		// Add message body
		builder._metrics.forEach(_ => {
			message.attachments.push({
				mrkdwn_in: ['fields'],
				color: _.color || '',
				fields: [{
					value: formatTable(_.data, _.title, _.description),
					short: false
				}],
				footer: _.author || '',
				footer_icon: _.authorIcon || '',
				ts: _.timestamp === undefined ? 0 : Math.floor(_.timestamp / 1000)
			});
		});
		this._message = message;
	}
	/* eslint-enable camelcase */
}

module.exports = Report;

