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

var userPayload = {
  firstName: 'Iraguha',
  lastName: 'Elvis',
  password: 'monkey',
  address: 'Kigali/Rwanda',
  gender: 'Male',
  jobRole: 'Student',
  email: 'elvis@student.edu',
  department: 'Production'
};

var signupSpec = function signupSpec() {
  it('test response given incomplete information or no information', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send({}).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(body.status).to.equals(400);
      (0, _chai.expect)(body.error).to.be.a('string');
      (0, _chai.expect)(body.error).to.have.lengthOf.at.least(10);
    });

    done();
  });
  it('test response given all required information', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(userPayload).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(body.status).to.equals(201);
      (0, _chai.expect)(body.message).to.equal('User created successfully');
      (0, _chai.expect)(body.data).to.be.an('object');
      (0, _chai.expect)(body.data.token).to.be.a('string');
    });

    done();
  });
  it('test response given the used email address', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(userPayload).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(409);
      (0, _chai.expect)(body.status).to.equals(409);
      (0, _chai.expect)(body.error).to.equals('User with given email already exists');
    });

    done();
  });
};

var _default = signupSpec;
exports["default"] = _default;