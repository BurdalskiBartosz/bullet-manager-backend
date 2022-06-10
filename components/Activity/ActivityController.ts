import { Request, Response } from 'express';
import { CRUDController } from '../shared';

class ActivityController extends CRUDController {
	public path: string = '/activity';

	protected getOne = async (req: Request, res: Response) => {
		console.log('getOne');
		res.send({ activity: 'getOne' }).status(200);
	};

	protected getAll = async (req: Request, res: Response) => {
		console.log('getAll');
		res.send({ activity: 'getAll' }).status(200);
	};

	protected create = async (req: Request, res: Response) => {
		console.log('create');
		res.send({ activity: 'create' }).status(200);
	};

	protected edit = async (req: Request, res: Response) => {
		console.log('edit');
		res.send({ activity: 'edit' }).status(200);
	};

	protected delete = async (req: Request, res: Response) => {
		console.log('delete');
		res.send({ activity: 'delete' }).status(200);
	};
}

export default ActivityController;
