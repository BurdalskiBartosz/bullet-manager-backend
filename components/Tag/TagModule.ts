import { Module } from '../../types/components/module';
import TagController from './TagController';
import TagService from './TagService';

class TagModule implements Module {
	init() {
		return {
			Controller: TagController,
			Service: TagService
		};
	}
}

export default TagModule;
