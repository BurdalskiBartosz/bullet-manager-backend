import { Request, Router } from 'express';
import { iClassGenericContructor } from '../../types/class';

export abstract class Controller<Service> {
	abstract path: string;
	public service: Service;
	public router = Router();

	constructor(Service: iClassGenericContructor<Service>) {
		this.service = new Service();
	}

	abstract initializeRoutes(): void;

	getData(req: Request) {
		return {
			query: req.query,
			body: req.body,
			params: req.params,
			headers: req.headers
		} as { [key: string]: object | string | undefined };
	}
}

export abstract class Module {
	abstract init(): Object;
}

export interface Service {
	[x: string]: any;
}
