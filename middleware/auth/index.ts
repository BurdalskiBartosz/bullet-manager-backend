import { NextFunction, Response } from 'express';
import { tRequestWithUser } from '../../types';
import UserService from '../../components/User/UserService';

export default async (req: tRequestWithUser, res: Response, next: NextFunction) => {
	const tokenValue = req.cookies.token;
	const userService = new UserService();
	const user = await userService.me(tokenValue);
	console.log(user);
	next();
};
