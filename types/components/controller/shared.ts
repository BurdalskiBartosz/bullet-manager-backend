import { Response, Router } from 'express';
import { RequestWithUser } from '../..';
import { async } from '../../../helpers';
import { authMiddleware } from '../../../middleware';
import { iClassGenericContructor } from '../../class';
import { iCRUDService, iService } from '../service';

export type iController = {
	path: string;
	service: iService;
	router: Router;
	initializeRoutes(): void;
};

export type iCRUDController = {
	getOne(req: RequestWithUser, res: Response): void;
	getAll(req: RequestWithUser, res: Response): void;
	create(req: RequestWithUser, res: Response): void;
	edit(req: RequestWithUser, res: Response): void;
	delete(req: RequestWithUser, res: Response): void;
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

export abstract class CRUDController<T extends iCRUDService>
	extends BaseController
	implements iCRUDController
{
	public service: T;
	public router = Router();

	constructor(Service: iClassGenericContructor<T>) {
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

	abstract getOne(req: RequestWithUser, res: Response): void;

	getAll = async (req: RequestWithUser, res: Response) => {
		const userId = req.user.id;
		const data = await this.service.getAll(userId);
		res.send(data).status(200);
	};

	create = async (req: RequestWithUser, res: Response) => {
		const createData = {
			...req.body,
			userId: req.user?.id
		};
		const data = await this.service.create(createData);
		res.send({ data }).status(200);
	};

	abstract edit(req: RequestWithUser, res: Response): void;

	abstract delete(req: RequestWithUser, res: Response): void;
}
