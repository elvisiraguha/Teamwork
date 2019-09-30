"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../middleware/authController"));

var _signup = _interopRequireDefault(require("../controllers/signup"));

var _signin = _interopRequireDefault(require("../controllers/signin"));

var _createArticle = _interopRequireDefault(require("../controllers/createArticle"));

var _editArticle = _interopRequireDefault(require("../controllers/editArticle"));

var _deleteArticle = _interopRequireDefault(require("../controllers/deleteArticle"));

var _addComment = _interopRequireDefault(require("../controllers/addComment"));

var _feeds = _interopRequireDefault(require("../controllers/feeds"));

var _specificArticle = _interopRequireDefault(require("../controllers/specificArticle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use('/api/v1/auth/signup', _signup["default"]);
app.use('/api/v1/auth/signin', _signin["default"]);
app.use('/api/v1/articles', _authController["default"], _createArticle["default"]);
app.use('/api/v1/articles', _authController["default"], _editArticle["default"]);
app.use('/api/v1/articles', _authController["default"], _deleteArticle["default"]);
app.use('/api/v1/articles', _authController["default"], _addComment["default"]);
app.use('/api/v1/feeds', _authController["default"], _feeds["default"]);
app.use('/api/v1/articles', _authController["default"], _specificArticle["default"]);
var _default = app;
exports["default"] = _default;