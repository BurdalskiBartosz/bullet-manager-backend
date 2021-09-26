#!/usr/bin/env node

/**
 * Module dependencies.
 */

const http = require('http');
const debug = require('debug')('backend:server');
const app = require('../app.ts');

/**
 * Get port from environment and store in Express.
 */

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
	const port = parseInt(val, 10);

	if (Number.isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);

function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`Listening on ${bind}`);
	console.log('onListening');
	try {
		console.log(`Connected successfully on port ${port}`);
	} catch (error: any) {
		console.error(`Error occured: ${error.message}`);
	}
}

server.on('error', onError);
server.on('listening', onListening);
