import {Router, Response, Request} from 'express';
import userDao from '../dao/userDao';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	const userInfo: Slack.slashCommandRequest = req.body;
	try {
		await userDao.putUser(userInfo.user_id, userInfo);
		await userDao.saveUsername(userInfo.user_name, userInfo.user_id);
		res.send(`registered!`);
	} catch (e) {
		console.log(e);
		res.send('could not register');
	}
});

export default router;
