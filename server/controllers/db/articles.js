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
}

export default Articles;
