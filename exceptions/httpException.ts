export type HttpCode = 404 | 400 | 500;
export class HttpException extends Error {
	public readonly name: string;
	public readonly httpCode: HttpCode;
	public readonly code?: string;

	constructor(name: string, httpCode: HttpCode, description: string) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.httpCode = httpCode;
		Error.captureStackTrace(this);
	}
}
export default HttpException;
