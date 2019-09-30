"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("./helper"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Article = function Article(article, author) {
  _classCallCheck(this, Article);

  this.id = _articlesArray["default"].storageArray.length + 1;
  this.title = article.title;
  this.article = article.article;
  this.createdOn = _helper["default"].getDate();
  this.authorId = author.id;
  this.dateToSort = Date.now();
};

var _default = Article;
exports["default"] = _default;