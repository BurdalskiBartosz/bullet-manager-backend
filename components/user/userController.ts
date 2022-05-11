import { NextFunction, Request, Response } from 'express';
import { async } from '../../helpers';
import { tRequestWithUser } from '../../types';
import { Controller, Service } from '../shared';

class UserController extends Controller<Service> {
	public path: string = '/auth';
	static path: string = 'auth';

	initializeRoutes() {
		this.router.post(`${this.path}/login`, async(this.login));
		this.router.post(`${this.path}/register`, async(this.register));
	}

	private login = async (req: tRequestWithUser, res: Response, next: NextFunction) => {
		const data = this.getData(req);
		await this.service.login(data);
	};

	private register = async (req: Request, res: Response, next: NextFunction) => {
		await this.service.register(req);
	};
}

export default UserController;
