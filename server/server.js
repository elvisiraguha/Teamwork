import express from 'express';
import { config } from 'dotenv';
import router from './routes/routes';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use('/api/v1', router);

app.use('/*', (req, res) => (
  res.status(405).json({
    status: 405,
    error: 'Method not allowed',
  })
));

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

export default app;
