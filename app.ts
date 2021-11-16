import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import controllers from './controllers';

class App {
	public app: Application;

	constructor() {
		this.app = express();

		this.initMiddlewares();
		this.initControllers();
	}

	public getServer() {
		return this.app;
	}

	private initMiddlewares() {
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());
		this.app.use(express.static(path.join(__dirname, 'public')));
	}

	private initControllers() {
		controllers.forEach((controller) => this.app.use('/api', controller.router));
	}
}

export default App;
