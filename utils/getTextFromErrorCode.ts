import { tErrorsCode } from '../types/errors';
import errorsCode from './errorsCode.json';

export const getTextFromErrorCode = (code: tErrorsCode, message: string) => {
	const splitErrorMessage = message.split('`');
	const lastSentence = splitErrorMessage[splitErrorMessage.length - 2];
	const errorBy = lastSentence.split('_')[1];
	const errorKey = `${code}-${errorBy}` as tErrorsCode;
	if (errorsCode[errorKey]) {
		return errorsCode[errorKey];
	}
	return code;
};
