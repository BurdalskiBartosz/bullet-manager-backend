import { Request, Response, Router } from 'express';
import { tRequestWithUser } from '../..';
import { async } from '../../../helpers';
import { authMiddleware } from '../../../middleware';
import { iClassGenericContructor } from '../../class';
import { CRUDService, Service } from '../service';

export abstract class Controller {
	abstract path: string;
	public service: Service;
	public router = Router();

	constructor(Service: iClassGenericContructor<Service | CRUDService>) {
		this.service = new Service();
	}

	abstract initializeRoutes(): void;
}
export type tEntity =
	| 'user'
	| 'userTask'
	| 'projectTask'
	| 'comment'
	| 'tag'
	| 'token'
	| 'activity';

export abstract class CRUDController extends Controller {
	initializeRoutes() {
		this.router.get(`${this.path}/:id`, authMiddleware, async(this.getOne));
		this.router.get(`${this.path}`, authMiddleware, async(this.getAll));
		this.router.post(`${this.path}`, authMiddleware, async(this.create));
		this.router.patch(`${this.path}/:id`, authMiddleware, async(this.edit));
		this.router.delete(`${this.path}/:id`, async(this.delete));
	}

	protected abstract getOne(req: Request, res: Response): void;

	protected abstract getAll(req: tRequestWithUser, res: Response): void;

	protected abstract create(req: Request, res: Response): void;

	protected abstract edit(req: Request, res: Response): void;

	protected abstract delete(req: Request, res: Response): void;
}
