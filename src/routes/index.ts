import {Application} from 'express';
import bet from './bet';
import action from './action';
import bookie from './bookie';
import register from './register';

const routers = (app: Application): void => {
	app.use('/bet', bet);
	app.use('/action', action);
	app.use('/bookie', bookie);
	app.use('/register', register);
};

export default routers;
