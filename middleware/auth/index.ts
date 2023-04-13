import { NextFunction, Response } from 'express';
import { UserToReqMiddleware } from '../../types';
import TokenService from '../../components/Token/TokenService';
import HttpException from '../../exceptions/httpException';

export default async (req: UserToReqMiddleware, res: Response, next: NextFunction) => {
	const tokenValue = req.cookies.token;
	const tokenService = new TokenService();
	try {
		const token = await tokenService.find(tokenValue);
		if (!token) throw new HttpException(401, 'Cannot find user');
		req.user = token.user;
		next();
	} catch (err) {
		next(err);
	}
};
