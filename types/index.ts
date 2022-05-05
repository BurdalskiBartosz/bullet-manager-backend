import { Request, Response, Router } from 'express';

export type tErrorsCode = 'P2002';
export class Controller {
	public path!: string;
	public router: Router = Router();

	initializeRoutes() {}
}

export type IUser = {
	id: number;
	email: string;
};

export interface RequestWithUser extends Request {
	user?: IUser;
}

export type ITask = {
	title: string;
	content: string;
	priority: string;
	date: string;
};

export interface CustomRequestWithUser<T> extends RequestWithUser {
	body: T;
}
