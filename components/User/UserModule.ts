import { Module } from 'module';
import UserController from './UserController';
import UserService from './UserService';

class UserModule extends Module {
	init() {
		return {
			Controller: UserController,
			Service: UserService
		};
	}
}

export default UserModule;
