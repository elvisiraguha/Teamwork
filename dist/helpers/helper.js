"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _moment = _interopRequireDefault(require("moment"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)(0);
var helper = {
  generateToken: function generateToken(_ref) {
    var id = _ref.id;
    return _jsonwebtoken["default"].sign({
      id: id
    }, process.env.SECRET, {
      expiresIn: '2d'
    });
  },
  hashPassword: function hashPassword(password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(8));
  },
  comparePassword: function comparePassword(password, hashedPassword) {
    return _bcrypt["default"].compareSync(password, hashedPassword);
  },
  joiSignupSchema: function joiSignupSchema(body) {
    var schema = _joi["default"].object({
      firstName: _joi["default"].string().required(),
      lastName: _joi["default"].string().required(),
      email: _joi["default"].string().required(),
      password: _joi["default"].string().required(),
      gender: _joi["default"].string().required(),
      jobRole: _joi["default"].string().required(),
      department: _joi["default"].string().required(),
      address: _joi["default"].string().required()
    });

    return schema.validate(body);
  },
  joiSigninSchema: function joiSigninSchema(body) {
    var schema = _joi["default"].object({
      email: _joi["default"].string().required(),
      password: _joi["default"].string().required()
    });

    return schema.validate(body);
  },
  joiArticleSchema: function joiArticleSchema(content) {
    var schema = _joi["default"].object({
      title: _joi["default"].string().required().min(10).max(50),
      article: _joi["default"].string().required().min(20).max(1000)
    });

    return schema.validate(content);
  },
  joiCommentSchema: function joiCommentSchema(comment) {
    var schema = _joi["default"].object({
      comment: _joi["default"].string().required().min(5).max(1000)
    });

    return schema.validate(comment);
  },
  getDate: function getDate() {
    return (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a');
  }
};
var _default = helper;
exports["default"] = _default;