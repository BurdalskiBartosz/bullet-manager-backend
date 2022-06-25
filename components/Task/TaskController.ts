import { Request, Response } from 'express';
import { tRequestWithUser } from '../../types';
import { CRUDController } from '../../types/components/controller/shared';

class TaskController extends CRUDController {
	public path: string = '/task';

	protected getOne = async (req: Request, res: Response) => {
		const id = +req.params.id;
		console.log(req.query.relations);
		const data = await this.service.getOne(id);
		res.send({ data }).status(200);
	};

	protected getAll = async (req: tRequestWithUser, res: Response) => {
		const userId = req.user?.id;
		console.log(userId);
		const data = await this.service.getAll(userId);
		res.send({ data }).status(200);
	};

	protected create = async (req: Request, res: Response) => {
		console.log('create');
		const data = await this.service.create();
		res.send({ data }).status(200);
	};

	protected edit = async (req: Request, res: Response) => {
		console.log('edit');
		res.send({ task: 'edit' }).status(200);
	};

	protected delete = async (req: Request, res: Response) => {
		console.log('delete');
		res.send({ task: 'delete' }).status(200);
	};
}

export default TaskController;
