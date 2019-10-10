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
}

export default GetArticles;
