import { Request } from 'express';
import HttpException from '../../exceptions/httpException';
import prisma from '../../prisma/prismaClient';
import * as bcrypt from 'bcrypt';
import { Service } from '../shared';
import TokenService from '../token/TokenServices';

class UserService implements Service {
	async login(req: Request) {
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						login: req.body.loginOrEmail
					},
					{
						email: req.body.loginOrEmail
					}
				]
			}
		});

		if (!user) throw new HttpException(404, 'NOT_FOUND_USER_WITH_GIVEN_DATA');

		const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
		if (!isPasswordValid) throw new HttpException(404, 'NOT_FOUND_USER_WITH_GIVEN_DATA');

		const tokenService = new TokenService();
		const token = await tokenService.create(user.id);
		const { password, ...userData } = user;
		return {
			user: userData,
			token
		};
	}

	async register(req: Request) {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		await prisma.user.create({
			data: {
				login: req.body.login,
				email: req.body.email,
				password: hashedPassword
			}
		});
	}
}

export default UserService;
