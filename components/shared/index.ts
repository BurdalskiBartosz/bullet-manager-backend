import { Request, Router } from 'express';
import { iClassGenericContructor } from '../../types/class';

export abstract class Controller {
	abstract path: string;
	public service: Service;
	public router = Router();

	constructor(Service: iClassGenericContructor<Service>) {
		this.service = new Service();
	}

	abstract initializeRoutes(): void;
}

export abstract class Module {
	abstract init(): Object;
}

export interface Service {
	[x: string]: any;
}

export type tLoginData = {
	loginOrEmail: string;
	password: string;
};

export type tRegistrationData = {
	login: string;
	email: string;
	password: string;
};
