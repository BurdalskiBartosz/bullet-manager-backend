import { Module } from '../../types/components/module';
import UserTaskController from './UserTaskController';
import UserTaskService from './UserTaskService';

class UserTaskModule extends Module {
	init() {
		return {
			Controller: UserTaskController,
			Service: UserTaskService
		};
	}
}

export default UserTaskModule;
