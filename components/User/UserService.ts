import HttpException from '../../exceptions/httpException';
import prisma from '../../prisma/prismaClient';
import * as bcrypt from 'bcrypt';
import TokenService from '../Token/TokenService';
import { Service } from '../../types/components/service';
import { tLoginData, tRegistrationData } from '../../types/components/shared/user';

class UserService implements Service {
	private tokenService: Service;
	constructor() {
		this.tokenService = new TokenService();
	}
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

		const token = await this.tokenService.create(user.id);
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

	async me(tokenValue: string) {
		const token = await this.tokenService.find(tokenValue);

		if (!token) throw new HttpException(401, 'Token dosent exist');

		const user = await prisma.user.findUnique({
			where: {
				id: token.userId
			},
			select: {
				id: true,
				login: true,
				email: true
			}
		});
		return user;
	}
}

export default UserService;
