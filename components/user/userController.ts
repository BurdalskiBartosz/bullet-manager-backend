import { NextFunction, Request, Response, Router } from 'express';
import { RequestWithUserr } from '../../types';
import { Service } from './UserServices';

interface iClassGenericContructor<T> {
	new (): T;
}

const wrap = (callback: Function) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await callback(req, res, next);
		} catch (err) {
			next(err);
		}
	};
};

abstract class Controller<Service> {
	abstract path: string;
	public service: Service;
	public router = Router();

	constructor(Service: iClassGenericContructor<Service>) {
		this.service = new Service();
	}

	abstract initializeRoutes(): void;

	getData(req: Request) {
		return {
			query: req.query,
			body: req.body,
			params: req.params,
			headers: req.headers
		} as { [key: string]: object | string | undefined };
	}
}
const authMiddleware = (req: RequestWithUserr, res: Response, next: NextFunction) => {
	req.user = 'req.user';
	next();
};

class UserController extends Controller<Service> {
	public path: string = '/auth';
	static path: string = 'auth';

	initializeRoutes() {
		this.router.post(`${this.path}/login`, authMiddleware, wrap(this.login));
		this.router.post(`${this.path}/register`, wrap(this.register));
	}

	private login = async (req: RequestWithUserr, res: Response, next: NextFunction) => {
		const data = this.getData(req);
		await this.service.login(data);
	};

	private register = async (req: Request, res: Response, next: NextFunction) => {
		await this.service.register(req);
	};
}

export default UserController;
