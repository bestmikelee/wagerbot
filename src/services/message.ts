import webclient from './slackClient';
import betService from '../util/betHelper';

async function sendBetToUser(betData: Book.bet, userData: User.info) {
	await webclient.chat.postMessage({
		channel: userData.user_id,
		text: `New Wager: ${betService.generateWagerText(betData)}`,
		as_user: true,
		attachments: [
			{
				text: 'Accept or decline wager',
				fallback: 'You are unable to choose a action',
				callback_id: betData.id,
				color: '#3AA3E3',
				actions: [
					{
						name: 'action',
						text: 'Accept',
						type: 'button',
						value: betData.meta.channel_id,
					},
					{
						name: 'action',
						text: 'Decline',
						type: 'button',
						value: 'false',
					},
				],
			},
		],
	});
}

async function simpleMessageToChannel(obj: {channel: string; text: string}) {
	await webclient.chat.postMessage(obj);
}

export default {
	sendBetToUser,
	simpleMessageToChannel,
};
