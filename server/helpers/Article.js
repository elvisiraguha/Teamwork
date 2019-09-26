import uuid from 'uuid';
import helper from './helper';

class Article {
  constructor(article, author) {
    this.id = uuid();
    this.title = article.title;
    this.article = article.article;
    this.createdOn = helper.getDate();
    this.authorId = author;
    this.comments = [];
  }
}

export default Article;
