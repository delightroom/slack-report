'use strict';

const Report = require('./Report');
const {isTwoDimensionalArray, valueString, re} = require('./util');

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

	withColor(color) {
		if (typeof color !== 'string') {
			throw new TypeError('withColor only allows string parameter.');
		}
		const colors = Object.values(ReportBuilder.Color);
		if (colors.indexOf(color) === -1 && !re.hexCode.test(color)) {
			throw new TypeError(`withColor only allows hex code color or the option provided by ReportBuilder.Color.`);
		}
		this.color = color;
		return this;
	}

	withIcon(icon) {
		if (!re.url.test(icon)) {
			throw new TypeError('withIcon only allows url which starts with http or https.');
		}
		this.icon = icon;
		return this;
	}

	withCategory(category) {
		this.category = `${category}`;
		return this;
	}

	withTitle(title, titleLink) {
		this.title = `${title}`;
		if (titleLink !== undefined && !re.url.test(titleLink)) {
			throw new TypeError('titleLink should be a url string.');
		}
		this.titleLink = titleLink;
		return this;
	}

	withMetric(name, data, short = true) {
		if (this.metrics === undefined) {
			this.metrics = [];
		}
		if (!isTwoDimensionalArray(data)) {
			throw new TypeError('data parameter for withMetric should be a two dimensional array.');
		}
		if (typeof short !== 'boolean') {
			throw new TypeError('The short parameter should be a boolean type.');
		}
		this.metrics.push({
			title: `${name}`,
			value: valueString(data),
			short
		});
		return this;
	}

	withDescription(description) {
		this.description = '```' + description + '```';
		return this;
	}

	withPublisher(publisher, publisherLink) {
		this.publisher = `${publisher}`;
		if (publisherLink !== undefined && !re.url.test(publisherLink)) {
			throw new TypeError('publisherLink should be a url string.');
		}
		this.publisherLink = publisherLink;
		return this;
	}

	withPublishTime(publishTime) {
		if (!re.timestamp.test(publishTime)) {
			throw new TypeError('publishTime should be a 13-digit timestamp.');
		}
		this.publishTime = Math.floor(publishTime / 1000);
		return this;
	}

	build() {
		if (this.title === undefined) {
			throw new ReferenceError('The title should be defined.');
		}
		if (this.metrics === undefined) {
			throw new ReferenceError('The metrics should be defined.');
		}
		return new Report(this);
	}
}

module.exports = ReportBuilder;
