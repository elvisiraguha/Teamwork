import express from 'express';
import authorize from '../middleware/authController';
import articles from '../controllers/articles';

const router = express.Router();

router.post('/articles', authorize, articles.create);
router.patch('/articles/:id', authorize, articles.edit);
router.delete('/articles/:id', authorize, articles.delete);
router.post('/articles/:id/comments', authorize, articles.addComment);
router.get('/feeds', authorize, articles.getAll);
router.get('/articles/:id', authorize, articles.getOne);
router.get('/articles', authorize, articles.findByCategory);

export default router;
