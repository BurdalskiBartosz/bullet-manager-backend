import { Request, Response } from 'express';
import { tRequestWithUser } from '../../types';
import { CRUDController } from '../../types/components/controller/shared';

class CategoryController extends CRUDController {
	public path: string = '/category';

	getOne = async (req: Request, res: Response) => {
		const id = +req.params.id;
		console.log(id);
		res.send({ data: 'getOne' }).status(200);
	};

	getAll = async (req: tRequestWithUser, res: Response) => {
		const userId = req.user!.id;
		const data = await this.service.getAll(userId);
		res.send(data).status(200);
	};

	create = async (req: tRequestWithUser, res: Response) => {
		const createData = {
			...req.body,
			userId: req.user?.id
		};
		const data = await this.service.create(createData);
		res.send({ data }).status(200);
	};
	edit = async (req: tRequestWithUser, res: Response) => {
		const id = +req.params.id;
		const data = req.body;
		const element = await this.service.edit(id, data);
		res.send({ element }).status(200);
	};

	delete = async (req: tRequestWithUser, res: Response) => {
		const id = +req.params.id;
		const element = await this.service.delete(id);

		res.send({ element }).status(200);
	};
}

export default CategoryController;
