import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import signup from './signup.spec';
import signin from './signin.spec';
import createArticle from './createArticle.spec';
import editArticle from './editArticle.spec';
import deleteArticle from './deleteArticle.spec';
import addComment from './addComment.spec';
import feeds from './feeds.spec';
import specificArticle from './specificArticle.spec';

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup', signup);
describe('POST /api/v1/auth/signin', signin);
describe('POST /api/v1/articles', createArticle);
describe('PATCH /articles/<articleId>', editArticle);
describe('PATCH /articles/<articleId>', deleteArticle);
describe('POST /api/v1/articles/<artilceId>/comments', addComment);
describe('POST /api/v1/feeds', feeds);
describe('POST /api/v1/articles', specificArticle);

describe('Other routes', () => {
  it('GET / should return a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equals('Welcome to Teamwork API, when making routes, please start with /api/v1/');
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
