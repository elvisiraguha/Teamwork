"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _usersArray = _interopRequireDefault(require("../models/usersArray"));

var _articlesArray = _interopRequireDefault(require("../models/articlesArray"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

var newArticle = {
  title: 'My first Article',
  article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time'
};
var fakeUser = _usersArray["default"].storageArray[0];
var fakeUser2 = _usersArray["default"].storageArray[1];

var token = _helper["default"].generateToken(fakeUser);

var token2 = _helper["default"].generateToken(fakeUser2);

var fakeArticle = _articlesArray["default"].storageArray[0];
var fakeArticle2 = _articlesArray["default"].storageArray[3];

var editArticleSpec = function editArticleSpec() {
  it('test response given no token', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(fakeArticle.id)).send(newArticle).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(401);
      (0, _chai.expect)(body.status).to.equals(401);
      (0, _chai.expect)(body.error).to.equals('Unauthorized: You need to have a token');
    });

    done();
  });
  it('test response given invalid token', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(fakeArticle.id)).set('x-access-token', 'invalid').send(newArticle).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(body.status).to.equals(400);
      (0, _chai.expect)(body.error).to.equals('Your token is invalid or have expired');
    });

    done();
  });
  it('test response if there is no article by this user', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(fakeArticle.id)).set('x-access-token', token).send(newArticle).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(body.status).to.equals(404);
      (0, _chai.expect)(body.error).to.equal("Dear ".concat(fakeUser.lastName, " you have not created any articles yet!"));
    });

    done();
  });
  it('test response if there is no article matching the given id', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/articles/invalidId').set('x-access-token', token2).send(newArticle).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(body.status).to.equals(404);
      (0, _chai.expect)(body.error).to.equal('Article with given id does not exists');
    });

    done();
  });
  it('test response if you are trying to delete an article which is not yours', function (done) {
    _chai["default"].request(_server["default"])["delete"]("/api/v1/articles/".concat(fakeArticle.id)).set('x-access-token', token2).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(403);
      (0, _chai.expect)(body.status).to.equals(403);
      (0, _chai.expect)(body.error).to.equal('Forbidden: An article you are trying to delete is not yours');
    });

    done();
  });
  it('test response given incomplete information', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(fakeArticle2.id)).set('x-access-token', token2).send({}).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(body.status).to.equals(400);
      (0, _chai.expect)(body.error).to.be.a('string');
      (0, _chai.expect)(body.error).to.have.lengthOf.at.least(10);
    });

    done();
  });
  it('test response given all required information', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(fakeArticle2.id)).set('x-access-token', token2).send(newArticle).end(function (err, res) {
      var body = res.body;
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(body.status).to.equals(200);
      (0, _chai.expect)(body.message).to.equal('article successfully edited');
      (0, _chai.expect)(body.data).to.be.an('object');
    });

    done();
  });
};

var _default = editArticleSpec;
exports["default"] = _default;