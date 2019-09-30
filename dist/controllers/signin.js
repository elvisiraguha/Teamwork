"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _usersArray = _interopRequireDefault(require("../models/usersArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function (req, res) {
  var body = req.body;

  var _helper$joiSigninSche = _helper["default"].joiSigninSchema(body),
      error = _helper$joiSigninSche.error;

  if (error) {
    var errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage
    });
  }

  var matchUser = _usersArray["default"].findUser('email', body.email);

  if (!matchUser) {
    return res.status(404).json({
      status: 404,
      error: 'User with given email does not exists'
    });
  }

  var isValidPassword = _helper["default"].comparePassword(body.password, matchUser.password);

  if (!isValidPassword) {
    return res.status(401).json({
      status: 401,
      error: 'Given password is incorrect'
    });
  }

  var token = _helper["default"].generateToken(matchUser);

  res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token: token
    }
  });
});
var _default = router;
exports["default"] = _default;