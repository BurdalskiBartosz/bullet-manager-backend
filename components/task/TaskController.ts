import { Request, Response } from 'express';
import { async } from '../../helpers';
import { Controller } from '../shared';

class TaskController extends Controller {
	public path: string = '/task';

	initializeRoutes() {}
}

export default TaskController;
