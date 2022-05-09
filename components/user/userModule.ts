import UserController from './UserController';
import UserService from './UserServices';

export abstract class Module {
	abstract init(): Object;
}

class UserModule extends Module {
	init() {
		return {
			Controller: UserController,
			Service: UserService
		};
	}
}

export default UserModule;
