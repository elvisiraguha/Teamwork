const articlesArray = {
  storageArray: [],

  addArticle(article) {
    this.storageArray.push(article);
  },

  removeArticle(article) {
    this.storageArray.splice(article, 1);
  },

  resetStorage() {
    this.storageArray = [];
  },
};

export default articlesArray;
