import { Module } from 'module';
import CommentController from './CommentController';
import CommentService from './CommentService';

class CommentModule extends Module {
	init() {
		return {
			Controller: CommentController,
			Service: CommentService
		};
	}
}

export default CommentModule;
