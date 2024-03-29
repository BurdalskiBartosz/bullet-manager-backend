import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { modules } from './modules';
import { errorMiddleware } from './middleware';
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
		modules.forEach((Module) => {
			const module = new Module();
			const controller = module.init();
			controller.initializeRoutes();
			this.app.use('/api', (...args) => controller.router(...args));
		});
	}

	private initErrorHandler() {
		this.app.use(errorMiddleware);
	}
}

export default App;
