import { Module } from '../../types/components/module';
import UserController from './UserController';
import UserService from './UserService';

class UserModule implements Module {
	init() {
		const controller = new UserController(UserService);
		return controller;
	}
}

export default UserModule;
