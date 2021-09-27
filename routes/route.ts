import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World');
});

const routing = (req: Request, res: Response) => {
	res.send(req.params.id);
};

router.get('/test/:id', routing);

export default router;
