"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router["delete"]('/:id', function (req, res) {
  var author = req.author;
  var id = parseInt(req.params.id, 10);

  var authorsArticles = _articlesArray["default"].getArticles('authorId', author.id);

  if (!authorsArticles) {
    return res.status(404).json({
      status: 404,
      error: "Dear ".concat(author.lastName, " you have not created any articles yet!")
    });
  }

  var matchArticle = _articlesArray["default"].getArticleById(id);

  if (!matchArticle) {
    return res.status(404).json({
      status: 404,
      error: 'Article with given id does not exists'
    });
  }

  var isAuthor = _articlesArray["default"].checkAuthor(matchArticle, author);

  if (!isAuthor) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: An article you are trying to delete is not yours'
    });
  }

  _articlesArray["default"].removeArticle(matchArticle);

  return res.status(204).json({
    status: 204,
    message: 'article successfully deleted'
  });
});
var _default = router;
exports["default"] = _default;