import express from 'express';
import articles from '../controllers/articles';

const router = express.Router();

router.post('/articles', articles.create);
router.patch('/articles/:id', articles.edit);
router.delete('/articles/:id', articles.delete);
router.post('/articles/:id/comments', articles.addComment);
router.get('/feeds', articles.getAll);
router.get('/articles/:id', articles.getOne);
router.get('/articles', articles.findByCategory);

export default router;
