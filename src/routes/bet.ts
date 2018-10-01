import {Router, Response, Request} from 'express';
import betService from '../services/betService';
import betDao from '../dao/betDao';
import bookDao from '../dao/bookDao';
import userDao from '../dao/userDao';
import {WebClient} from '@slack/client';

const token =
	process.env.SLACK_BOT_TOKEN ||
	'xoxb-443707066544-446365532997-WYw1gggyIlMHzsZikfLiZZIp';
const web = new WebClient(token, {
	clientId: process.env.SLACK_CLIENT_ID,
	clientSecret: process.env.SLACK_CLIENT_SECRET,
});

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	const betData: Book.bet = betService.createNewBet(req.body);
	await betDao.putBet(betData.id, betData);
	await bookDao.addToUserBook(betData.bettor_id, betData);
	const userData: User.info = await userDao.getUserByName(betData.taker);
	if (betData.taker) {
		// send confirmation to tagged user
		await web.chat.postMessage({
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
	res.send(betService.generateResponseText(betData));
});

export default router;
