import { Module } from '../../types/components/module';
import TokenController from './TokenController';
import TokenService from './TokenServices';

class TokenModule extends Module {
	init() {
		return {
			Controller: TokenController,
			Service: TokenService
		};
	}
}

export default TokenModule;
