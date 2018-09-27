import {Application} from 'express';
import bet from './bet';

const routers = (app: Application): void => {
	app.use('/bet', bet);
};

export default routers;
