import { Request, Response, Router } from 'express';
import { tRequestWithUser } from '../..';
import { async } from '../../../helpers';
import { authMiddleware } from '../../../middleware';
import { iClassGenericContructor } from '../../class';
import { iCRUDService, iService } from '../service';

export type tEntity =
	| 'user'
	| 'userTask'
	| 'projectTask'
	| 'comment'
	| 'tag'
	| 'token'
	| 'activity';

export type iController = {
	path: string;
	service: iService;
	router: Router;
	initializeRoutes(): void;
};

export type iCRUDController = {
	getOne(req: Request, res: Response): void;
	getAll(req: tRequestWithUser, res: Response): void;
	create(req: Request, res: Response): void;
	edit(req: Request, res: Response): void;
	delete(req: Request, res: Response): void;
} & iController;

abstract class BaseController implements iController {
	abstract path: string;
	abstract service: iService;
	public router = Router();

	abstract initializeRoutes(): void;
}

export abstract class Controller extends BaseController {
	public service: iService;
	constructor(Service: iClassGenericContructor<iService>) {
		super();
		this.service = new Service();
	}
	abstract initializeRoutes(): void;
}

export abstract class CRUDController extends BaseController implements iCRUDController {
	public service: iCRUDService;
	public router = Router();

	constructor(Service: iClassGenericContructor<iCRUDService>) {
		super();
		this.service = new Service();
	}
	initializeRoutes() {
		this.router.get(`${this.path}/:id`, authMiddleware, async(this.getOne));
		this.router.get(`${this.path}`, authMiddleware, async(this.getAll));
		this.router.post(`${this.path}`, authMiddleware, async(this.create));
		this.router.patch(`${this.path}/:id`, authMiddleware, async(this.edit));
		this.router.delete(`${this.path}/:id`, authMiddleware, async(this.delete));
	}

	abstract getOne(req: Request, res: Response): void;

	abstract getAll(req: tRequestWithUser, res: Response): void;

	abstract create(req: Request, res: Response): void;

	abstract edit(req: Request, res: Response): void;

	abstract delete(req: Request, res: Response): void;
}
