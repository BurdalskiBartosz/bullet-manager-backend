// export type tEntity =
// 	| 'user'
// 	| 'userTask'
// 	| 'category'
// 	| 'projectTask'
// 	| 'comment'
// 	| 'tag'
// 	| 'token'
// 	| 'activity';

export type iService = {
	[x: string]: any;
};
export class Service implements iService {}

export type iCRUDService = {
	// entity: tEntity;
	// model: typeof dbService[tEntity];
	getOne(id: string): void;
	getAll(id: string): void;
	create(data: any): void;
	edit(id: string, data: any): void;
	delete(id: string): void;
};

export abstract class CRUDService implements iCRUDService {
	// entity: tEntity;
	// model: typeof dbService[tEntity];

	// constructor(entity: tEntity) {
	// 	this.entity = entity ;
	// 	this.model = dbService[entity];
	// }

	abstract getOne(id: string): void;

	abstract getAll(id: string): void;

	abstract create(data: any): void;

	abstract edit(id: string, data: any): void;

	abstract delete(id: string): void;
}
