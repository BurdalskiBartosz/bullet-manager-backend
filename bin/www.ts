#!/usr/bin/env node
import 'reflect-metadata';
import { Application } from 'express';
import http, { Server } from 'http';
import App from '../app';
import dotenv from 'dotenv';

dotenv.config();
// const debug = require('debug')('backend:server');

const application = new App();
const app = application.app;

class WWWWServer {
	private app;
	private server: Server;
	private port: number;

	constructor(app: Application) {
		this.app = app;
		this.server = http.createServer(this.app);
		this.port = this.normalizePort(process.env.PORT || '3001');

		this.initServer();
		this.app.set('port', this.port);
		this.server.listen(this.port);
		this.addListenersToServer();
	}

	private initServer() {
		this.server = http.createServer(this.app);
	}

	private addListenersToServer() {
		this.server.on('error', () => this.onError.bind(this));
		this.server.on('listening', () => this.onListening.bind(this));
	}

	private onListening() {
		console.log('onListening');
		try {
			console.log(`Connected successfully on port ${this.port}`);
		} catch (error: any) {
			console.error(`Error occured: ${error.message}`);
		}
	}

	private onError(error: any) {
		if (error.syscall !== 'listen') {
			throw error;
		}
		const bind = typeof this.port === 'string' ? `pipe ${this.port}` : `Port ${this.port}`;

		switch (error.code) {
			case 'EACCES':
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	}

	private normalizePort(val: any) {
		const port = parseInt(val, 10);
		if (Number.isNaN(port)) {
			return val;
		}
		if (port >= 0) {
			return port;
		}
		return false;
	}
}
new WWWWServer(app);
