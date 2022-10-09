import { tEntity } from '../controller/shared';

export interface iService {
	[x: string]: any;
}
export class Service implements iService {}
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

export interface iCRUDService {
	entity: tEntity;
	model: tEntityMethods;

	getOne(id: number): void;
	getAll(id: number): void;
	create(data: any): void;
	edit(id: number, data: any): void;
	delete(id: number): void;
}

export abstract class CRUDService implements iCRUDService {
	abstract entity: tEntity;
	abstract model: tEntityMethods;

	abstract getOne(id: number): void;

	abstract getAll(id: number): void;

	abstract create(data: any): void;

	abstract edit(id: number, data: any): void;

	abstract delete(id: number): void;
}
