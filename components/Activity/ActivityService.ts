import { tEntity } from '../../types/components/controller/shared';
import { CRUDService } from '../../types/components/service';

class ActivityService extends CRUDService {
	protected entity: tEntity = 'activity';
	async getAll() {
		return 'Działam';
	}

	async create() {}

	async edit() {}

	async delete() {}
}

export default ActivityService;
