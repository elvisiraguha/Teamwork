import express from 'express';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const fetchedArticles = articlesArray.getArticleById(id);

  if (!fetchedArticles) {
    return res.status(404).json({
      status: 404,
      error: 'Article with given id does not exists',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'success',
    data: fetchedArticles,
  });
});
export default router;
