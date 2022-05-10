import { Request } from 'express';

export type tUser = {
	id: number;
	email: string;
};

export type tRequestWithUser = {
	user?: tUser;
} & Request;
