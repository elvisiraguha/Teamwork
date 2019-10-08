import Article from '../../helpers/dataStructure/Article';
import articlesArray from '../../models/dataStructure/articlesArray';
import Comment from '../../helpers/dataStructure/Comment';
import responseHandler from '../../helpers/responses';

class Articles {
  static create(req, res) {
    const { newArticle, author } = req;

    const createdArticle = new Article(newArticle, author);

    articlesArray.addArticle(createdArticle);

    return responseHandler.success(res, 201, 'article successfully created', createdArticle);
  }

  static delete(req, res) {
    const { matchArticle } = req;

    articlesArray.removeArticle(matchArticle);

    return responseHandler.success(res, 204, 'article successfully deleted');
  }

  static edit(req, res) {
    const { matchArticle, body } = req;

    matchArticle.title = body.title || matchArticle.title;
    matchArticle.article = body.article || matchArticle.article;

    return responseHandler.success(res, 200, 'article successfully edited', matchArticle);
  }

  static addComment(req, res) {
    const { comment, author, matchArticle } = req;

    const createdComment = new Comment(comment, matchArticle, author);
    matchArticle.comments.push(createdComment);

    return responseHandler.success(res, 201, 'comment successfully added', {
      comment: createdComment,
      articleTitle: matchArticle.title,
      article: matchArticle.article,
    });
  }

  static getAll(req, res) {
    const fetchedArticles = articlesArray.getLatest();

    return responseHandler.success(res, 200, 'success', fetchedArticles);
  }

  static getOne(req, res) {
    const { matchArticle } = req;

    return responseHandler.success(res, 200, 'success', matchArticle);
  }

  static findByCategory(req, res) {
    const { category } = req;

    const fetchedArticles = articlesArray.findByCategory(category);

    if (!fetchedArticles) {
      return responseHandler.error(res, 404, 'No article belongs to the category provided');
    }

    return responseHandler.success(res, 200, 'success', fetchedArticles);
  }

  static myArticles(req, res) {
    const { myArticles } = req;
    return responseHandler.success(res, 200, 'success', myArticles);
  }
}

export default Articles;
