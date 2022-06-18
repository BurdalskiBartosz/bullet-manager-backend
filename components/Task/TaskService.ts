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

	createSubtask = async () => {
		const elements = await prisma.subtask.create({
			data: {
				order: 1,
				subtaskOfId: 1,
				taskData: {
					create: {
						userId: 1,
						title: 'SUBTASK DO TASKA O ID 1',
						description: 'SUBTASK DO TASKA O ID 1',
						date: new Date(),
						plannedFinishDate: new Date(),
						priority: 2,
						inProgressTime: 1989281,
						createdById: 1
					}
				}
			}
		});
		console.log(elements);
		console.log('elements');
		return elements;
	};

	async edit() {}

	async delete() {}
}

export default TaskService;
