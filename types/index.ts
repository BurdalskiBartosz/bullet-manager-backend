import { Request, Router } from 'express';

export type Controller = {
	path: string;
	router: Router;
};

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
export interface CustomRequestWithUser<T> extends RequestWithUser {
	body: T;
}

export type DataInJWT = {
	id: number;
	email: string;
};

export type GetTaskQuery<T> = {
	where: T;
};

export type GetTaskStringQuery =
	| {
			date: string;
	  }
	| undefined;
