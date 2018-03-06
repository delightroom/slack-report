'use strict';

const Report = require('./Report');
const {isTwoDimensionalArray, re} = require('./util');

class ReportBuilder {

	static get Color() {
		return {
			GOOD: 'good',
			WARNING: 'warning',
			DANGER: 'danger',
			SKYBLUE: '#6ECADC',
			MARIGOLD: '#E9A820',
			RUBY: '#E01563',
			MINT: '#3EB991'
		};
	}

	title(title) {
		this._title = `${title}`;
		return this;
	}

	titleLink(titleLink) {
		if (!re.url.test(titleLink)) {
			throw new TypeError('titleLink should be a url string.');
		}
		this._titleLink = titleLink;
		return this;
	}

	description(description) {
		this._description = description;
		return this;
	}

	metric(data, option = {}) {
		// Type Checking
		if (data === undefined) {
			throw new TypeError('You should pass data to metric function.');
		}
		if (!isTwoDimensionalArray(data)) {
			throw new TypeError('data parameter for metric should be a two dimensional array.');
		}
		if (option.authorIcon !== undefined && !re.url.test(option.authorIcon)) {
			throw new TypeError('authorIcon only allows url which starts with http or https.');
		}
		if (option.timestamp !== undefined && !re.timestamp.test(option.timestamp)) {
			throw new TypeError('timestamp should be a 13-digits.');
		}
		if (option.color !== undefined) {
			if (typeof option.color !== 'string') {
				throw new TypeError('color only allows string parameter.');
			}
			const colors = Object.values(ReportBuilder.Color);
			if (colors.indexOf(option.color) === -1 && !re.hexCode.test(option.color)) {
				throw new TypeError(`color only allows hex code color or the option provided by ReportBuilder.Color.`);
			}
		}
		// Add metric to member variable
		if (this._metrics === undefined) {
			this._metrics = [];
		}
		this._metrics.push({
			title: option.title,
			data,
			description: option.description,
			author: option.author,
			authorIcon: option.authorIcon,
			timestamp: option.timestamp,
			color: option.color
		});
		return this;
	}

	build() {
		if (this._title === undefined) {
			throw new ReferenceError('The title should be defined.');
		}
		if (this._metrics === undefined) {
			throw new ReferenceError('The metrics should be defined.');
		}
		return new Report(this);
	}
}

module.exports = ReportBuilder;
