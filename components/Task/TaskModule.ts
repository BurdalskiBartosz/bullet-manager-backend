import { Module } from '../../types/components/module';
import TaskController from './TaskController';
import TaskService from './TaskService';

class TaskModule implements Module {
	init() {
		const controller = new TaskController(TaskService);
		return controller;
	}
}

export default TaskModule;
