import responseHandler from '../../helpers/responses';
import connect from '../../models/db/connectToDB';

class GetArticles {
  static async getOne(req, res, next) {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return responseHandler.error(res, 400, 'articleId should be an Integer');
    }

    const matchArticle = await connect.select('articles', 'id', id);

    if (!matchArticle) {
      return responseHandler.error(res, 404, 'Article with given id does not exists');
    }
    req.matchArticle = matchArticle;
    next();
  }

  static isAuthor(req, res, next) {
    const isAuthor = (req.matchArticle.authorid === req.author.id);
    if (!isAuthor) {
      return responseHandler.error(res, 403, 'Forbidden: You are not owner of given article');
    }
    next();
  }

  static async isAlreadyCreated(req, res, next) {
    const { author, newArticle } = req;
    try {
      const articles = await connect.selectWhole('articles', 'authorid', author.id);
      const isThere = articles.find(article => article.title === newArticle.title);
      if (isThere) {
        return responseHandler.error(res, 409, 'Article is already created');
      }
      next();
    } catch (error) {
      return responseHandler.error(res, error.status, error.message);
    }
  }
}

export default GetArticles;
