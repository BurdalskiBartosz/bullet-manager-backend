import { CRUDService } from '../../types/components/service';
import { startOfDay, add, format, isAfter } from 'date-fns';
import dbService from '../db/DBService';

type UserTask = {
	userId: string;
	title: string;
	description: string;
	plannedFinishDate: string;
	category?: string;
};
class UserTaskService extends CRUDService {
	entity = 'userTask' as const;
	model = dbService[this.entity];

	getOne = async (id: string) => {
		const element = await this.model.findUnique({
			where: {
				id: id
			},
			include: {
				categories: true
			}
		});
		return element;
	};

	getAll = async (id: string) => {
		const startOfToday = startOfDay(new Date());
		const startOfNextDay = startOfDay(
			add(new Date(), {
				days: 1
			})
		);
		const elements = await this.model.findMany({
			where: {
				userId: id,
				plannedFinishDate: {
					gte: startOfToday,
					lte: startOfNextDay
				}
			},
			select: {
				id: true,
				title: true,
				plannedFinishDate: true,
				description: true,
				categories: true,
				priority: true,
				isDone: true
			}
		});

		return elements;
	};

	getTaskGroupedByDate = async (id: string) => {
		const nextDay = startOfDay(
			add(new Date(), {
				days: 1
			})
		);
		const startOfNextDay = startOfDay(
			add(new Date(), {
				days: 5
			})
		);

		const elements = await this.model.findMany({
			where: {
				userId: id,
				plannedFinishDate: {
					gte: nextDay,
					lte: startOfNextDay
				}
			},
			select: {
				id: true,
				title: true,
				plannedFinishDate: true,
				description: true,
				categories: true,
				priority: true,
				isDone: true
			}
		});

		const groupedDataMap = new Map();
		elements.forEach((el: any) => {
			const day = format(new Date(el.plannedFinishDate), 'MM/dd/yyyy');
			if (groupedDataMap.has(day)) {
				const dayKey = groupedDataMap.get(day);
				dayKey.push(el);
			} else {
				groupedDataMap.set(day, [el]);
			}
		});

		const groupedDataArr = Object.entries<UserTask[]>(Object.fromEntries(groupedDataMap));

		const sortedByDate = groupedDataArr.sort((a, b) => {
			const isAfterDate = isAfter(new Date(a[0]), new Date(b[0]));
			if (isAfterDate) return 1;
			else return -1;
		});

		return sortedByDate;
	};

	create = async (data: UserTask) => {
		let categoriesActions;
		if (data.category) {
			categoriesActions = {
				connectOrCreate: {
					where: {
						id: data.category
					},
					create: {
						userId: data.userId,
						name: data.category
					}
				}
			};
		}
		const element = await this.model.create({
			data: {
				userId: data.userId,
				title: data.title,
				description: data.description,
				plannedFinishDate: new Date(data.plannedFinishDate),
				categories: {
					...categoriesActions
				},
				isDone: false
			}
		});
		return element;
	};

	edit = async (id: string, data: any) => {
		const element = await this.model.update({
			where: {
				id: id
			},
			data: {
				...data
			}
		});
		return element;
	};

	delete = async (id: string) => {
		const element = await this.model.delete({
			where: {
				id: id
			}
		});
		return element;
	};
}

export default UserTaskService;
