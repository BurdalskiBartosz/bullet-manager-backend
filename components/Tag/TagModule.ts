import { Module } from '../shared';
import TagController from './TagController';
import TagService from './TagService';

class TagModule extends Module {
	init() {
		return {
			Controller: TagController,
			Service: TagService
		};
	}
}

export default TagModule;
