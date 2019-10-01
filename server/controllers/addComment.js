import express from 'express';
import helper from '../helpers/helper';
import Comment from '../helpers/Comment';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.post('/:id/comments/', (req, res) => {
  const { body, author } = req;
  const id = parseInt(req.params.id, 10);

  const { value, error } = helper.joiCommentSchema(body);

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
  const createdComment = new Comment(value, matchArticle, author);
  matchArticle.comments.push(createdComment);

  res.status(201).json({
    status: 201,
    message: 'comment successfully added',
    data: {
      comment: createdComment,
      articleTitle: matchArticle.title,
      article: matchArticle.article,
    },
  });
});

export default router;
