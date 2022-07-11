import { Module } from '../../types/components/module';
import ActivityController from './ActivityController';
import ActivityService from './ActivityService';

class ActivityModule extends Module {
	init() {
		return {
			Controller: ActivityController,
			Service: ActivityService
		};
	}
}

export default ActivityModule;
