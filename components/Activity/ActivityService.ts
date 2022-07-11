import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { CRUDService, tEntityMethods } from '../../types/components/service';

class ActivityService extends CRUDService {
	protected entity: tEntity = 'activity';
	protected model: tEntityMethods = prisma[this.entity];

	async create() {}

	async edit() {}

	async delete() {}
}

export default ActivityService;
