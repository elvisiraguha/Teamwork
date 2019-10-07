import articlesArray from '../models/articlesArray';

class GetArticles {
  static getOne(req, res, next) {
    const id = parseInt(req.params.id, 10);

    const matchArticle = articlesArray.getArticleById(id);

    if (!matchArticle) {
      return res.status(404).json({
        status: 404,
        error: 'Article with given id does not exists',
      });
    }
    req.matchArticle = matchArticle;
    next();
  }

  static getByCategory(req, res, next) {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        status: 400,
        error: 'Provide a category in query please!',
      });
    }
    req.category = category;
    next();
  }

  static myArticles(req, res, next) {
    const { author } = req;
    const authorsArticles = articlesArray.getArticles('authorId', author.id);

    if (!authorsArticles) {
      return res.status(404).json({
        status: 404,
        error: 'You have not created any articles Yet',
      });
    }
    req.myArticles = authorsArticles;
    next();
  }
}

export default GetArticles;
