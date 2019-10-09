import helper from '../../helpers/helper';
import User from '../../helpers/dataStructure/User';
import usersArray from '../../models/dataStructure/usersArray';
import responseHandler from '../../helpers/responses';

class Auth {
  static signup(req, res) {
    const createdUser = new User(req.newUser);
    usersArray.addUser(createdUser);

    const token = helper.generateToken(createdUser);

    return responseHandler.success(res, 201, 'User created successfully', { token });
  }

  static signin(req, res) {
    const { matchUser, user } = req;
    const isValidPassword = helper.comparePassword(user.password, matchUser.password);

    if (!isValidPassword) {
      return responseHandler.error(res, 401, 'Given password is incorrect');
    }

    const token = helper.generateToken(matchUser);

    return responseHandler.success(res, 200, 'User is successfully logged in', { token });
  }
}

export default Auth;
