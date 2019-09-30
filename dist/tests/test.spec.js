"use strict";

var _signup = _interopRequireDefault(require("./signup.spec"));

var _signin = _interopRequireDefault(require("./signin.spec"));

var _createArticle = _interopRequireDefault(require("./createArticle.spec"));

var _editArticle = _interopRequireDefault(require("./editArticle.spec"));

var _deleteArticle = _interopRequireDefault(require("./deleteArticle.spec"));

var _addComment = _interopRequireDefault(require("./addComment.spec"));

var _feeds = _interopRequireDefault(require("./feeds.spec"));

var _specificArticle = _interopRequireDefault(require("./specificArticle.spec"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('POST /api/v1/auth/signup', _signup["default"]);
describe('POST /api/v1/auth/signin', _signin["default"]);
describe('POST /api/v1/articles', _createArticle["default"]);
describe('PATCH /articles/<articleId>', _editArticle["default"]);
describe('PATCH /articles/<articleId>', _deleteArticle["default"]);
describe('POST /api/v1/articles/<artilceId>/comments', _addComment["default"]);
describe('POST /api/v1/feeds', _feeds["default"]);
describe('POST /api/v1/articles', _specificArticle["default"]);