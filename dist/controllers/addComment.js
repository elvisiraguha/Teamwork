"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _Comment = _interopRequireDefault(require("../helpers/Comment"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

var _commentsArray = _interopRequireDefault(require("../models/commentsArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/:id/comments/', function (req, res) {
  var body = req.body,
      author = req.author;
  var id = parseInt(req.params.id, 10);

  var _helper$joiCommentSch = _helper["default"].joiCommentSchema(body),
      comment = _helper$joiCommentSch.comment,
      error = _helper$joiCommentSch.error;

  if (error) {
    var errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage
    });
  }

  var matchArticle = _articlesArray["default"].getArticleById(id);

  if (!matchArticle) {
    return res.status(404).json({
      status: 404,
      error: 'Article with given id does not exists'
    });
  }

  var createdComment = new _Comment["default"](comment, matchArticle, author);

  _commentsArray["default"].addComment(createdComment);

  res.status(201).json({
    status: 201,
    message: 'comment successfully added',
    data: createdComment
  });
});
var _default = router;
exports["default"] = _default;