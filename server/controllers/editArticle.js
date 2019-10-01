import express from 'express';
import helper from '../helpers/helper';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.patch('/:id', (req, res) => {
  const { body } = req;
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
      error: 'Forbidden: An article you are trying to edit is not yours',
    });
  }

  const { value, error } = helper.joiArticleSchema(body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }

  matchArticle.title = value.title || matchArticle.title;
  matchArticle.article = value.article || matchArticle.article;

  res.status(200).json({
    status: 200,
    message: 'article successfully edited',
    data: matchArticle,
  });
});

export default router;
