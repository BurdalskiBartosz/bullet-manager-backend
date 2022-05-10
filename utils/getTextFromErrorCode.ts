import { tErrorsCode } from '../types/errors';
import errorsCode from './errorsCode.json';

export const getTextFromErrorCode = (code: tErrorsCode) => {
	if (errorsCode[code]) {
		return errorsCode[code];
	}
	return code;
};
