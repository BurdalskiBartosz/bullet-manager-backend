import { Request, Response } from 'express';
import { async } from '../../helpers';
import { Controller } from '../shared';

class TagController extends Controller {
	public path: string = '/tag';

	initializeRoutes() {}
}

export default TagController;
