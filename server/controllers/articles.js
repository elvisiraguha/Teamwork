import Article from '../helpers/Article';
import articlesArray from '../models/articlesArray';
import Comment from '../helpers/Comment';

class Articles {
  static create(req, res) {
    const { newArticle, author } = req;

    const createdArticle = new Article(newArticle, author);

    articlesArray.addArticle(createdArticle);

    res.status(201).json({
      status: 201,
      message: 'article successfully created',
      data: {
        info: createdArticle,
      },
    });
  }

  static delete(req, res) {
    const { matchArticle } = req;

    articlesArray.removeArticle(matchArticle);

    return res.status(204).json({
      status: 204,
      message: 'article successfully deleted',
    });
  }

  static edit(req, res) {
    const { matchArticle, body } = req;

    matchArticle.title = body.title || matchArticle.title;
    matchArticle.article = body.article || matchArticle.article;

    res.status(200).json({
      status: 200,
      message: 'article successfully edited',
      data: matchArticle,
    });
  }

  static addComment(req, res) {
    const { comment, author, matchArticle } = req;

    const createdComment = new Comment(comment, matchArticle, author);
    matchArticle.comments.push(createdComment);

    res.status(201).json({
      status: 201,
      message: 'comment successfully added',
      data: {
        comment: createdComment,
        articleTitle: matchArticle.title,
        article: matchArticle.article,
      },
    });
  }

  static getAll(req, res) {
    const fetchedArticles = articlesArray.getLatest();

    res.status(200).json({
      status: 200,
      message: 'success',
      data: fetchedArticles,
    });
  }

  static getOne(req, res) {
    const { matchArticle } = req;

    res.status(200).json({
      status: 200,
      message: 'success',
      data: matchArticle,
    });
  }

  static findByCategory(req, res) {
    const { category } = req;

    const fetchedArticles = articlesArray.findByCategory(category);

    if (!fetchedArticles) {
      return res.status(404).json({
        status: 404,
        error: 'No article belongs to the category provided',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'success',
      data: fetchedArticles,
    });
  }

  static myArticles(req, res) {
    const { myArticles } = req;

    res.status(200).json({
      status: 200,
      message: 'success',
      data: myArticles,
    });
  }
}

export default Articles;
