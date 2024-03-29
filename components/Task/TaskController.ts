import { Request, Response } from 'express';
import { tRequestWithUser } from '../../types';
import { CRUDController } from '../../types/components/controller/shared';

class TaskController extends CRUDController {
	public path: string = '/task';

	getOne = async (req: Request, res: Response) => {
		const id = +req.params.id;
		console.log(req.query.relations);
		const data = await this.service.getOne(id);
		res.send({ data }).status(200);
	};

	getAll = async (req: tRequestWithUser, res: Response) => {
		const userId = req.user!.id;
		const data = await this.service.getAll(userId);
		res.send(data).status(200);
	};

	create = async (req: tRequestWithUser, res: Response) => {
		const createData = {
			...req.body,
			createdBy: req.user?.id
		};
		const data = await this.service.create(createData);
		res.send({ data }).status(200);
	};

	edit = async (req: Request, res: Response) => {
		console.log('edit');
		res.send({ task: 'edit' }).status(200);
	};

	delete = async (req: Request, res: Response) => {
		console.log('delete');
		res.send({ task: 'delete' }).status(200);
	};
}

export default TaskController;
