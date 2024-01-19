import { Router } from 'express';
import { apiRouter } from './api.js';
import { viewRouter } from './view.js';

const router = Router();

router.use('/', viewRouter);
router.use('/api', apiRouter);

export { router };
