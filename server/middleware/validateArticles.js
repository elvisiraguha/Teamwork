import Joi from '@hapi/joi';
import responseHandler from '../helpers/responses';

class Validate {
  static newArticle(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().required().min(10).max(50),
      article: Joi.string().required().min(20).max(1000),
      categories: Joi.array().items(Joi.string()).required(),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return responseHandler.error(res, 400, errorMessage);
    }

    req.newArticle = value;
    next();
  }

  static editArticle(req, res, next) {
    const { body } = req;
    if (!body.title && !body.article) {
      return responseHandler.error(res, 400, 'You must provide updted article or title');
    }
    next();
  }

  static comment(req, res, next) {
    const schema = Joi.object({
      comment: Joi.string().required().min(5).max(1000),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return responseHandler.error(res, 400, errorMessage);
    }
    req.comment = value;
    next();
  }
}

export default Validate;
