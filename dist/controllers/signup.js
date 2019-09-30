"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersArray = _interopRequireDefault(require("../models/usersArray"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _User = _interopRequireDefault(require("../helpers/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function (req, res) {
  var body = req.body;

  var _helper$joiSignupSche = _helper["default"].joiSignupSchema(body),
      value = _helper$joiSignupSche.value,
      error = _helper$joiSignupSche.error;

  if (error) {
    var errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage
    });
  }

  var matchUser = _usersArray["default"].findUser('email', body.email);

  if (matchUser) {
    return res.status(409).json({
      status: 409,
      error: 'User with given email already exists'
    });
  }

  var createdUser = new _User["default"](value);

  _usersArray["default"].addUser(createdUser);

  var token = _helper["default"].generateToken(createdUser);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token: token
    }
  });
});
var _default = router;
exports["default"] = _default;