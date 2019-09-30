import { config } from 'dotenv';
import app from './routes/routes';

config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

export default app;
