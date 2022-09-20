import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { CRUDService, tEntityMethods } from '../../types/components/service';

class UserTaskService extends CRUDService {
	protected entity: tEntity = 'userTask';
	protected model: tEntityMethods = prisma[this.entity];

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
		console.log(data);
		const task = await this.model.create({
			data: {
				userId: data.userId,
				title: data.title,
				description: data.description,
				plannedFinishDate: new Date(data.plannedFinishDate),
				categoryId: data.category
			}
		});
		return task;
	};

	async edit() {}

	async delete() {}
}

export default UserTaskService;
