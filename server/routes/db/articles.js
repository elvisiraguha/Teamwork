import express from 'express';
import authorize from '../../middleware/db/authController';
import articles from '../../controllers/db/articles';
import validate from '../../middleware/validateArticles';
import getArticle from '../../middleware/db/getArticles';

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
  getArticle.isAuthor,
  validate.editArticle,
  articles.edit,
);
router.delete(
  '/articles/:id',
  authorize.haveCorrectToken,
  getArticle.getOne,
  getArticle.isAuthor,
  articles.delete,
);


export default router;
