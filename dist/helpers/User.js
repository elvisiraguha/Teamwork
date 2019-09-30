"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _helper = _interopRequireDefault(require("./helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(user) {
  _classCallCheck(this, User);

  this.id = (0, _uuid["default"])();
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = _helper["default"].hashPassword(user.password);
  this.gender = user.gender;
  this.jobRole = user.jobRole;
  this.department = user.department;
  this.address = user.address;
  this.isAdmin = false;
};

var _default = User;
exports["default"] = _default;