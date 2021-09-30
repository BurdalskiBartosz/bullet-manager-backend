import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

const router = express.Router();

router.get('/', (req, res, next) => {
	next(createError(404, '404 nie znaleziono'));
});

const routing = (req: Request, res: Response, next: NextFunction) => {
	res.send(req.params.id);
};

router.get('/test/:id', routing);

export default router;
