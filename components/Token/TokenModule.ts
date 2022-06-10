import { Module } from 'module';
import TokenController from './TokenController';
import TokenService from './TokenService';

class TokenModule extends Module {
	init() {
		return {
			Controller: TokenController,
			Service: TokenService
		};
	}
}

export default TokenModule;
