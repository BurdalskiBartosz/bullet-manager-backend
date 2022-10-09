import { Module } from '../../types/components/module';
import TokenController from './TokenController';
import TokenService from './TokenService';

class TokenModule implements Module {
	init() {
		const controller = new TokenController(TokenService);
		return controller;
	}
}

export default TokenModule;
