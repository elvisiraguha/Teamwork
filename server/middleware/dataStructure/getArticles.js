import articlesArray from '../../models/dataStructure/articlesArray';
import responseHandler from '../../helpers/responses';

class GetArticles {
  static getOne(req, res, next) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return responseHandler.error(res, 400, 'articleId should be an Integer');
    }
    const matchArticle = articlesArray.getArticleById(id);

    if (!matchArticle) {
      return responseHandler.error(res, 404, 'Article with given id does not exists');
    }
    req.matchArticle = matchArticle;
    next();
  }

  static getByCategory(req, res, next) {
    const { category } = req.query;

    if (!category) {
      return responseHandler.error(res, 400, 'Provide a category in query please!');
    }
    req.category = category;
    next();
  }

  static myArticles(req, res, next) {
    const { author } = req;
    const authorsArticles = articlesArray.getArticles('authorId', author.id);

    if (!authorsArticles) {
      return responseHandler.error(res, 404, 'You have not created any articles Yet');
    }
    req.myArticles = authorsArticles;
    next();
  }

  static isAuthor(req, res, next) {
    const isAuthor = articlesArray.checkAuthor(req.matchArticle, req.author);

    if (!isAuthor) {
      return responseHandler.error(res, 403, 'Forbidden: You are not owner of given article');
    }
    next();
  }
}

export default GetArticles;
