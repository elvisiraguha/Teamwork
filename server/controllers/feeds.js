import express from 'express';
import articlesArray from '../models/articlesArray';

const router = express.Router();

router.get('/', (req, res) => {
  const fetchedArticles = articlesArray.getLatest();

  res.status(200).json({
    status: 200,
    message: 'success',
    data: fetchedArticles,
  });
});
export default router;
