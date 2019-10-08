import connect from '../../models/db/connectToDB';
import helper from '../../helpers/helper';
import responseHandler from '../../helpers/responses';

class Auth {
  static async signup(req, res) {
    const {
      firstName,
      lastName,
      email,
      gender,
      jobRole,
      address,
      department,
    } = req.newUser;

    const password = helper.hashPassword(req.newUser.password);
    const isAdmin = false;
    const dbQuery = {
      text: 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, address, department, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      values: [
        firstName,
        lastName,
        email,
        password,
        gender,
        jobRole,
        address,
        department,
        isAdmin,
      ],
    };

    try {
      const { id } = await connect.connectToDB(dbQuery);
      const token = helper.generateToken({ id, email, isAdmin });
      return responseHandler.success(res, 201, 'User created successfully', { token });
    } catch (error) {
      return responseHandler.error(res, 400, error.message, { error });
    }
  }
}

export default Auth;
