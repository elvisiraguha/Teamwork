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

    if (req.params.id) {
      if (Number.isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).json({
          status: 400,
          error: 'articleId should be an Integer',
        });
      }
    }

    if (!req.author) {
      return res.status(400).json({
        status: 400,
        error: 'user with given token is not found',
      });
    }

    next();
  } catch (err) {
    return res.status(400).json({
      status: 400,
      error: err.message,
    });
  }
};

export default authorize;
