import { Request, Router } from 'express';

export interface Controller {
	path: string;
	router: Router;

	initializeRoutes(): void;
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
	type: string;
	priority: string;
	date: string;
};

export type INote = {
	content: string;
	type: string;
	date: string;
};
export interface CustomRequestWithUser<T> extends RequestWithUser {
	body: T;
}

export type DataInJWT = {
	id: number;
	email: string;
};

export type IQuery<T> = {
	where: T;
};

export type IStringQuery =
	| {
			date: string;
	  }
	| undefined;
