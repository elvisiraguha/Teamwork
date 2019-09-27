import express from 'express';
import usersArray from '../models/usersArray';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.delete('/:id', (req, res) => {
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
    return res.status(404);
  }

  articlesArray.removeArticle(matchArticle);

  res.status(204);
});

export default router;
