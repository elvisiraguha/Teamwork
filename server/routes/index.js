import express from 'express';
import authRouter from './dataStructure/auth';
import authDBRouter from './db/auth';
import articlesRouter from './dataStructure/articles';
import articlesDBRouter from './db/articles';
import responseHandler from '../helpers/responses';

const router = express.Router();
router.use(express.json());

router.use('/api/v1/auth', authRouter);
router.use('/api/v1', articlesRouter);
router.use('/api/v2/auth', authDBRouter);
router.use('/api/v2', articlesDBRouter);

router.use('/*', (req, res) => responseHandler.error(res, 405, 'Method not allowed'));

export default router;
