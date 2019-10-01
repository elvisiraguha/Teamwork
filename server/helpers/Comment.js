class Comment {
  constructor(value, article, author) {
    this.id = article.comments.length + 1;
    this.comment = value.comment;
    this.createdOn = Date();
    this.authorId = author.id;
  }
}

export default Comment;
