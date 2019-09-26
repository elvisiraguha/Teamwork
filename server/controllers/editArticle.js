import express from 'express';
import helper from '../helpers/helper';
import usersArray from '../models/usersArray';

const router = express.Router();

router.patch('/:id', (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { token } = req.headers;

  if (!token) {
    return res.status(400).json({
      status: 400,
      error: 'You need to have a token',
    });
  }

  const author = token ? usersArray.findAuthor(token) : null;

  if (!author) {
    return res.status(404).json({
      status: 404,
      error: 'Your token is invalid or have expired',
    });
  }

  if (!author.getArticles()) {
    return res.status(404).json({
      status: 404,
      error: `Dear ${author.lastName} you have not created any articles yet!`,
    });
  }

  const matchArticle = author.getArticleById(id);

  if (!matchArticle) {
    return res.status(404).json({
      status: 404,
      error: 'Article with given id does not exists',
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
  matchArticle.title = value.body || matchArticle.body;

  return res.status(200).json({
    status: 200,
    message: 'article successfully edited',
    data: matchArticle,
  });
});

export default router;
