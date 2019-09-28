import uuid from 'uuid';
import helper from './helper';

class Comment {
  constructor(comment, article, author) {
    this.id = uuid();
    this.comment = comment;
    this.article = article.article;
    this.articleTitle = article.title;
    this.createdOn = helper.getDate();
    this.authorId = author.id;
  }
}

export default Comment;
