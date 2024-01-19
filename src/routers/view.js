import { Router } from 'express';

const viewRouter = Router();

viewRouter.get('/', (req, res) => {
  return res.render('home');
});

export { viewRouter };
