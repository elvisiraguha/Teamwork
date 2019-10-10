import Joi from '@hapi/joi';
import responseHandler from '../helpers/responses';

class Validate {
  static signup(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().trim().required().regex(/^[a-zA-Z]{3,}$/),
      lastName: Joi.string().trim().required().regex(/^[a-zA-Z]{3,}$/),
      email: Joi
        .string()
        .trim()
        .required()
        .min(5)
        .max(50),
      password: Joi.string().required(),
      gender: Joi
        .string()
        .trim()
        .valid('male', 'Male', 'M', 'female', 'Female', 'F')
        .required(),
      jobRole: Joi
        .string()
        .trim()
        .regex(/^[a-zA-Z]{5,}$/)
        .required(),
      department: Joi
        .string()
        .trim()
        .valid('Development', 'Design', 'Production', 'Management', 'Human resource')
        .required(),
      address: Joi
        .string()
        .trim()
        .required()
        .regex(/^[a-zA-Z]{5,}$/),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return responseHandler.error(res, 400, errorMessage);
    }
    req.newUser = value;
    next();
  }

  static signin(req, res, next) {
    const schema = Joi.object({
      email: Joi
        .string()
        .required()
        .trim()
        .min(5)
        .max(50),
      password: Joi.string().required(),
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
