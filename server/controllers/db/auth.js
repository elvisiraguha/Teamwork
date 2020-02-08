import helper from '../../helpers/helper';
import responseHandler from '../../helpers/responses';
import connect from '../../models/db/connectToDB';
import entities from '../../helpers/db/entities';

class Auth {
  static async signup(req, res) {
    const newUser = entities.user(req.newUser);
    try {
      const { id, email, isadmin: isAdmin } = await connect.insertUser(newUser);
      const token = helper.generateToken({ id, email, isAdmin });

      return responseHandler.success(res, 201, 'User created successfully', { token });
    } catch (error) {
      return responseHandler.error(res, 400, error.message, { error });
    }
  }

  static signin(req, res) {
    const { user, matchUser } = req;

    const isValidPassword = helper.comparePassword(user.password, matchUser.password);

    if (!isValidPassword) {
      return responseHandler.error(res, 401, 'Given password is incorrect');
    }

    const token = helper.generateToken(matchUser);

    return responseHandler.success(res, 200, 'User is successfully logged in', { token });
  }
}

export default Auth;
