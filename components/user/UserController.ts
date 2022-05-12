import { NextFunction, Request, Response } from 'express';
import { async } from '../../helpers';
import { tRequestWithUser } from '../../types';
import { Controller } from '../shared';

class UserController extends Controller {
	public path: string = '/auth';

	initializeRoutes() {
		this.router.post(`${this.path}/login`, async(this.login));
		this.router.post(`${this.path}/register`, async(this.register));
		this.router.post(`${this.path}/logout`, async(this.logout));
	}

	private login = async (req: tRequestWithUser, res: Response, next: NextFunction) => {
		const data = this.getData(req);
		const { user, token } = await this.service.login(data);

		res.cookie('token', token, {
			maxAge: 24 * 60 * 60 * 1000 * 10,
			httpOnly: true,
			secure: false
		});
		res.send({ user }).status(200);
	};

	private register = async (req: Request, res: Response, next: NextFunction) => {
		await this.service.register(req);
		res.sendStatus(201);
	};

	private logout = (req: Request, res: Response, next: NextFunction) => {
		res.clearCookie('token');
		res.sendStatus(200);
	};
}

export default UserController;
