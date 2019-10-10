import responseHandler from '../../helpers/responses';
import entities from '../../helpers/db/entities';
import connect from '../../models/db/connectToDB';

class Articles {
  static async create(req, res) {
    const createdArticle = entities.article(req.newArticle, req.author);

    try {
      const article = await connect.insertArticles(createdArticle);
      return responseHandler.success(res, 201, 'article successfully created', article);
    } catch (error) {
      return responseHandler.error(res, 400, error.message, { error });
    }
  }

  static async edit(req, res) {
    const { matchArticle, body } = req;

    const newTitle = body.title || matchArticle.title;
    const newArticle = body.article || matchArticle.article;

    try {
      const updatedArticle = await connect.updateArticle([matchArticle.id, newTitle, newArticle]);
      return responseHandler.success(res, 200, 'article successfully edited', updatedArticle);
    } catch (error) {
      return responseHandler.error(res, error.status, error.message);
    }
  }
}

export default Articles;
