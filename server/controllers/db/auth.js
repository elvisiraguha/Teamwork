import helper from '../../helpers/helper';
import responseHandler from '../../helpers/responses';
import connectToDB from '../../models/db/connectToDB';

class Auth {
  static async signup(req, res) {
    const newUser = helper.destructureNewUser(req.newUser);
    try {
      const { id, email, isadmin: isAdmin } = await connectToDB.insertUser(newUser);
      const token = helper.generateToken({ id, email, isAdmin });

      return responseHandler.success(res, 201, 'User created successfully', { token });
    } catch (error) {
      return responseHandler.error(res, 400, error.message, { error });
    }
  }
}

export default Auth;
