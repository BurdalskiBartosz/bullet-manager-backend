import prisma from '../../prisma/prismaClient';
import crypto from 'crypto';
import { Service } from '../../types/components/service';

class TokenService implements Service {
	async create(userId: any) {
		const token = crypto.randomBytes(64).toString('hex');
		await prisma.token.create({
			data: {
				userId,
				value: token
			}
		});
		return token;
	}
}

export default TokenService;
