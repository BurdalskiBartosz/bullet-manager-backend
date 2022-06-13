import { tEntity } from '../../types/components/controller/shared';
import { CRUDService } from '../../types/components/service';

class TagService extends CRUDService {
	protected entity: tEntity = 'tag';
	async getAll() {
		return 'Działam';
	}

	async create() {}

	async edit() {}

	async delete() {}
}

export default TagService;
