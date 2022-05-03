// class HttpException extends Error {
// 	public status: number;
// 	public message: string;
// 	constructor(status: number, message: string) {
// 		super(message);
// 		console.log('HTTP Exceptios');
// 		this.status = status;
// 		this.message = message;
// 	}
// }

export type HttpCode = 404 | 400 | 500;
export class HttpException extends Error {
	public readonly name: string;
	public readonly httpCode: HttpCode;

	constructor(name: string, httpCode: HttpCode, description: string) {
		super(description);

		Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

		this.name = name;
		this.httpCode = httpCode;
		Error.captureStackTrace(this);
	}
}
export default HttpException;
