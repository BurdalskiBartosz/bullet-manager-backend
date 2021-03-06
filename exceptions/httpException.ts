export type HttpCode = 400 | 401 | 404 | 500;
export class HttpException extends Error {
	public readonly httpCode: HttpCode;
	public readonly code?: string;

	constructor(httpCode: HttpCode, meesage: string) {
		super(meesage);
		Object.setPrototypeOf(this, new.target.prototype);

		this.httpCode = httpCode;
		Error.captureStackTrace(this);
	}
}
export default HttpException;
