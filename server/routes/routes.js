import express from 'express';
import signup from '../controllers/signup';
import signin from '../controllers/signin';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/signin', signin);

export default app;
