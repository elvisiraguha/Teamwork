"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("./helper"));

var _commentsArray = _interopRequireDefault(require("../models/commentsArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comment = function Comment(comment, article, author) {
  _classCallCheck(this, Comment);

  this.id = _commentsArray["default"].storageArray.length + 1;
  this.comment = comment;
  this.article = article.article;
  this.articleTitle = article.title;
  this.createdOn = _helper["default"].getDate();
  this.authorId = author.id;
};

var _default = Comment;
exports["default"] = _default;