import { Request, Response } from 'express';
import { async } from '../../helpers';
import { Controller } from '../../types/components/controller/shared';
import { tLoginData, tRegistrationData } from '../../types/components/shared/user';

class UserController extends Controller {
	public path: string = '/auth';

	initializeRoutes() {
		this.router.get('me', async(this.me));
		this.router.post(`${this.path}/login`, async(this.login));
		this.router.post(`${this.path}/register`, async(this.register));
		this.router.post(`${this.path}/logout`, async(this.logout));
	}

	private login = async (req: Request, res: Response) => {
		const data: tLoginData = req.body;
		const { user, token } = await this.service.login(data, 'user');

		res.cookie('token', token, {
			maxAge: 24 * 60 * 60 * 1000 * 10,
			httpOnly: true,
			secure: false
		});
		res.send({ user }).status(200);
	};

	private register = async (req: Request, res: Response) => {
		const data: tRegistrationData = req.body;
		await this.service.register(data);
		res.sendStatus(201);
	};

	private logout = (req: Request, res: Response) => {
		res.clearCookie('token');
		res.sendStatus(200);
	};

	private me = async (req: Request, res: Response) => {
		const tokenValue = req.cookies.token;
		const user = await this.service.me(tokenValue);
		return res.send({ user }).status(200);
	};
}

export default UserController;
