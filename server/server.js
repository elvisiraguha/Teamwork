import { config } from 'dotenv';
import app from './routes/routes';

config();
const port = process.env.PORT || 3000;

app.use('*', (req, res) => (
  res.status(405).json({
    status: 405,
    message: 'Method not allowed',
  })
));

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

export default app;
