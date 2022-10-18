import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { CRUDService, tEntityMethods } from '../../types/components/service';

class TagService extends CRUDService {
	protected entity: tEntity = 'tag';
	protected model: tEntityMethods = prisma[this.entity];

	async getOne() {}
	async getAll() {}
	async create() {}
	async edit() {}
	async delete() {}
}

export default TagService;
