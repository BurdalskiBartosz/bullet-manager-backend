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
	protected abstract model: tEntityMethods;

	abstract getOne(id: number): void;

	abstract getAll(id: number): void;

	abstract create(data: any): void;

	abstract edit(id: number, data: any): void;

	abstract delete(id: number): void;
}
