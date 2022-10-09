import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { CRUDService, tEntityMethods } from '../../types/components/service';

class UserTaskService extends CRUDService {
	entity: tEntity = 'userTask';
	model: tEntityMethods = prisma[this.entity];

	getOne = async (id: number) => {
		const element = await this.model.findUnique({
			where: {
				id: id
			},
			include: {
				category: {
					select: {
						name: true
					}
				}
			}
		});
		return element;
	};

	getAll = async (id: number) => {
		const elements = await this.model.findMany({
			where: {
				userId: id
			},
			include: {
				category: {
					select: {
						name: true
					}
				}
			}
		});
		return elements;
	};

	create = async (data: any) => {
		const element = await this.model.create({
			data: {
				userId: data.userId,
				title: data.title,
				description: data.description,
				plannedFinishDate: new Date(data.plannedFinishDate),
				categoryId: data.category
			}
		});
		return element;
	};

	edit = async (id: number, data: any) => {
		const element = await this.model.update({
			where: {
				id: id
			},
			data: {
				...data
			}
		});
		return element;
	};

	delete = async (id: number) => {
		const element = await this.model.delete({
			where: {
				id: id
			}
		});
		return element;
	};
}

export default UserTaskService;