import helper from '../helpers/helper';
import Article from '../helpers/Article';
import articlesArray from '../models/articlesArray';
import Comment from '../helpers/Comment';

const articles = {
  create(req, res) {
    const { author } = req;
    const { body } = req;
    const { value, error } = helper.joiArticleSchema(body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }

    const createdArticle = new Article(value, author);

    articlesArray.addArticle(createdArticle);

    res.status(201).json({
      status: 201,
      message: 'article successfully created',
      data: {
        info: createdArticle,
      },
    });
  },
  addComment(req, res) {
    const { body, author } = req;
    const id = parseInt(req.params.id, 10);

    const { value, error } = helper.joiCommentSchema(body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }

    const matchArticle = articlesArray.getArticleById(id);

    if (!matchArticle) {
      return res.status(404).json({
        status: 404,
        error: 'Article with given id does not exists',
      });
    }
    const createdComment = new Comment(value, matchArticle, author);
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
  },
  delete(req, res) {
    const { author } = req;
    const id = parseInt(req.params.id, 10);

    const authorsArticles = articlesArray.getArticles('authorId', author.id);

    if (!authorsArticles) {
      return res.status(404).json({
        status: 404,
        error: `Dear ${author.lastName} you have not created any articles yet!`,
      });
    }

    const matchArticle = articlesArray.getArticleById(id);

    if (!matchArticle) {
      return res.status(404).json({
        status: 404,
        error: 'Article with given id does not exists',
      });
    }

    const isAuthor = articlesArray.checkAuthor(matchArticle, author);

    if (!isAuthor) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden: An article you are trying to delete is not yours',
      });
    }

    articlesArray.removeArticle(matchArticle);

    return res.status(204).json({
      status: 204,
      message: 'article successfully deleted',
    });
  },
  edit(req, res) {
    const { body } = req;
    const { author } = req;
    const id = parseInt(req.params.id, 10);

    const authorsArticles = articlesArray.getArticles('authorId', author.id);

    if (!authorsArticles) {
      return res.status(404).json({
        status: 404,
        error: `Dear ${author.lastName} you have not created any articles yet!`,
      });
    }

    const matchArticle = articlesArray.getArticleById(id);

    if (!matchArticle) {
      return res.status(404).json({
        status: 404,
        error: 'Article with given id does not exists',
      });
    }

    const isAuthor = articlesArray.checkAuthor(matchArticle, author);

    if (!isAuthor) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden: An article you are trying to edit is not yours',
      });
    }

    const { value, error } = helper.joiArticleSchema(body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }

    matchArticle.title = value.title || matchArticle.title;
    matchArticle.article = value.article || matchArticle.article;

    res.status(200).json({
      status: 200,
      message: 'article successfully edited',
      data: matchArticle,
    });
  },
  getAll(req, res) {
    const fetchedArticles = articlesArray.getLatest();

    res.status(200).json({
      status: 200,
      message: 'success',
      data: fetchedArticles,
    });
  },
  getOne(req, res) {
    const id = parseInt(req.params.id, 10);
    const fetchedArticles = articlesArray.getArticleById(id);

    if (!fetchedArticles) {
      return res.status(404).json({
        status: 404,
        error: 'Article with given id does not exists',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'success',
      data: fetchedArticles,
    });
  },
};

export default articles;
