import Joi from '@hapi/joi';
import responseHandler from '../../helpers/responses';
import connectToDB from '../../models/db/connectToDB';

class Validate {
  static signupSchema(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().required().min(3).trim(),
      lastName: Joi.string().required().min(3).trim(),
      email: Joi.string().required().min(10).trim(),
      password: Joi.string().required().min(8).trim(),
      gender: Joi.string().required().min(4).trim(),
      jobRole: Joi.string().required().min(4).trim(),
      department: Joi.string().required().min(4).trim(),
      address: Joi.string().required().min(4).trim(),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return responseHandler.error(res, 400, errorMessage);
    }

    req.newUser = value;
    next();
  }

  static async isUserExist(req, res, next) {
    const matchUser = await connectToDB.select('users', 'email', req.newUser.email);
    if (matchUser) {
      return responseHandler.error(res, 409, 'User with given email already exists');
    }
    next();
  }
}

export default Validate;
