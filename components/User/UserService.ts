import { CRUDService } from '../../types/components/service';
import dbService from '../db/DBService';

class UserService extends CRUDService {
	model = dbService['user'];

	getOne = async (id: string) => {
		const element = await this.model.findUnique({
			where: {
				id: id
			}
		});
		return element;
	};

	getAll = async () => {
		const elements = await this.model.findMany({});
		return elements;
	};

	create = async () => {};

	edit = async () => {};

	delete = async () => {};
}

export default UserService;
