import Joi from '@hapi/joi';
import responseHandler from '../../helpers/responses';
import connect from '../../models/db/connectToDB';

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

  static signinSchema(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().required().min(10).trim(),
      password: Joi.string().required().trim(),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return responseHandler.error(res, 400, errorMessage);
    }
    req.user = value;
    next();
  }

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
