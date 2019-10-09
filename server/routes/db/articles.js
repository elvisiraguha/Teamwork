import express from 'express';
import authorize from '../../middleware/authController';
import articles from '../../controllers/db/articles';
import validate from '../../middleware/validateArticles';

const router = express.Router();

router.post('/articles',
  authorize.haveCorrectToken,
  validate.newArticle,
  articles.create,
);

export default router;
