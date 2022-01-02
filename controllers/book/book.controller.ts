import { Response, Router } from 'express';
import authorizationMiddleware from '../../middleware/auth.middleware';
import prisma from '../../prisma/prismaClient';
import { Controller, CustomRequestWithUser, IQuery, IStringQuery, INote, RequestWithUser } from '../../types';
import { tryParseJSON } from '../../utils/parseJSON';

class BookController implements Controller {
	public path = '/note';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(`${this.path}`, authorizationMiddleware, this.create);
		this.router.get(`${this.path}`, authorizationMiddleware, this.get);
	}

	private async create(req: CustomRequestWithUser<INote>, res: Response) {
		try {
			await prisma.note.create({
				data: {
					userId: req.user?.id,
					content: req.body.content,
					type: req.body.type,
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
			const notes = await prisma.note.findMany({
				where: {
					userId: req.user?.id,
					...decodedQuery
				}
			});
			res.status(201).send(notes);
		} catch (e) {
			res.status(500).send({ message: 'SERVER_ERROR' });
		}
	}
}

export default BookController;
