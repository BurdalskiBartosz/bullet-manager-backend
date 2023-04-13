import { Request, Response } from 'express';
import { RequestWithUser } from '../../types';
import { CRUDController } from '../../types/components/controller/shared';
import UserService from './UserService';

class UserController extends CRUDController<UserService> {
	public path: string = '/user';

	getOne = async (req: Request, res: Response) => {
		const id = req.params.id;
		const data = await this.service.getOne(id);
		res.send({ data }).status(200);
	};

	getAll = async (req: RequestWithUser, res: Response) => {
		const data = await this.service.getAll();
		res.send(data).status(200);
	};

	create = async (req: RequestWithUser, res: Response) => {
		res.send({ user: 'create' }).status(200);
	};

	edit = async (req: Request, res: Response) => {
		console.log('edit');
		res.send({ user: 'edit' }).status(200);
	};

	delete = async (req: Request, res: Response) => {
		console.log('delete');
		res.send({ user: 'delete' }).status(200);
	};

	private me = async (req: RequestWithUser, res: Response) => {
		const user = req.user;
		return res.send({ user }).status(200);
	};
}

export default UserController;
