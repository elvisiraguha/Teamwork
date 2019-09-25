import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import { config } from 'dotenv';

config(0);
const secret = process.env.SECRET || 'themostsecretkey';

const helper = {
  generateToken(id) {
    return jwt.sign({ id }, secret, { expiresIn: '2d' });
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  },

  joiSignupSchema(body) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      gender: Joi.string().required(),
      jobRole: Joi.string().required(),
      department: Joi.string().required(),
      address: Joi.string().required(),
    });
    return schema.validate(body);
  },

  joiSigninSchema(body) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(body);
  },
};

export default helper;
