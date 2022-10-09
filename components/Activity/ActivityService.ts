import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { CRUDService, tEntityMethods } from '../../types/components/service';

class ActivityService extends CRUDService {
	entity: tEntity = 'activity';
	model: tEntityMethods = prisma[this.entity];

	async getOne() {}
	async getAll() {}
	async create() {}
	async edit() {}
	async delete() {}
}

export default ActivityService;
