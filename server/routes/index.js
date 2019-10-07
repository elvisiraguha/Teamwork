import express from 'express';
import authorize from '../middleware/authController';
import authRouter from './auth';
import articlesRouter from './articles';

const router = express.Router();
router.use(express.json());

router.use('/auth', authRouter);
router.use('/', authorize, articlesRouter);

router.get('/', (req, res) => (
  res.status(200).json({
    status: 200,
    message: 'Welcome to Teamwork API',
  })
));

router.use('/*', (req, res) => (
  res.status(405).json({
    status: 405,
    error: 'Method not allowed',
  })
));

export default router;
