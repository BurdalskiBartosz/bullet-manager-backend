import { tErrorsCode } from '../types';
import errorsCode from './errorsCode.json';

export const getTextFromErrorCode = (code: tErrorsCode) => errorsCode[code];
