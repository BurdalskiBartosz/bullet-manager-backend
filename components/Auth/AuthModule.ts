import { Module } from '../../types/components/module';
import AuthController from './AuthController';
import AuthService from './AuthService';

class AuthModule extends Module {
	init() {
		return {
			Controller: AuthController,
			Service: AuthService
		};
	}
}

export default AuthModule;
