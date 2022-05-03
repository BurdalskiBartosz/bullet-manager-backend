import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma/prismaClient';
import { Controller, DataInJWT } from '../../types';
import * as bcrypt from 'bcrypt';
import { Prisma } from '.prisma/client';
import HttpException from '../../exceptions/httpException';

class AuthorizationController implements Controller {
	public path = '/auth';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(`${this.path}/register`, this.registration);
		this.router.post(`${this.path}/login`, this.login);
		this.router.post(`${this.path}/logout`, this.logout);
	}

	private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: req.body.email
				}
			});
			if (!user) throw new HttpException('auterrror', 404, 'NOT_FOUND_USER_WITH_GIVEN_DATA');

			const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

			// if (!isPasswordValid) return next(new HttpException(400, 'INCORRECT_GIVEN_DATA'));

			// generate token
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}
	private logout(req: Request, res: Response) {
		res.cookie('JWT', '');
		res.sendStatus(200);
	}

	private async registration(req: Request, res: Response, next: NextFunction) {
		// try {
		// 	const salt = await bcrypt.genSalt();
		// 	const hashedPassword = await bcrypt.hash(req.body.password, salt);
		// 	await prisma.user.create({
		// 		data: {
		// 			email: req.body.email,
		// 			password: hashedPassword
		// 		}
		// 	});
		// 	res.status(201).send();
		// } catch (e) {
		// 	if (!(e instanceof Prisma.PrismaClientKnownRequestError)) return res.status(500).send({ message: 'SERVER_ERROR' });
		// 	if (e.code === 'P2002') return next(new HttpException(400, 'USER_WITH_GIVEN_EMAIL_ALREADY_EXIST'));
		// }
	}
}

export default AuthorizationController;
