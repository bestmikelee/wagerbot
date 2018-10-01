/// <reference path="../types/slack.d.ts" />
/// <reference path="../types/book.d.ts" />

import {Router, Response, Request} from 'express';
const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
	const payload: Slack.messageAction = req.body.payload;
	res.send('ok');
});

export default router;
