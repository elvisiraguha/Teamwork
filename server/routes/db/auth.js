import express from 'express';
import auth from '../../controllers/db/auth';
import validate from '../../middleware/db/validateAuth';

const router = express.Router();
router.use(express.json());

router.post(
  '/signup',
  validate.signupSchema,
  validate.isUserExist,
  auth.signup,
);

export default router;
