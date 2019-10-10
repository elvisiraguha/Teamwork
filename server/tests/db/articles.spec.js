import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import { articleData, userData } from './mockData/data';

chai.use(chaiHttp);

const { article } = articleData;

class ArticlesSpec {
  static create() {
    it('test response given no token', () => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .send(article)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Unauthorized: You need to have a token');
        });
    });

    it('test response given invalid token', () => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', 'invalid')
        .send(article)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test response given incomplete information', () => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', token)
        .send({})
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
          expect(body.error).to.have.lengthOf.at.least(10);
        });
    });

    it('test response given all required information', () => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', token2)
        .send(article)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(201);
          expect(body.status).to.equals(201);
          expect(body.message).to.equal('article successfully created');
          expect(body.data).to.be.an('object');
        });
    });
  }
}

export default ArticlesSpec;
