import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import auth from './auth.spec';
import articles from './articles.spec';

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup', auth.signup);
describe('POST /api/v1/auth/signin', auth.signin);
describe('POST /api/v1/articles', articles.create);
describe('PATCH /articles/<articleId>', articles.edit);
describe('DELETE /articles/<articleId>', articles.delete);
describe('POST /api/v1/articles/<artilceId>/comments', articles.addComment);
describe('POST /api/v1/feeds', articles.feeds);
describe('GET /api/v1/articles', articles.findByCategory);

describe('Other routes', () => {
  it('GET / should return a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equals('Welcome to Teamwork API, start a path with /api/v1/ when making requests');
      });
    done();
  });

  it('GEt /api/v1 should return a welcome message', (done) => {
    chai
      .request(app)
      .get('/api/v1/')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equals('Welcome to Teamwork API');
      });
    done();
  });

  it('any others routes which are not specified', (done) => {
    chai
      .request(app)
      .get('/*')
      .end((err, res) => {
        expect(res).to.have.status(405);
        expect(res.body.error).to.equals('Method not allowed');
      });
    done();
  });
});
