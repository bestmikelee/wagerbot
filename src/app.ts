import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routeBinder from './routes';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env'});
// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routeBinder(app);

export default app;
