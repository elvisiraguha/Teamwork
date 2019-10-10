import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import auth from './db/auth.spec';
// import articles from './db/articles.spec';

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup', auth.signup);
describe('POST /api/v1/auth/signin', auth.signin);
// describe('POST /api/v1/articles', articles.create);

describe('Other routes', () => {
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
