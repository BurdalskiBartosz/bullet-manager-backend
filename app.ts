import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/route';
import errorMiddleware from './middleware/error.middleware';

class App {
	public app: Application;

	constructor() {
		this.app = express();

		this.initMiddlewares();
		this.initControllers();
		this.initErrorHandler();
	}

	public getServer(): Application {
		return this.app;
	}

	private initMiddlewares(): void {
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());
		this.app.use(express.static(path.join(__dirname, 'public')));
	}

	private initControllers() {
		this.app.use('/', indexRouter);
	}

	private initErrorHandler() {
		this.app.use(errorMiddleware);
	}
}

export default App;
