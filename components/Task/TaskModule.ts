import { Module } from 'module';
import TaskController from './TaskController';
import TaskService from './TaskService';

class TaskModule extends Module {
	init() {
		return {
			Controller: TaskController,
			Service: TaskService
		};
	}
}

export default TaskModule;
