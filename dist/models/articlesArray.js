"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var articlesArray = {
  storageArray: [{
    id: 1,
    title: 'My first Article',
    article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
    createdOn: 'September 28th 2019, 12:58:18 pm',
    authorId: 'dd7f21c1-b92c-4703-a6d9-3ec03eef4da9',
    dateToSort: 1569638137705
  }, {
    id: 2,
    title: 'My first Article',
    article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
    createdOn: 'September 28th 2019, 12:58:18 pm',
    authorId: 'dd7f21c1-b92c-4703-a6d9-3ec03eef4da9',
    dateToSort: 1569698337705
  }, {
    id: 3,
    title: 'My first Article',
    article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
    createdOn: 'September 28th 2019, 12:58:18 pm',
    authorId: 'dd7f21c1-b92c-4703-a6d9-3ec03eef4da9',
    dateToSort: 1569698137705
  }, {
    id: 4,
    title: 'My first Article',
    article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
    createdOn: 'September 28th 2019, 12:58:18 pm',
    authorId: '538bdd77-38af-4928-9bb0-d02461c7da34',
    dateToSort: 1569698133705
  }],
  addArticle: function addArticle(article) {
    this.storageArray.push(article);
  },
  getArticles: function getArticles(key, value) {
    var articles = this.storageArray.filter(function (article) {
      return article[key] === value;
    });
    return articles.length ? articles : null;
  },
  getArticleById: function getArticleById(id) {
    var matchArticle = this.storageArray.find(function (article) {
      return article.id === id;
    });
    return matchArticle;
  },
  checkAuthor: function checkAuthor(article, author) {
    return author.id === article.authorId ? 1 : 0;
  },
  removeArticle: function removeArticle(article) {
    return this.storageArray.splice(article, 1);
  },
  getLatest: function getLatest() {
    var latestArticles = this.storageArray.sort(function (a, b) {
      return a.dateToSort - b.dateToSort;
    });
    return latestArticles;
  }
};
var _default = articlesArray;
exports["default"] = _default;