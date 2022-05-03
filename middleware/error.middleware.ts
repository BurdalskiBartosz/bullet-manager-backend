import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	const status = error.httpCode || 500;
	const message = error.message || 'Something went wrong';
	console.log('errorMiddleware');
	response.status(status).send({
		message,
		status
	});
}

export default errorMiddleware;
