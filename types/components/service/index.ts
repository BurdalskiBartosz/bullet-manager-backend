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
