import { NextFunction, Response, Router } from 'express';
import authorizationMiddleware, { RequestWithUser } from '../../middleware/auth.middleware';
import prisma from '../../prisma/prismaClient';
import { Controller } from '../../types';

interface RequestWithTask {
	title: string;
	content: string;
	type: string;
	priority: string;
}
interface CustomRequest<T> extends RequestWithUser {
	body: T;
}
class TaskController implements Controller {
	public path = '/task';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/create`, authorizationMiddleware, this.create);
	}

	private async create(req: CustomRequest<RequestWithTask>, res: Response, next: NextFunction) {
		try {
			await prisma.task.create({
				data: {
					userId: req.user?.id,
					title: req.body.title,
					content: req.body.content,
					type: req.body.type,
					priority: req.body.priority
				}
			});
			res.status(201).send();
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}
}

export default TaskController;
