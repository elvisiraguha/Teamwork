"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _routes = _interopRequireDefault(require("./routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();
var port = process.env.PORT || 3000;

_routes["default"].use('*', function (req, res) {
  return res.status(405).json({
    status: 405,
    message: 'Method not allowed'
  });
});

_routes["default"].listen(port, function () {
  console.log("connected to port: ".concat(port));
});

var _default = _routes["default"];
exports["default"] = _default;