/// <reference path="../types/slack.d.ts" />
/// <reference path="../types/book.d.ts" />

import {Router, Response, Request} from 'express';
import {post} from 'request';
const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
	const payload: Slack.messageAction = req.body.payload;
	res.send('ok');
});

export default router;

const body = {
	payload: {
		type: 'message_action',
		token: 'VJsYPCvpuXqW2rHSqqbDHwkR',
		action_ts: '1538182437.760639',
		team: {id: 'TD1L T1YG0', domain: 'friendlybotsandbox'},
		user: {id: 'UD2J65M61', name: 'mike.sj.lee'},
		channel: {id: 'CD3RAPL69', name: 'pr op-bets'},
		callback_id: 'prop_bet_action',
		trigger_id: '445862096821.443707066544.9851ca280ff7bae20166c0f420cb9c9e',
		'messag e_ts': '1538182078.000100',
		message: {
			type: 'message',
			user: 'UD2J65M61',
			text: 'hello',
			client_msg_id: 'd2e35884-c8e1-45d1 -a880-efde33e8d756',
			ts: '1538182078.000100',
		},
		response_url:
			'https:\\/\\/hooks.slack.com\\/app\\/TD1LT1YG0\\/445862096853 /wHh8A4nuWlv51TIms7XxQQuG',
	},
};
