import express from 'express';
import { config } from 'dotenv';
import router from './routes/index';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

export default app;
