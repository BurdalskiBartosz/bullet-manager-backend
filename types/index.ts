import { Request } from 'express';

export type tUser = {
	id: string;
	email: string;
};

export type tRequestWithUser = {
	user?: tUser;
} & Request;
