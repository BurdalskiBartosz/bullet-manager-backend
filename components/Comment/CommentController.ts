import { Request, Response } from 'express';
import { async } from '../../helpers';
import { Controller } from '../shared';

class CommentController extends Controller {
	public path: string = '/comment';

	initializeRoutes() {}
}

export default CommentController;
