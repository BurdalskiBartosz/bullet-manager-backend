import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import controllers from './controllers';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
class App {
	public app: Application;

	constructor() {
		this.app = express();

		this.initMiddlewares();
		this.initControllers();
		this.initErrorHandler();
	}

	public getServer() {
		return this.app;
	}

	private initMiddlewares() {
		this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(cookieParser());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static(path.join(__dirname, 'public')));
	}

	private initControllers() {
		controllers.forEach((controller) => this.app.use('/api', controller.router));
	}

	private initErrorHandler() {
		this.app.use(errorMiddleware);
	}
}

export default App;
