import { Module } from '../../types/components/module';
import AuthController from './AuthController';
import AuthService from './AuthService';

class AuthModule implements Module {
	init() {
		const controller = new AuthController(AuthService);
		return controller;
	}
}

export default AuthModule;
