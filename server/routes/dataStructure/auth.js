import express from 'express';
import auth from '../../controllers/dataStructure/auth';
import validate from '../../middleware/dataStructure/validateAuth';

const router = express.Router();
router.use(express.json());

router.post('/signup', validate.signup, auth.signup);
router.post('/signin', validate.signin, auth.signin);

export default router;
