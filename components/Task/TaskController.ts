import { Request, Response } from 'express';
import { CRUDController } from '../shared';

class TaskController extends CRUDController {
	public path: string = '/task';

	protected getOne = async (req: Request, res: Response) => {
		console.log('getOne');
		res.send({ task: 'getOne' }).status(200);
	};

	protected getAll = async (req: Request, res: Response) => {
		console.log('getAll');
		res.send({ task: 'getAll' }).status(200);
	};

	protected create = async (req: Request, res: Response) => {
		console.log('create');
		res.send({ task: 'create' }).status(200);
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
