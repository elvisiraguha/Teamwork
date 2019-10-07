import Joi from '@hapi/joi';
import usersArray from '../models/usersArray';

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
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }

    const matchUser = usersArray.findUser('email', value.email);

    if (matchUser) {
      return res.status(409).json({
        status: 409,
        error: 'User with given email already exists',
      });
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
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }
    req.user = value;
    next();
  }
}

export default Validate;
