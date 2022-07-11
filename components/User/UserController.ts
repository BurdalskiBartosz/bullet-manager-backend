import { Request, Response } from 'express';
import { tRequestWithUser } from '../../types';
import { CRUDController } from '../../types/components/controller/shared';

class UserController extends CRUDController {
	public path: string = '/user';

	protected getOne = async (req: Request, res: Response) => {
		const id = +req.params.id;
		const data = await this.service.getOne(id);
		res.send({ data }).status(200);
	};

	protected getAll = async (req: tRequestWithUser, res: Response) => {
		const userId = req.user?.id;
		const data = await this.service.getAll(userId);
		res.send(data).status(200);
	};

	protected create = async (req: tRequestWithUser, res: Response) => {
		res.send({ user: 'create' }).status(200);
	};

	protected edit = async (req: Request, res: Response) => {
		console.log('edit');
		res.send({ user: 'edit' }).status(200);
	};

	protected delete = async (req: Request, res: Response) => {
		console.log('delete');
		res.send({ user: 'delete' }).status(200);
	};

	private me = async (req: tRequestWithUser, res: Response) => {
		const user = req.user;
		return res.send({ user }).status(200);
	};
}

export default UserController;
