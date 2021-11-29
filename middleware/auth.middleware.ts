import * as jwt from 'jsonwebtoken';

import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../types';

function authorizationMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
	const token = req.cookies.JWT;
	if (token === null) return res.sendStatus(401);
	jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
		if (err) return res.status(403).json({ alias: 'TOKEN_EXPIRED' });
		req.user = user;
		next();
	});
}

export default authorizationMiddleware;
