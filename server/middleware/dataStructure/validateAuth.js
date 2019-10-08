import Joi from '@hapi/joi';
import usersArray from '../../models/dataStructure/usersArray';
import responseHandler from '../../helpers/responses';

class Validate {
  static signup(req, res, next) {
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

    const matchUser = usersArray.findUser('email', value.email);

    if (matchUser) {
      return responseHandler.error(res, 409, 'User with given email already exists');
    }
    req.newUser = value;
    next();
  }

  static signin(req, res, next) {
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
}

export default Validate;
