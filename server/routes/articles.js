import express from 'express';
import authorize from '../middleware/authController';
import articles from '../controllers/articles';
import validate from '../middleware/validateArticles';
import getArticle from '../middleware/getArticles';

const router = express.Router();

router.post('/articles',
  authorize.haveCorrectToken,
  validate.newArticle,
  articles.create,
);
router.patch(
  '/articles/:id',
  authorize.haveCorrectToken,
  getArticle.getOne,
  authorize.isAuthor,
  validate.editArticle,
  articles.edit,
);
router.delete(
  '/articles/:id',
  authorize.haveCorrectToken,
  getArticle.getOne,
  authorize.isAuthor,
  articles.delete,
);
router.post(
  '/articles/:id/comments',
  authorize.haveCorrectToken,
  validate.comment,
  getArticle.getOne,
  articles.addComment,
);
router.get(
  '/feeds',
  authorize.haveCorrectToken,
  articles.getAll,
);
router.get(
  '/articles/:id',
  authorize.haveCorrectToken,
  getArticle.getOne,
  articles.getOne,
);
router.get(
  '/articles',
  authorize.haveCorrectToken,
  getArticle.getByCategory,
  articles.findByCategory,
);
router.get(
  '/myarticles',
  authorize.haveCorrectToken,
  getArticle.myArticles,
  articles.myArticles,
);

export default router;
