import { Module } from '../../types/components/module';
import UserTaskController from './UserTaskController';
import UserTaskService from './UserTaskService';

class UserTaskModule implements Module {
	init() {
		const controller = new UserTaskController(UserTaskService);
		return controller;
	}
}

export default UserTaskModule;
