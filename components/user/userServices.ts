import { Request } from 'express';
import HttpException from '../../exceptions/httpException';
import prisma from '../../prisma/prismaClient';
import * as bcrypt from 'bcrypt';

export interface Service {
	[x: string]: any;
}

class UserService implements Service {
	async login(data: any) {
		throw new HttpException('auterrror', 404, 'NOTaa_FOUND_USER_WITH_GIVEN_DATA');
		// const user = await prisma.user.findUnique({
		// 	where: {
		// 		email: req.body.email
		// 	}
		// });
	}

	async register(req: Request) {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = await prisma.user.create({
			data: {
				email: req.body.email,
				password: hashedPassword
			}
		});
	}
}

export default UserService;
