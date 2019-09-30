"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _usersArray = _interopRequireDefault(require("../models/usersArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)(0);

var authorize = function authorize(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized: You need to have a token'
    });
  }

  try {
    var _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.SECRET),
        id = _jwt$verify.id;

    req.author = _usersArray["default"].findUser('id', id);
    next();
  } catch (err) {
    return res.status(400).json({
      "default": err,
      status: 400,
      error: 'Your token is invalid or have expired'
    });
  }
};

var _default = authorize;
exports["default"] = _default;