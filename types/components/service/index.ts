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

	protected abstract getOne(id: number): void;

	protected abstract getAll(id: number): void;

	protected abstract create(): void;

	protected abstract edit(): void;

	protected abstract delete(): void;
}
