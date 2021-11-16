import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma/prismaClient';
import { Controller } from '../../types';
import * as bcrypt from 'bcrypt';
import { Prisma } from '.prisma/client';
import createError from 'http-errors';
import authorizationMiddleware, { RequestWithUser } from '../../middleware/auth.middleware';
import * as jwt from 'jsonwebtoken';

class AuthorizationController implements Controller {
	public path = '/auth';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, authorizationMiddleware, this.getUsers);
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
			if (!user) return next(createError(400, 'Taki użytkownik nie istnieje.'));
			const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
			if (!isPasswordValid) return res.send({ alias: 'NOT_SUCCESS' });

			const accessToken = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET as string, { expiresIn: 86400 });
			const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET as string, {
				expiresIn: 525600
			});

			res.cookie('JWT', accessToken, {
				maxAge: 86400000,
				httpOnly: true
			});

			res.send({ accessToken, refreshToken });
		} catch (e) {
			res.status(500).send();
		}
	}
	private logout(req: Request, res: Response) {
		res.cookie('JWT', '');
		res.sendStatus(200);
	}

	private async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(req.body.password, salt);

			await prisma.user.create({
				data: {
					email: req.body.email,
					password: hashedPassword
				}
			});
			res.status(201).send();
		} catch (e) {
			if (!(e instanceof Prisma.PrismaClientKnownRequestError)) return;
			if (e.code === 'P2002') {
				next(createError(400, 'Użytkownik o podanym adresie email już istnieje w bazie.'));
			}
		}
	}

	private getUsers(req: RequestWithUser, res: Response, next: NextFunction) {
		console.log('GET USERS');
	}
}

export default AuthorizationController;
