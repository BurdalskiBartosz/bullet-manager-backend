import { Request } from 'express';

export type tUser = {
	id: string;
	email: string;
};

export type UserToReqMiddleware = {
	user?: tUser;
} & Request;

export type RequestWithUser = Required<UserToReqMiddleware>;
