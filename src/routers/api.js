import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/hello', (req, res) => {
  // DO something

  return res.json({ data: 'Hello' });
});

export { apiRouter };
