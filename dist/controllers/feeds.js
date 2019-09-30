"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function (req, res) {
  var fetchedArticles = _articlesArray["default"].getLatest();

  res.status(200).json({
    status: 200,
    message: 'success',
    data: fetchedArticles
  });
});
var _default = router;
exports["default"] = _default;