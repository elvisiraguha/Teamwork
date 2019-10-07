import express from 'express';
import authRouter from './auth';
import articlesRouter from './articles';

const router = express.Router();
router.use(express.json());

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/', articlesRouter);

router.use('/*', (req, res) => (
  res.status(405).json({
    status: 405,
    error: 'Method not allowed',
  })
));

export default router;
