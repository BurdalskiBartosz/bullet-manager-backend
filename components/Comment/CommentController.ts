import { Request, Response } from 'express';
import { CRUDController, tEntity } from '../../types/components/controller/shared';

class CommentController extends CRUDController {
	public path: string = '/comment';

	protected getAll = async (req: Request, res: Response) => {
		console.log('getAll');
		res.send({ comment: 'getAll' }).status(200);
	};

	protected create = async (req: Request, res: Response) => {
		console.log('create');
		res.send({ comment: 'create' }).status(200);
	};

	protected edit = async (req: Request, res: Response) => {
		console.log('edit');
		res.send({ comment: 'edit' }).status(200);
	};

	protected delete = async (req: Request, res: Response) => {
		console.log('delete');
		res.send({ comment: 'delete' }).status(200);
	};
}

export default CommentController;
