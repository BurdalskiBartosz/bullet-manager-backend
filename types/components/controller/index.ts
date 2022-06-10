import { Request, Response, Router } from 'express';
import { async } from '../../../helpers';
import { iClassGenericContructor } from '../../class';
import { Service } from '../service';

export abstract class Controller {
	abstract path: string;
	public service: Service;
	public router = Router();

	constructor(Service: iClassGenericContructor<Service>) {
		this.service = new Service();
	}

	abstract initializeRoutes(): void;
}
export type tEntity = 'user' | 'task' | 'comment' | 'tag' | 'token' | 'activity';

export abstract class CRUDController extends Controller {
	protected abstract entity: tEntity;

	initializeRoutes() {
		this.router.get(`${this.path}/:id`, async(this.getOne));
		this.router.get(`${this.path}`, async(this.getAll));
		this.router.post(`${this.path}`, async(this.create));
		this.router.patch(`${this.path}/:id`, async(this.edit));
		this.router.delete(`${this.path}/:id`, async(this.delete));
	}

	protected abstract getOne(req: Request, res: Response): void;

	protected abstract getAll(req: Request, res: Response): void;

	protected abstract create(req: Request, res: Response): void;

	protected abstract edit(req: Request, res: Response): void;

	protected abstract delete(req: Request, res: Response): void;
}

export type tLoginData = {
	loginOrEmail: string;
	password: string;
};

export type tRegistrationData = {
	login: string;
	email: string;
	password: string;
};
