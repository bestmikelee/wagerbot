import {Router, Response, Request} from 'express';
import betDao from '../dao/betDao';
import webclient from '../services/slackClient';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	const interactiveMsg: Slack.interactiveMessage = JSON.parse(req.body.payload);

	if (interactiveMsg.actions[0].value === 'false') {
		await betDao.delBet(interactiveMsg.callback_id);
		res.send('wager declined');
	}
	const bet: Book.bet = await betDao.getBet(interactiveMsg.callback_id);
	bet.time_accepted = Date.now();
	await betDao.putBet(interactiveMsg.callback_id, bet);
	await webclient.chat.postMessage({
		channel: interactiveMsg.actions[0].value,
		text: `bet [${bet.id}] has been accepted`,
	});
	res.send('wager accepted - good luck!');
});

export default router;
