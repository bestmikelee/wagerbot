import {Router, Response, Request} from 'express';
import betService from '../services/betService';
import betDao from '../dao/betDao';
import bookDao from '../dao/bookDao';
import userDao from '../dao/userDao';
import {WebClient} from '@slack/client';

const router: Router = Router();

const token =
	process.env.SLACK_BOT_TOKEN ||
	'xoxb-443707066544-446365532997-WYw1gggyIlMHzsZikfLiZZIp';
const web = new WebClient(token, {
	clientId: process.env.SLACK_CLIENT_ID,
	clientSecret: process.env.SLACK_CLIENT_SECRET,
});

router.post('/', async (req: Request, res: Response) => {
	const interactiveMsg: Slack.interactiveMessage = JSON.parse(req.body.payload);
	console.log(interactiveMsg);
	if (interactiveMsg.actions[0].value === 'false') {
		await betDao.delBet(interactiveMsg.callback_id);
		res.send('wager declined');
	}
	const bet: Book.bet = await betDao.getBet(interactiveMsg.callback_id);
	bet.time_accepted = Date.now();
	await betDao.putBet(interactiveMsg.callback_id, bet);
	await web.chat.postMessage({
		channel: interactiveMsg.actions[0].value,
		text: `bet [${bet.id}] has been accepted`,
	});
	res.send('wager accepted - good luck!');
});

export default router;
