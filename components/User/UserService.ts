import HttpException from '../../exceptions/httpException';
import prisma from '../../prisma/prismaClient';
import * as bcrypt from 'bcrypt';
import { Service, tLoginData, tRegistrationData } from '../shared';
import TokenService from '../Token/TokenService';

class UserService implements Service {
	async login(data: tLoginData) {
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						login: data.loginOrEmail
					},
					{
						email: data.loginOrEmail
					}
				]
			}
		});

		if (!user) throw new HttpException(404, 'Not found user with given data');

		const isPasswordValid = await bcrypt.compare(data.password, user.password);
		if (!isPasswordValid) throw new HttpException(404, 'Not found user with given data');

		const tokenService = new TokenService();
		const token = await tokenService.create(user.id);
		const { password, ...userData } = user;
		return {
			user: userData,
			token
		};
	}

	async register(data: tRegistrationData) {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(data.password, salt);
		await prisma.user.create({
			data: {
				login: data.login,
				email: data.email,
				password: hashedPassword
			}
		});
	}
}

export default UserService;
