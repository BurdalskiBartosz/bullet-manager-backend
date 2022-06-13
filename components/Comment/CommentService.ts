import { tEntity } from '../../types/components/controller/shared';
import { CRUDService } from '../../types/components/service';

class CommentService extends CRUDService {
	protected entity: tEntity = 'comment';
	async getAll() {
		return 'Działam';
	}

	async create() {}

	async edit() {}

	async delete() {}
}

export default CommentService;
