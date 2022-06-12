import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { Service, tEntityMethods } from '../../types/components/service';

class TaskService implements Service {
	async getOne(id: number, entity: tEntity) {
		console.log(id);

		const model = prisma[entity] as tEntityMethods;
		const element = await model.findUnique({
			where: {
				id: id
			},
			include: {
				User: {
					select: {
						login: true,
						email: true
					}
				}
			}
		});
		return element;
	}

	async getAll(id: number, entity: tEntity) {
		console.log(entity);
		return 'Działam';
	}

	async create() {}

	async edit() {}

	async delete() {}
}

export default TaskService;
