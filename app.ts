import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { modules } from './modules';
import { errorMiddleware } from './middleware';
import { injectable, inject, Container } from 'inversify';

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
			this.app.use('/api', (req, res, next) => {
				const data = {
					body: req.body,
					params: req.params,
					query: req.query
				};

				return controller.router(req, res, next);
			});
		});
	}

	private initErrorHandler() {
		this.app.use(errorMiddleware);
	}
}

export interface Warrior {
	fight(): string;
	sneak(): string;
}

export interface Weapon {
	hit(): string;
}

export interface ThrowableWeapon {
	throw(): string;
}
const TYPES = {
	Warrior: Symbol.for('Warrior'),
	Weapon: Symbol.for('Weapon'),
	ThrowableWeapon: Symbol.for('ThrowableWeapon')
};
@injectable()
class Katana implements Weapon {
	public hit() {
		return 'cut!';
	}
}

@injectable()
class Shuriken implements ThrowableWeapon {
	public throw() {
		return 'hit!';
	}
}

@injectable()
class Ninja implements Warrior {
	private _katana: Weapon;
	private _shuriken: ThrowableWeapon;

	public constructor(
		@inject(TYPES.Weapon) katana: Weapon,
		@inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
	) {
		this._katana = katana;
		this._shuriken = shuriken;
	}

	public fight() {
		return this._katana.hit();
	}
	public sneak() {
		return this._shuriken.throw();
	}
	public test() {
		console.log(this);
	}
}

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

const ninja = myContainer.get<Warrior>(TYPES.Warrior);

console.log(ninja);

export default App;
