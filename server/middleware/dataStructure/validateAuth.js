import usersArray from '../../models/dataStructure/usersArray';
import responseHandler from '../../helpers/responses';

class ValidateAuth {
  static isUserExist(req, res, next) {
    const matchUser = usersArray.findUser('email', req.newUser.email);

    if (matchUser) {
      return responseHandler.error(res, 409, 'User with given email already exists');
    }

    next();
  }

  static isAUser(req, res, next) {
    const matchUser = usersArray.findUser('email', req.user.email);

    if (!matchUser) {
      return responseHandler.error(res, 404, 'User with given email does not exists');
    }
    req.matchUser = matchUser;
    next();
  }
}

export default ValidateAuth;
