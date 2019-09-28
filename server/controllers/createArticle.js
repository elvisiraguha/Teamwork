import express from 'express';
import helper from '../helpers/helper';
import Article from '../helpers/Article';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.post('/', (req, res) => {
  const { author } = req;
  const { body } = req;

  const { value, error } = helper.joiArticleSchema(body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }

  const createdArticle = new Article(value, author);

  articlesArray.addArticle(createdArticle);

  res.status(201).json({
    status: 201,
    message: 'article successfully created',
    data: {
      id: createdArticle.id,
      title: createdArticle.title,
      createdOn: createdArticle.createdOn,
    },
  });
});

export default router;
