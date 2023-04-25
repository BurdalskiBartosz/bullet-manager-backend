import { Request, Response } from 'express';
import { async } from '../../helpers';
import { authMiddleware } from '../../middleware';
import { RequestWithUser } from '../../types';
import { CRUDController } from '../../types/components/controller/shared';
import UserTaskService from './UserTaskService';

class UserTaskController extends CRUDController<UserTaskService> {
	public path: string = '/user-task';

	initializeRoutes() {
		this.router.get(
			`${this.path}/grouped-by-date`,
			authMiddleware,
			async(this.getTaskGroupedByDate)
		);
		super.initializeRoutes();
	}

	getOne = async (req: RequestWithUser, res: Response) => {
		const id = req.params.id;
		console.log(id);
		res.send({ data: 'getOne' }).status(200);
	};

	getAll = async (req: RequestWithUser, res: Response) => {
		const userId = req.user.id;
		const data = await this.service.getAll(userId);
		res.send(data).status(200);
	};

	create = async (req: RequestWithUser, res: Response) => {
		const createData = {
			...req.body,
			userId: req.user?.id
		};
		const data = await this.service.create(createData);
		res.send({ data }).status(200);
	};

	getTaskGroupedByDate = async (req: RequestWithUser, res: Response) => {
		const userId = req.user.id;
		const data = await this.service.getTaskGroupedByDate(userId);
		res.send(data).status(200);
	};

	edit = async (req: RequestWithUser, res: Response) => {
		const id = req.params.id;
		const data = req.body;
		const element = await this.service.edit(id, data);
		res.send({ element }).status(200);
	};

	delete = async (req: RequestWithUser, res: Response) => {
		const id = req.params.id;
		const element = await this.service.delete(id);

		res.send({ element }).status(200);
	};
}

export default UserTaskController;
