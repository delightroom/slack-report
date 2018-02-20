# Slack Report
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

## Why Slack Report?

Slack is the most popular collaboration tool. However, when it comes to [message formatting](https://api.slack.com/docs/message-formatting), Slack provides very limited features. This makes it difficult to share monitored metrics or analyzed statistics in a structured format.

Slack Report gives you a better way to do this by making use of [message attachments](https://api.slack.com/docs/message-attachments). Especially, the API based on [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern) allows you to write clean and easy-to-read code.


<img width="500" alt="2018-02-20 11 23 28" src="https://user-images.githubusercontent.com/19233714/36404945-1a195488-1631-11e8-8577-8b5b39d6271e.png">

## Installation
You can install Slack Report through npm:
```
npm install slack-report --save
```

## Usage Example

### Builder
You can set up the report by using method chain. You should call `withTitle` and `withMetric` methods at least once. Other fields are optional. Don't forget to call the `build` method at the end of the chain.
```js
const SlackReport = require('slack-report');

const report = new SlackReport()
	.withIcon(reportIcon)
	.withCategory('Alarmy')
	.withTitle('Daily User Report', reportLink)
	.withMetric('DAU', dau)
	.withMetric('MAU', mau)
	.withMetric('NEW', newUsers)
	.withMetric('DWNLD', download)
	.withDescription('Description: This is a sample report made by Slack Report.')
	.withPublisher('Zeppelin', publisherIcon)
	.withPublishTime(Date.now())
	.build();
```

### Preview
Before publishing it to Slack, you can preview the message . The preview method prints out an url. Just copy and paste the link to your browser.
```js
report.preview();
```

### Publish
In order to publish the report, you need to call the publish method with slack webhook url, which starts with `https://hooks.slack.com/services`. The method returns [axios](https://github.com/axios/axios) object so I would recommend use `await` operator. For the detailed info about slack webhook, please refer to [this document](https://api.slack.com/incoming-webhooks).

```js
const slackWebhookUrl = 'https://api.slack.com/incoming-webhooks/...';
await report.publish(slackWehookUrl);
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
