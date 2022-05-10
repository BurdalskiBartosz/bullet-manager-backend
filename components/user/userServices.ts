import { Request } from 'express';
import HttpException from '../../exceptions/httpException';
import prisma from '../../prisma/prismaClient';
import * as bcrypt from 'bcrypt';
import { Service } from '../shared';

class UserService implements Service {
	async login(req: Request) {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email
			}
		});
		if (!user) throw new HttpException('auterrror', 404, 'NOT_FOUND_USER_WITH_GIVEN_DATA');
		const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
	}

	async register(req: Request) {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		await prisma.user.create({
			data: {
				email: req.body.email,
				password: hashedPassword
			}
		});

		return true;
	}
}

export default UserService;
