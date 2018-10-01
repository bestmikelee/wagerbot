import {WebClient} from '@slack/client';

const token = process.env.SLACK_BOT_TOKEN;

const webclient = new WebClient(token, {
	clientId: process.env.SLACK_CLIENT_ID,
	clientSecret: process.env.SLACK_CLIENT_SECRET,
});

export default webclient;
