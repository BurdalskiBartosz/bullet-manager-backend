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
				},
				subtasks: {
					select: {
						taskData: true
					}
				}
			}
		});
		return element;
	};

	getAll = async (id: number) => {
		const elements = await this.model.findMany({
			where: {
				userId: id,
				dataId: null
			},
			include: {
				data: true
			}
		});
		return elements;
	};

	async create() {}

	async edit() {}

	async delete() {}
}

export default TaskService;
