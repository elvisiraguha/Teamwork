"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _usersArray = _interopRequireDefault(require("../models/usersArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

var route = '/api/v1/feeds';
var fakeUser = _usersArray["default"].storageArray[0];

var token = _helper["default"].generateToken(fakeUser);

var feeds = function feeds() {
  it('test response given no token', function (done) {
    _chai["default"].request(_server["default"]).get(route).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(401);
      (0, _chai.expect)(body.status).to.equals(401);
      (0, _chai.expect)(body.error).to.equals('Unauthorized: You need to have a token');
    });

    done();
  });
  it('test response given invalid token', function (done) {
    _chai["default"].request(_server["default"]).get(route).set('x-access-token', 'invalid').end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(body.status).to.equals(400);
      (0, _chai.expect)(body.error).to.equals('Your token is invalid or have expired');
    });

    done();
  });
  it('test reaponse given the correct token', function (done) {
    _chai["default"].request(_server["default"]).get(route).set('x-access-token', token).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(body.status).to.equals(200);
      (0, _chai.expect)(body.message).to.equals('success');
      (0, _chai.expect)(body.data).to.be.an('array');
    });

    done();
  });
};

var _default = feeds;
exports["default"] = _default;