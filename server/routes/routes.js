import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authorize from '../middleware/authController';
import auth from '../controllers/auth';
import articles from '../controllers/articles';
import swaggerConf from '../../swagger.json';

const app = express();
app.use(express.json());

app.get('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));
app.post('/api/v1/auth/signup', auth.signup);
app.post('/api/v1/auth/signin', auth.signin);
app.post('/api/v1/articles', authorize, articles.create);
app.patch('/api/v1/articles/:id', authorize, articles.edit);
app.delete('/api/v1/articles/:id', authorize, articles.delete);
app.post('/api/v1/articles/:id/comments', authorize, articles.addComment);
app.get('/api/v1/feeds', authorize, articles.getAll);
app.get('/api/v1/articles/:id', authorize, articles.getOne);
app.get('/api/v1/articles', authorize, articles.findByCategory);

app.get('/api/v1/', (req, res) => (
  res.status(200).json({
    status: 200,
    message: 'Welcome to Teamwork API',
  })
));

app.get('/', (req, res) => (
  res.status(200).json({
    status: 200,
    message: 'Welcome to Teamwork API, start a path with /api/v1/ when making requests',
  })
));
app.use('/*', (req, res) => (
  res.status(405).json({
    status: 405,
    error: 'Method not allowed',
  })
));

export default app;
