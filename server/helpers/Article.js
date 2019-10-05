import articlesArray from '../models/articlesArray';

class Article {
  constructor(article, author) {
    this.id = articlesArray.getNewId();
    this.title = article.title;
    this.article = article.article;
    this.createdOn = Date();
    this.authorId = author.id;
    this.categories = article.categories;
    this.comments = [];
  }
}

export default Article;
