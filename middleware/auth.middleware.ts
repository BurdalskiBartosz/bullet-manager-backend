import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
interface User {
	email: string;
}

export interface RequestWithUser extends Request {
	user?: User;
}
function authorizationMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
	const token = req.cookies.JWT;
	if (token === null) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

export default authorizationMiddleware;