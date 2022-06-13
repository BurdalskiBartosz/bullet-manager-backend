import prisma from '../../../prisma/prismaClient';
import { tEntity } from '../controller/shared';

export interface Service {
	[x: string]: any;
}
export type tEntityMethods = {
	findUnique: Function;
	findFirst: Function;
	findMany: Function;
	create: Function;
	createMany: Function;
	delete: Function;
	update: Function;
	deleteMany: Function;
	updateMany: Function;
	upsert: Function;
	count: Function;
	aggregate: Function;
	groupBy: Function;
};

export abstract class CRUDService {
	protected abstract entity: tEntity;

	getOne = async (id: number) => {
		const model = prisma[this.entity] as tEntityMethods;
		const element = await model.findUnique({
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
				createdBy: true,
				comments: true,
				subtasks: {
					select: {
						order: true,
						taskData: true
					}
				}
			}
		});
		return element;
	};

	protected abstract getAll(): void;

	protected abstract create(): void;

	protected abstract edit(): void;

	protected abstract delete(): void;
}
