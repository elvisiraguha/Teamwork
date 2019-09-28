const articlesArray = {
  storageArray: [],

  addComment(comment) {
    this.storageArray.push(comment);
  },

  removeArticle(comment) {
    this.storageArray.splice(comment, 1);
  },
};

export default articlesArray;
