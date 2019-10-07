import express from 'express';
import authRouter from './auth';
import articlesRouter from './articles';
import responseHandler from '../helpers/responses';

const router = express.Router();
router.use(express.json());

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/', articlesRouter);

router.use('/*', (req, res) => responseHandler.error(res, 405, 'Method not allowed'));

export default router;
