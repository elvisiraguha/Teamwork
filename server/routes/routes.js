import express from 'express';
import authorize from '../middleware/authController';
import auth from '../controllers/auth';
import articles from '../controllers/articles';

const router = express.Router();
router.use(express.json());

router.post('/auth/signup', auth.signup);
router.post('/auth/signin', auth.signin);
router.post('/articles', authorize, articles.create);
router.patch('/articles/:id', authorize, articles.edit);
router.delete('/articles/:id', authorize, articles.delete);
router.post('/articles/:id/comments', authorize, articles.addComment);
router.get('/feeds', authorize, articles.getAll);
router.get('/articles/:id', authorize, articles.getOne);
router.get('/articles', authorize, articles.findByCategory);

router.get('/', (req, res) => (
  res.status(200).json({
    status: 200,
    message: 'Welcome to Teamwork API',
  })
));

export default router;
