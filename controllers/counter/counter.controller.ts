import { Response, Router } from 'express';
import authorizationMiddleware from '../../middleware/auth.middleware';
import prisma from '../../prisma/prismaClient';
import { Controller, CustomRequestWithUser, IQuery, IStringQuery, ITask, RequestWithUser } from '../../types';
import { tryParseJSON } from '../../utils/parseJSON';
class CounterController implements Controller {
	public path = '/counter';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get(`${this.path}/:id`, authorizationMiddleware, this.getOne);
		this.router.get(`${this.path}`, authorizationMiddleware, this.get);
		this.router.post(`${this.path}`, authorizationMiddleware, this.create);
		this.router.put(`${this.path}/:id`, authorizationMiddleware, this.update);
		this.router.delete(`${this.path}/:id`, authorizationMiddleware, this.delete);
	}

	private async create(req: CustomRequestWithUser<ITask>, res: Response) {
		try {
			await prisma.task.create({
				data: {
					userId: req.user?.id,
					title: req.body.title,
					content: req.body.content,
					type: req.body.type,
					priority: req.body.priority,
					date: req.body.date
				}
			});
			res.status(201).send();
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}
	private async get(req: RequestWithUser, res: Response) {
		try {
			const { where } = req.query as unknown as IQuery<JSON>;
			let decodedQuery: IStringQuery;
			if (typeof where === 'string') decodedQuery = tryParseJSON(where, {});
			const tasks = await prisma.task.findMany({
				where: {
					userId: req.user?.id,
					...decodedQuery
				}
			});
			res.status(201).send(tasks);
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}

	private async getOne(req: RequestWithUser, res: Response) {
		try {
			const { id } = req.params;
			const task = await prisma.task.findUnique({
				where: {
					id: Number(id)
				}
			});
			res.status(201).send(task);
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}

	private async update(req: CustomRequestWithUser<ITask>, res: Response) {
		try {
			const { id } = req.params;
			const task = await prisma.task.update({
				where: {
					id: Number(id)
				},
				data: {
					title: req.body.title,
					content: req.body.content,
					type: req.body.type,
					priority: req.body.priority,
					date: req.body.date
				}
			});
			res.status(201).send(task);
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}

	private async delete(req: RequestWithUser, res: Response) {
		try {
			const { id } = req.params;
			const task = await prisma.task.delete({
				where: {
					id: Number(id)
				}
			});
			res.status(201).send(task);
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}
}

export default CounterController;
