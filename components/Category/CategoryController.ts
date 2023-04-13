import { Request, Response } from 'express';
import { RequestWithUser } from '../../types';
import { CRUDController } from '../../types/components/controller/shared';
import CategoryService from './CategoryService';

class CategoryController extends CRUDController<CategoryService> {
	public path: string = '/category';

	getOne = async (req: Request, res: Response) => {
		const id = req.params.id;
		console.log(id);
		const data = await this.service.getOne(id);
		res.send(data).status(200);
	};

	getAll = async (req: RequestWithUser, res: Response) => {
		const userId = req.user.id;
		const data = await this.service.getAll(userId);
		res.send(data).status(200);
	};

	create = async (req: RequestWithUser, res: Response) => {
		const createData = {
			...req.body,
			userId: req.user?.id
		};
		const data = await this.service.create(createData);
		res.send({ data }).status(200);
	};
	edit = async (req: RequestWithUser, res: Response) => {
		const id = req.params.id;
		const data = req.body;
		const element = await this.service.edit(id, data);
		res.send({ element }).status(200);
	};

	delete = async (req: RequestWithUser, res: Response) => {
		const id = req.params.id;
		const element = await this.service.delete(id);

		res.send({ element }).status(200);
	};
}

export default CategoryController;
