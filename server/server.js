import express from 'express';
import { config } from 'dotenv';
import signup from './routes/routes';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/auth/signup', signup);

app.get('/api/v1', (req, res) => {
  res.status(200);
  return res.json({
    message: 'You are welcome to the Teamwork API',
  });
});

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

export default app;
