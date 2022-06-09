import { Request, Response } from 'express';
import { async } from '../../helpers';
import { Controller } from '../shared';

class ActivityController extends Controller {
	public path: string = '/activity';

	initializeRoutes() {}
}

export default ActivityController;
