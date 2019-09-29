import helper from './helper';
import articlesArray from '../models/articlesArray';

class Article {
  constructor(article, author) {
    this.id = articlesArray.storageArray.length + 1;
    this.title = article.title;
    this.article = article.article;
    this.createdOn = helper.getDate();
    this.authorId = author.id;
    this.dateToSort = Date.now();
  }
}

export default Article;
