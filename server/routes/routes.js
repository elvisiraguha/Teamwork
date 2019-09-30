import express from 'express';
import authorize from '../middleware/authController';
import signup from '../controllers/signup';
import signin from '../controllers/signin';
import createArticle from '../controllers/createArticle';
import editArticle from '../controllers/editArticle';
import deleteArticle from '../controllers/deleteArticle';
import addComment from '../controllers/addComment';
import feeds from '../controllers/feeds';
import specificArticle from '../controllers/specificArticle';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/signin', signin);
app.use('/api/v1/articles', authorize, createArticle);
app.use('/api/v1/articles', authorize, editArticle);
app.use('/api/v1/articles', authorize, deleteArticle);
app.use('/api/v1/articles', authorize, addComment);
app.use('/api/v1/feeds', authorize, feeds);
app.use('/api/v1/articles', authorize, specificArticle);


app.get('/api/v1/', (req, res) => (
  res.status(200).json({
    status: 200,
    message: 'Welcome to Teamwork API',
  })
));

app.get('/', (req, res) => (
  res.status(200).json({
    status: 200,
    message: 'Welcome to Teamwork API, when making routes, please start with /api/v1/',
  })
));
app.use('/*', (req, res) => (
  res.status(405).json({
    status: 405,
    error: 'Method not allowed',
  })
));

export default app;
