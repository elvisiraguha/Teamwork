import helper from './helper';
import commentsArray from '../models/commentsArray';

class Comment {
  constructor(comment, article, author) {
    this.id = commentsArray.storageArray.length + 1;
    this.comment = comment;
    this.article = article.article;
    this.articleTitle = article.title;
    this.createdOn = helper.getDate();
    this.authorId = author.id;
  }
}

export default Comment;
