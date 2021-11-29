import { NextFunction, Response, Router } from 'express';
import authorizationMiddleware from '../../middleware/auth.middleware';
import prisma from '../../prisma/prismaClient';
import { Controller, CustomRequestWithUser, ITask, RequestWithUser } from '../../types';

class TaskController implements Controller {
	public path = '/task';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}`, authorizationMiddleware, this.create);
		this.router.get(`${this.path}`, authorizationMiddleware, this.get);
	}

	private async create(req: CustomRequestWithUser<ITask>, res: Response, next: NextFunction) {
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
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}
	private async get(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const tasks = await prisma.task.findMany({
				where: {
					userId: req.user?.id
				}
			});
			res.status(200).send(tasks);
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}
}

export default TaskController;
