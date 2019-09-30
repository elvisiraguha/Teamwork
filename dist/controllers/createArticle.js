"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _Article = _interopRequireDefault(require("../helpers/Article"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function (req, res) {
  var author = req.author;
  var body = req.body;

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

  var createdArticle = new _Article["default"](value, author);

  _articlesArray["default"].addArticle(createdArticle);

  res.status(201).json({
    status: 201,
    message: 'article successfully created',
    data: {
      id: createdArticle.id,
      title: createdArticle.title,
      createdOn: createdArticle.createdOn
    }
  });
});
var _default = router;
exports["default"] = _default;