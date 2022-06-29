import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { CRUDService, tEntityMethods } from '../../types/components/service';

class TaskService extends CRUDService {
	protected entity: tEntity = 'task';
	protected model: tEntityMethods = prisma[this.entity];

	getOne = async (id: number) => {
		const element = await this.model.findUnique({
			where: {
				id: id
			},
			include: {
				user: {
					select: {
						login: true,
						email: true
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
			}
		});
		return elements;
	};

	create = async (data: any) => {
		const task = await this.model.create({
			data: {
				title: data.title,
				description: data.description,
				plannedFinishDate: new Date(data.plannedFinishDate),
				createdBy: data.createdBy,
				priority: +data.priority,
				user: data.userId
			}
		});
		console.log(task);
		return task;
	};

	async edit() {}

	async delete() {}
}

export default TaskService;
