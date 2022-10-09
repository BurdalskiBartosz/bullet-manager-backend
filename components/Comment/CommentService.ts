import prisma from '../../prisma/prismaClient';
import { tEntity } from '../../types/components/controller/shared';
import { CRUDService, tEntityMethods } from '../../types/components/service';

class CommentService extends CRUDService {
	entity: tEntity = 'comment';
	model: tEntityMethods = prisma[this.entity];

	async getOne() {}
	async getAll() {}
	async create() {}
	async edit() {}
	async delete() {}
}

export default CommentService;
