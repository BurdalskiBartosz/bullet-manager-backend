import { tEntity } from '../../types/components/controller/shared';
import { CRUDService } from '../../types/components/service';

class TaskService extends CRUDService {
	protected entity: tEntity = 'task';

	async getAll() {
		return 'Działam';
	}

	async create() {}

	async edit() {}

	async delete() {}
}

export default TaskService;
