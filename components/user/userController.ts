import { NextFunction, Request, Response } from 'express';
import { asyncMiddleware } from '../../middleware';
import { RequestWithUserr } from '../../types';
import { Controller, Service } from '../shared';

class UserController extends Controller<Service> {
	public path: string = '/auth';
	static path: string = 'auth';

	initializeRoutes() {
		this.router.post(`${this.path}/login`, asyncMiddleware(this.login));
		this.router.post(`${this.path}/register`, asyncMiddleware(this.register));
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
