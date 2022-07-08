import { CRUDService, tEntityMethods } from '../../types/components/service';
import { tEntity } from '../../types/components/controller/shared';
import prisma from '../../prisma/prismaClient';

class UserService extends CRUDService {
	protected entity: tEntity = 'user';
	protected model: tEntityMethods = prisma[this.entity];

	getOne = async (id: number) => {
		const element = await this.model.findUnique({
			where: {
				id: id
			}
		});
		return element;
	};

	getAll = async () => {
		const elements = await this.model.findMany({});
		return elements;
	};

	create = async () => {};

	edit = async () => {};

	delete = async () => {};
}

export default UserService;
