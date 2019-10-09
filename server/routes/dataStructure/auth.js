import express from 'express';
import auth from '../../controllers/dataStructure/auth';
import validate from '../../middleware/dataStructure/validateAuth';
import validateSchema from '../../middleware/validateAuthSchema';

const router = express.Router();
router.use(express.json());

router.post(
  '/signup',
  validateSchema.signup,
  validate.isUserExist,
  auth.signup,
);
router.post(
  '/signin',
  validateSchema.signin,
  validate.isAUser,
  auth.signin,
);

export default router;
