"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);

  var fetchedArticles = _articlesArray["default"].getArticleById(id);

  if (!fetchedArticles) {
    return res.status(404).json({
      status: 404,
      error: 'Article with given id does not exists'
    });
  }

  res.status(200).json({
    status: 200,
    message: 'success',
    data: fetchedArticles
  });
});
var _default = router;
exports["default"] = _default;