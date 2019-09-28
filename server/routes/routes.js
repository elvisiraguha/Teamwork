import express from 'express';
import authorize from '../middleware/authController';
import signup from '../controllers/signup';
import signin from '../controllers/signin';
import createArticle from '../controllers/createArticle';
import editArticle from '../controllers/editArticle';
import deleteArticle from '../controllers/deleteArticle';
import addComment from '../controllers/addComment';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/signin', signin);
app.use('/api/v1/articles', authorize, createArticle);
app.use('/api/v1/articles', authorize, editArticle);
app.use('/api/v1/articles', authorize, deleteArticle);
app.use('/api/v1/articles', authorize, addComment);

export default app;
