import responseHandler from '../../helpers/responses';
import connect from '../../models/db/connectToDB';

class Validate {
  static async isUserExist(req, res, next) {
    const matchUser = await connect.select('users', 'email', req.newUser.email);
    if (matchUser) {
      return responseHandler.error(res, 409, 'User with given email already exists');
    }
    next();
  }

  static async isAUser(req, res, next) {
    const matchUser = await connect.select('users', 'email', req.user.email);
    if (!matchUser) {
      return responseHandler.error(res, 404, 'User with given email does not exists');
    }
    req.matchUser = matchUser;
    next();
  }
}

export default Validate;
