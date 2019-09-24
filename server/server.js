import express from 'express';
import { config } from 'dotenv';

config();
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/teamwork/v1', (req, res) => {
  res.status(200);
  return res.json({
    message: 'You are welcome to the Teamwork API',
  });
});

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});
