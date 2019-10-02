import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import { config } from 'dotenv';

config(0);

const helper = {
  generateToken({ id }) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '2d' });
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  },

  joiSignupSchema(body) {
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

    return schema.validate(body);
  },

  joiSigninSchema(body) {
    const schema = Joi.object({
      email: Joi.string().required().min(10).trim(),
      password: Joi.string().required().trim(),
    });

    return schema.validate(body);
  },

  joiArticleSchema(content) {
    const schema = Joi.object({
      title: Joi.string().required().min(10).max(50),
      article: Joi.string().required().min(20).max(1000),
    });

    return schema.validate(content);
  },

  joiCommentSchema(comment) {
    const schema = Joi.object({
      comment: Joi.string().required().min(5).max(1000),
    });

    return schema.validate(comment);
  },
};

export default helper;
