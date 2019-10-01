import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import usersArray from '../models/usersArray';

config(0);

const authorize = (req, res, next) => {
  const { 'x-access-token': token } = req.headers;

  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized: You need to have a token',
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.author = usersArray.findUser('id', id);
    next();
  } catch (err) {
    return res.status(400).json({
      status: 400,
      error: err.message,
    });
  }
};

export default authorize;
