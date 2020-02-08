import express from 'express';
import authDBRouter from './db/auth';
import articlesDBRouter from './db/articles';
import responseHandler from '../helpers/responses';
import authorize from '../middleware/db/authController';

const router = express.Router();
router.use(express.json());

router.use('/', authorize.isValidRequest);
router.use('/api/v2/auth', authDBRouter);
router.use('/api/v2', articlesDBRouter);

router.use('/*', (req, res) => responseHandler.error(res, 405, 'Method not allowed'));

export default router;
