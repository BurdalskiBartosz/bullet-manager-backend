import { Request, Response } from 'express';
import { CRUDController, tEntity } from '../../types/components/controller/shared';

class ActivityController {
	public path: string = '/activity';

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
