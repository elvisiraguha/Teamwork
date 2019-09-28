import express from 'express';
import helper from '../helpers/helper';
import Comment from '../helpers/Comment';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.post('/:id/comments/', (req, res) => {
  const { body, author } = req;
  const { id } = req.params;

  const { comment, error } = helper.joiCommentSchema(body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }

  const matchArticle = articlesArray.getArticleById(id);

  if (!matchArticle) {
    return res.status(404).json({
      status: 404,
      error: 'Article with given id does not exists',
    });
  }

  const createdComment = new Comment(comment, matchArticle, author);

  res.status(201).json({
    status: 201,
    message: 'comment successfully added',
    data: createdComment,
  });
});

export default router;
