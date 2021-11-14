import { Request, Response, Router } from 'express';
import prisma from '../../prisma/prismaClient';
import { Controller } from '../../types';
import * as bcrypt from 'bcrypt';
import { Prisma } from '.prisma/client';

class UsersController implements Controller {
	public path = '/users';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, this.getUsers);
		this.router.post(this.path, this.createUser);
	}

	private async createUser(req: Request, res: Response) {
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
				res
					.status(400)
					.send('Użytkownik o podanym adresie email już istnieje w bazie.');
			}
			throw e;
		}
	}

	private async getUsers(req: Request, res: Response) {
		const users = await prisma.user.findMany();
		console.log(users);
	}
}

export default UsersController;
