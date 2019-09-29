import express from 'express';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.delete('/:id', (req, res) => {
  const { author } = req;
  const id = parseInt(req.params.id, 10);

  const authorsArticles = articlesArray.getArticles('authorId', author.id);

  if (!authorsArticles) {
    return res.status(404).json({
      status: 404,
      error: `Dear ${author.lastName} you have not created any articles yet!`,
    });
  }

  const matchArticle = articlesArray.getArticleById(id);

  if (!matchArticle) {
    return res.status(404).json({
      status: 404,
      error: 'Article with given id does not exists',
    });
  }

  const isAuthor = articlesArray.checkAuthor(matchArticle, author);

  if (!isAuthor) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: An article you are trying to delete is not yours',
    });
  }

  articlesArray.removeArticle(matchArticle);

  return res.status(204).json({
    status: 204,
    message: 'article successfully deleted',
  });
});

export default router;
