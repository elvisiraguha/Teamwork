import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import moment from 'moment';
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

  joiArticleSchema(content) {
    const schema = Joi.object({
      title: Joi.string().required().min(10).max(50),
      article: Joi.string().required().min(20).max(1000),
    });

    return schema.validate(content);
  },

  joiCommentSchema(comment) {
    const schema = Joi.object({
      comment: Joi.string().required().min(10).max(1000),
    });

    return schema.validate(comment);
  },

  getDate() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  },

};

export default helper;
