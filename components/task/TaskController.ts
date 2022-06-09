import { Request, Response } from 'express';
import { async } from '../../helpers';
import { Controller } from '../shared';

class TaskController extends Controller {
	public path: string = '/task';

	initializeRoutes() {
		this.router.get(`${this.path}/:id`, async(this.getTask));
		this.router.get(`${this.path}`, async(this.getTasks));
		this.router.post(`${this.path}`, async(this.createTask));
		this.router.patch(`${this.path}/:id`, async(this.editTask));
		this.router.delete(`${this.path}/:id`, async(this.deleteTask));
	}

	private getTask = async () => {};

	private getTasks = async () => {};

	private createTask = async () => {};

	private editTask = async () => {};

	private deleteTask = async () => {};
}

export default TaskController;
