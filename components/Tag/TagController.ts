import { Request, Response } from 'express';
import { CRUDController } from '../shared';

class TagController extends CRUDController {
	public path: string = '/tag';

	protected getOne = async (req: Request, res: Response) => {
		console.log('getOne');
		res.send({ tag: 'getOne' }).status(200);
	};

	protected getAll = async (req: Request, res: Response) => {
		console.log('getAll');
		res.send({ tag: 'getAll' }).status(200);
	};

	protected create = async (req: Request, res: Response) => {
		console.log('create');
		res.send({ tag: 'create' }).status(200);
	};

	protected edit = async (req: Request, res: Response) => {
		console.log('edit');
		res.send({ tag: 'edit' }).status(200);
	};

	protected delete = async (req: Request, res: Response) => {
		console.log('delete');
		res.send({ tag: 'delete' }).status(200);
	};
}

export default TagController;
