import helper from './helper';

class Article {
  constructor(article) {
    this.title = article.title;
    this.article = article.content;
    this.createdOn = helper.getDate();
    this.comments = [];
  }
}

export default Article;
