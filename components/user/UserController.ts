import { NextFunction, Request, Response } from 'express';
import { async } from '../../helpers';
import { tRequestWithUser } from '../../types';
import { Controller } from '../shared';

class UserController extends Controller {
	public path: string = '/auth';

	initializeRoutes() {
		this.router.post(`${this.path}/login`, async(this.login));
		this.router.post(`${this.path}/register`, async(this.register));
	}

	private login = async (req: tRequestWithUser, res: Response, next: NextFunction) => {
		const data = this.getData(req);
		const userToken = await this.service.login(data);
		res.cookie('token', userToken, {
			maxAge: 864000000,
			httpOnly: true,
			secure: false
		});
		res.sendStatus(200);
	};

	private register = async (req: Request, res: Response, next: NextFunction) => {
		await this.service.register(req);
		res.sendStatus(201);
	};
}

export default UserController;
