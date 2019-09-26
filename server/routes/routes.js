import express from 'express';
import signup from '../controllers/signup';
import signin from '../controllers/signin';
import createArticle from '../controllers/createArticle';
import editArticle from '../controllers/editArticle';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/signin', signin);
app.use('/api/v1/articles', createArticle);
app.use('/api/v1/articles', editArticle);

export default app;
