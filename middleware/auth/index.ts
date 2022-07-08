import { NextFunction, Response } from 'express';
import { tRequestWithUser } from '../../types';
import HttpException from '../../exceptions/httpException';
import TokenService from '../../components/token/TokenServices';

export default async (req: tRequestWithUser, res: Response, next: NextFunction) => {
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
