"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

var signinSpec = function signinSpec() {
  it('test response given incomplete information', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({}).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(body.status).to.equals(400);
      (0, _chai.expect)(body.error).to.be.a('string');
      (0, _chai.expect)(body.error).to.have.lengthOf.at.least(10);
    });

    done();
  });
  it('test response given email address which dont exist', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
      password: 'iraguha',
      email: 'iraguhaelvis@student.com'
    }).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(body.status).to.equals(404);
      (0, _chai.expect)(body.error).to.equals('User with given email does not exists');
    });

    done();
  });
  it('test response given invalid password', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
      password: 'invalid',
      email: 'iraguhaelvis@gmail.com'
    }).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(401);
      (0, _chai.expect)(body.status).to.equals(401);
      (0, _chai.expect)(body.error).to.equals('Given password is incorrect');
    });

    done();
  });
  it('test response given all required information they are correct', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
      password: 'iraguha',
      email: 'iraguhaelvis@gmail.com'
    }).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(body.status).to.equals(200);
      (0, _chai.expect)(body.message).to.equal('User is successfully logged in');
      (0, _chai.expect)(body.data).to.be.an('object');
      (0, _chai.expect)(body.data.token).to.be.a('string');
    });

    done();
  });
};

var _default = signinSpec;
exports["default"] = _default;