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

  static async delete(req, res) {
    const { matchArticle } = req;

    try {
      const deletedArticle = await connect.delete([matchArticle.id]);
      return responseHandler.success(res, 204, 'article successfully deleted', deletedArticle);
    } catch (error) {
      return responseHandler.error(res, error.status, error.message);
    }
  }

  static async feeds(req, res) {
    try {
      const articles = await connect.selectArticles();
      const sortedArticles = articles.sort((oldest, latest) => oldest.createdon - latest.createdon);

      return responseHandler.success(res, 200, 'articles successfully loaded', sortedArticles);
    } catch (error) {
      return responseHandler.error(res, error.status, error.message);
    }
  }

  static async getOne(req, res) {
    const { matchArticle } = req;
    return responseHandler.success(res, 200, 'article successfully fetched', matchArticle);
  }

  static async myarticles(req, res) {
    const { id } = req.author;
    try {
      const articles = await connect.selectWhole('articles', 'authorid', id);

      return responseHandler.success(res, 200, 'articles successfully loaded', articles);
    } catch (error) {
      return responseHandler.error(res, error.status, error.message);
    }
  }

  static async comment(req, res) {
    const { matchArticle, author, comment } = req;
    const newComment = entities.comment(comment, matchArticle, author);
    try {
      const storedComment = await connect.insertComment(newComment);

      return responseHandler.success(res, 200, 'comment successfully added', storedComment);
    } catch (error) {
      return responseHandler.error(res, error.status, error.message);
    }
  }
}

export default Articles;
