import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import usersArray from '../models/usersArray';
import articlesArray from '../models/articlesArray';
import responseHandler from '../helpers/responses';

config(0);

class Authorize {
  static haveCorrectToken(req, res, next) {
    const { 'x-access-token': token } = req.headers;

    if (!token) {
      return responseHandler.error(res, 401, 'Unauthorized: You need to have a token');
    }

    try {
      const { id } = jwt.verify(token, process.env.SECRET);
      req.author = usersArray.findUser('id', id);

      if (req.params.id) {
        if (Number.isNaN(parseInt(req.params.id, 10))) {
          return responseHandler.error(res, 400, 'articleId should be an Integer');
        }
      }

      if (!req.author) {
        return responseHandler.error(res, 400, 'user with given token is not found');
      }

      next();
    } catch (err) {
      return responseHandler.error(res, 400, err.message);
    }
  }

  static isAuthor(req, res, next) {
    const isAuthor = articlesArray.checkAuthor(req.matchArticle, req.author);

    if (!isAuthor) {
      return responseHandler.error(res, 403, 'Forbidden: You are not owner of given article');
    }
    next();
  }
}

export default Authorize;
