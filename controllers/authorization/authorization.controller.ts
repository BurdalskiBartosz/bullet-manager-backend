import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma/prismaClient';
import { Controller, DataInJWT } from '../../types';
import * as bcrypt from 'bcrypt';
import { Prisma } from '.prisma/client';
import * as jwt from 'jsonwebtoken';
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
		this.router.post(`${this.path}/refresh`, this.refreshAccessToken);
	}

	private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: req.body.email
				}
			});

			if (!user) return next(new HttpException(404, 'NOT_FOUND_USER_WITH_GIVEN_DATA'));

			const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

			if (!isPasswordValid) return next(new HttpException(400, 'INCORRECT_GIVEN_DATA'));

			const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET as string, { expiresIn: 86400 });
			const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET as string, {
				expiresIn: 525600
			});

			res.cookie('JWT', accessToken, {
				maxAge: 864000000,
				httpOnly: true,
				secure: false
			});
			const { password, ...userData } = user;
			res.send({ accessToken, refreshToken, user: userData });
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
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
			if (!(e instanceof Prisma.PrismaClientKnownRequestError)) return res.status(500).send({ message: 'SERVER_ERROR' });
			if (e.code === 'P2002') return next(new HttpException(400, 'USER_WITH_GIVEN_EMAIL_ALREADY_EXIST'));
		}
	}

	private async refreshAccessToken(req: Request, res: Response) {
		console.log('REFRESH TOKEN ROUTE');
		const refreshToken = req.body.token;
		console.log(refreshToken);

		if (!refreshToken) return res.status(401).send();

		// TODO: Check if refreshToken exists in DB

		const validToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as DataInJWT;

		const email = validToken.email;

		if (!validToken) return res.status(403).send();

		const accessToken = jwt.sign({ email }, process.env.TOKEN_SECRET as string, { expiresIn: 86400 });
		res.send({ accessToken });
	}
}

export default AuthorizationController;
