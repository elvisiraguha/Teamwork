import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import usersArray from '../../models/dataStructure/usersArray';
import responseHandler from '../../helpers/responses';

config();

class Authorize {
  static isValidRequest(err, req, res, next) {
    if (err) {
      return responseHandler.error(res, err.status, err.message);
    }
    next();
  }

  static haveCorrectToken(req, res, next) {
    const { 'x-access-token': token } = req.headers;

    if (!token) {
      return responseHandler.error(res, 401, 'Unauthorized: You need to have a token');
    }

    try {
      const { id } = jwt.verify(token, process.env.SECRET);
      req.author = usersArray.findUser('id', id);

      if (!req.author) {
        return responseHandler.error(res, 400, 'user with given token is not found');
      }

      next();
    } catch (err) {
      return responseHandler.error(res, 400, err.message);
    }
  }
}

export default Authorize;
