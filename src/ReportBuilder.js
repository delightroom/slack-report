'use strict';

const Report = require('./Report');
const {isTwoDimensionalArray, formatString, re} = require('./util');

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

	color(color) {
		if (typeof color !== 'string') {
			throw new TypeError('color only allows string parameter.');
		}
		const colors = Object.values(ReportBuilder.Color);
		if (colors.indexOf(color) === -1 && !re.hexCode.test(color)) {
			throw new TypeError(`color only allows hex code color or the option provided by ReportBuilder.Color.`);
		}
		this._color = color;
		return this;
	}

	icon(icon) {
		if (!re.url.test(icon)) {
			throw new TypeError('icon only allows url which starts with http or https.');
		}
		this._icon = icon;
		return this;
	}

	category(category) {
		this._category = `${category}`;
		return this;
	}

	title(title, titleLink) {
		this._title = `${title}`;
		if (titleLink !== undefined && !re.url.test(titleLink)) {
			throw new TypeError('titleLink should be a url string.');
		}
		this._titleLink = titleLink;
		return this;
	}

	metric(name, data, short = true) {
		if (this._metrics === undefined) {
			this._metrics = [];
		}
		if (!isTwoDimensionalArray(data)) {
			throw new TypeError('data parameter for metric should be a two dimensional array.');
		}
		if (typeof short !== 'boolean') {
			throw new TypeError('The short parameter should be a boolean type.');
		}
		this._metrics.push({
			title: `${name}`,
			value: formatString(data),
			short
		});
		return this;
	}

	description(description) {
		this._description = '```' + description + '```';
		return this;
	}

	publisher(publisher, publisherLink) {
		this._publisher = `${publisher}`;
		if (publisherLink !== undefined && !re.url.test(publisherLink)) {
			throw new TypeError('publisherLink should be a url string.');
		}
		this._publisherLink = publisherLink;
		return this;
	}

	publishTime(publishTime) {
		if (!re.timestamp.test(publishTime)) {
			throw new TypeError('publishTime should be a 13-digit timestamp.');
		}
		this._publishTime = Math.floor(publishTime / 1000);
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
