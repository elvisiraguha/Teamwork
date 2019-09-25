import { config } from 'dotenv';
import app from './routes/routes';

config();
const port = process.env.PORT || 3000;

import users from './models/usersArray';
app.get('/api/v1/all', (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});


export default app;
