"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.patch('/:id', function (req, res) {
  var body = req.body;
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

  var _helper$joiArticleSch = _helper["default"].joiArticleSchema(body),
      value = _helper$joiArticleSch.value,
      error = _helper$joiArticleSch.error;

  if (error) {
    var errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage
    });
  }

  matchArticle.title = value.title || matchArticle.title;
  matchArticle.title = value.body || matchArticle.body;
  res.status(200).json({
    status: 200,
    message: 'article successfully edited',
    data: matchArticle
  });
});
var _default = router;
exports["default"] = _default;