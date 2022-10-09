import { iController, iCRUDController } from '../controller/shared';
import { iService } from '../service';

export interface Module {
	init(): iController | iCRUDController;
}
