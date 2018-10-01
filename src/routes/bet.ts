import {Router, Response, Request} from 'express';
import betHelper from '../util/betHelper';
import betDao from '../dao/betDao';
import bookDao from '../dao/bookDao';
import userDao from '../dao/userDao';
import message from '../services/message';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	const betData: Book.bet = betHelper.createNewBet(req.body);

	await betDao.putBet(betData.id, betData);
	await bookDao.addToUserBook(betData.bettor_id, betData);

	const userData: User.info = await userDao.getUserByName(betData.taker);
	if (betData.taker) {
		// send confirmation to tagged user
		await message.simpleMessageToChannel({
			channel: betData.meta.channel_id,
			text: betHelper.generateResponseText(betData),
		});
		await message.sendBetToUser(betData, userData);
	}
	res.end();
});

export default router;
