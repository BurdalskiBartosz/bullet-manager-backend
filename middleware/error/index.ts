import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/httpException';
import { tErrorsCode } from '../../types/errors';
import { getTextFromErrorCode } from '../../utils/getTextFromErrorCode';

export default (error: HttpException, request: Request, response: Response, next: NextFunction) => {
	const status = error.httpCode || 500;
	let message = error.message || 'Something went wrong';
	const code = error.code;
	if (code) message = getTextFromErrorCode(error.code as tErrorsCode);
	response.status(status).send({
		message,
		status
	});
};
