import {Router, Response, Request} from 'express';
const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
	console.log(req.body);
	res.send('ok');
});

export default router;
