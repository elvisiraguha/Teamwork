import express from 'express';
import authRouter from './auth';
import articlesRouter from './articles';

const router = express.Router();
router.use(express.json());

router.use('/auth', authRouter);
router.use('/', articlesRouter);

router.get('/', (req, res) => (
  res.status(200).json({
    status: 200,
    message: 'Welcome to Teamwork API',
  })
));

export default router;
