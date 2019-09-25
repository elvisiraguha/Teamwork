import express from 'express';
import helper from '../helpers/helper';
import usersArray from '../models/usersArray';
import Article from '../helpers/Article';

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
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

  const { body } = req;
  const { value, error } = helper.joiArticleSchema(body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }

  const createdArticle = new Article(value);

  author.addArticle(createdArticle);

  res.status(201).json({
    status: 201,
    message: 'article successfully created',
    data: {
      createdArticle,
    },
  });
});

export default router;
