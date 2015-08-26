import request         from 'superagent';
import { scheduleJob } from 'node-schedule';

const MONDAY    = 1;
const TUESDAY   = 2;
const WEDNESDAY = 3;
const THURSDAY  = 4;
const FRIDAY    = 5;
const SATURDAY  = 6;
const SUNDAY    = 0;

/**
 *
 */
const beer = [
	'http://media.riemurasia.net/albumit/mmedia/3g/gok/xixk/200436/1116801310.jpg',
	'http://files.fitfashion.fi/wp-content/uploads/sites/18/2015/02/file.jpg',
	'http://media.riemurasia.net/albumit/mmedia/7u/rnh/6aem/28955/1066601341.jpg',
	'http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10748476_1389343018023971_541246281_a.jpg',
]

function postSlackMessage(content) {
	request.post('https://slack.com/api/chat.postMessage')
		.query({ text:    content })
		.query({ token:   process.env.SLACK_API_TOKEN })
		.query({ channel: '#yleinen' })
		.query({ as_user: true })
		.end(err => err ? console.log(err) : null)
}

/**
 *
 */
scheduleJob({ hour: 9, minute: 14 }, () => {
	switch(new Date().getDay()) {
		case MONDAY:
		case TUESDAY:
		case WEDNESDAY:
		case THURSDAY:
			postSlackMessage(beer[Math.floor(Math.random() * beer.length)]);
			break;
		case FRIDAY:
		case SATURDAY:
			postSlackMessage('https://www.youtube.com/watch?v=GpP0DOYy9IA');
			break;
		case SUNDAY:
			postSlackMessage('https://www.youtube.com/watch?v=2vtwkQcHA1I');
			break;
	}
});
